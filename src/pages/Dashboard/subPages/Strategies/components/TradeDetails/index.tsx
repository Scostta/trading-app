import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Drawer } from "../../../../../../components/Drawer";
import { useGetTrade } from "../../../../../../hooks/useTrades";
import { TradeImages } from "../TradeImagesModal";
import { TRADE_FIELDS, TradeFields } from "../../../../../../constants/fields";
import { DisplayOptions } from "../../../../../../components/Displays";

interface TradeDetailsProps {
  id?: string
  onClose: () => void
}

const fields = [
  { label: "Simbolo", key: "symbol" },
  ...TRADE_FIELDS,
  { label: "Pips de SL", key: "pipsSl" },
  { label: "Volumen", key: "volume" },
  { label: "Fecha de apertura", key: "openTime" },
  { label: "Fecha de cierre", key: "closeTime" },
  { label: "Profit", key: "profit" },
] as Array<TradeFields>

export const TradeDetails = ({ id, onClose }: TradeDetailsProps) => {

  const { data } = useGetTrade(id)

  return (
    <Drawer isOpen={Boolean(id)} onClose={onClose} title="Detalles">
      <Flex direction="column" gap={16}>
        <Flex direction="column" gap={4}>
          {fields.filter(field => !field.notShowing).map(field => (
            <HStack justify="space-between">
              <Text>{field.label}</Text>
              <Text>{DisplayOptions({ ...{ [field.label]: data?.[field.key], options: field.options } })}</Text>
            </HStack>
          ))}
        </Flex>
        <Box mb={8}>
          <TradeImages tradeId={id} />
        </Box>
      </Flex>
    </Drawer>
  )
}