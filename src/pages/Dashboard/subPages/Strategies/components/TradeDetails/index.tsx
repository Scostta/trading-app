import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Drawer } from "../../../../../../components/Drawer";
import { useGetTrade } from "../../../../../../hooks/useTrades";
import { TradeImages } from "../TradeImagesModal";
import { TRADE_FIELDS, TradeFields } from "../../../../../../constants/fields";
import { DisplayOptions } from "../../../../../../components/Displays";

interface TradeDetailsProps {
  id?: string
  onClose: () => void
}

//TODO: PASAR ESTOS FIELDS A FIELDS DEL BACK CON SU ORDEN Y TODO
const fields = [
  { label: "Simbolo", key: "symbol" },
  ...TRADE_FIELDS,
  { label: "Pips de SL", key: "pipsSl" },
  { label: "Volumen", key: "volume" },
  { label: "Fecha de apertura", key: "openTime" },
  { label: "Fecha de cierre", key: "closeTime" },
  { label: "Profit", key: "profit" },
  { label: "Cometarios", key: "comment", full: true },
] as Array<TradeFields>

export const TradeDetails = ({ id, onClose }: TradeDetailsProps) => {

  const { data } = useGetTrade(id)

  return (
    <Drawer isOpen={Boolean(id)} onClose={onClose} title="Detalles">
      <Flex direction="column" gap={16}>
        <Flex direction="column" gap={4}>
          {fields.filter(field => !field.notShowing).map(({ label, key, options, full }) => {
            if (!data?.[key]) return null
            if (full) return (
              <VStack key={key} alignItems="flex-start">
                <Text>{label}</Text>
                <Text>{DisplayOptions({ ...{ [label]: data?.[key], options: options } })}</Text>
              </VStack>
            )
            return (
              <HStack justify="space-between" key={key}>
                <Text>{label}</Text>
                <Text>{DisplayOptions({ ...{ [label]: data?.[key], options: options } })}</Text>
              </HStack>
            )
          })}
        </Flex>
        <Box mb={8}>
          <TradeImages images={data?.images} />
        </Box>
      </Flex>
    </Drawer>
  )
}