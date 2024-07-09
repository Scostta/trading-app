import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Drawer } from "../../../../../../components/Drawer";
import { useGetTrade } from "../../../../../../hooks/useTrades";
import { TradeImages } from "../TradeImagesModal";
import { TRADE_FIELDS, TradeFields } from "../../../../../../constants/fields";
import { DisplayOptions } from "../../../../../../components/Displays";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { COLORS } from "../../../../../../constants/colors";

interface TradeDetailsProps {
  id?: string
  onClose: () => void
}

//TODO: PASAR ESTOS FIELDS A FIELDS DEL BACK CON SU ORDEN Y TODO


export const TradeDetails = ({ id, onClose }: TradeDetailsProps) => {

  const { data } = useGetTrade(id)

  const fields = [
    { label: "Simbolo", key: "symbol" },
    ...TRADE_FIELDS,
    { label: "Volumen", key: "volume" },
    { label: "Fecha de apertura", key: "openTime" },
    { label: "Fecha de cierre", key: "closeTime" },
    { label: "Profit", key: "profit" },
    { label: "Cometarios", key: "comment", full: true },
  ] as Array<TradeFields>

  return (
    <Drawer isOpen={Boolean(id)} onClose={onClose} title="Detalles">
      <Flex direction="column" gap={16}>
        <Flex direction="column" gap={4}>
          {fields.map(({ label, key, options, full }) => {
            console.log(key)
            if (typeof data?.[key] === "boolean" && key !== "isBE") return (
              <HStack justify="space-between" key={key}>
                <Text>{label}</Text>
                <Text>{!data?.[key] ? <CloseIcon color={COLORS.RED} /> : <CheckIcon color={COLORS.GREEN} />}</Text>
              </HStack>
            )
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