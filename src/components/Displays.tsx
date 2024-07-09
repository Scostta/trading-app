import { Flex, Tag, Text } from "@chakra-ui/react"
import { COLORS } from "../constants/colors"
import { FaLink, FaUnlink } from 'react-icons/fa'
import { BsGraphDown, BsGraphUp } from "react-icons/bs";
import { addSufixToNumber } from "../utils/displays";

export const DisplayProfit = ({ profit }: { profit: number }): JSX.Element => {
  const color = profit > 0 ? COLORS.GREEN : COLORS.RED

  return (
    <Text color={color}>{profit.toFixed(2)}</Text>
  )
}

export const DisplayPercentage = ({ percentage }: { percentage: number }): JSX.Element => {
  const color = percentage > 0 ? COLORS.GREEN : COLORS.RED

  return (
    <Text color={color}>{addSufixToNumber(percentage, "%")}</Text>
  )
}

export const DisplayOrderType = ({ type }: { type: "DEAL_TYPE_SELL" | "DEAL_TYPE_BUY" }): JSX.Element => {

  const color = type === "DEAL_TYPE_BUY" ? COLORS.GREEN : COLORS.RED
  const text = type === "DEAL_TYPE_BUY" ? "BUY" : "SELL"

  return (
    <Tag color={color}>{text}</Tag>
  )
}

export const DisplayLinked = ({ linked }: { linked: boolean }): JSX.Element => {

  return linked ? <FaLink /> : <FaUnlink color="grey" />
}

export const DisplayToFixed = (prop: { [key: string]: number }): string | null => {
  const value = Object.values(prop)[0]
  if (!value) return null
  return value.toFixed(2)
}


export const DisplayOptions = (props: { [key: string]: any, options: Array<{ value: string, label: string }> | undefined }): string | undefined | JSX.Element => {

  const orderTypeColors = {
    "Buy": COLORS.GREEN,
    "Sell": COLORS.RED,
  } as { [key: string]: string }

  const resultsColor = {
    "BE": COLORS.ORANGE,
    "Loss": COLORS.RED,
    "Win": COLORS.GREEN
  } as { [key: string]: string }

  const trendIcon = {
    "Alcista": <BsGraphUp style={{ color: COLORS.GREEN }} />,
    "Bajista": <BsGraphDown style={{ color: COLORS.RED }} />
  } as { [key: string]: JSX.Element }

  const { options, ...rest } = props
  const value = Object.values(rest)[0]
  const label = options?.find(opt => opt.value === value)?.label

  if (orderTypeColors[label ?? '']) return <Tag color={orderTypeColors[label ?? '']}>{label?.toUpperCase()}</Tag>
  if (trendIcon[label ?? '']) return <Flex gap={2} align="center"><Text>{label}</Text>{trendIcon[label ?? '']}</Flex>
  if (options) return <Text color={resultsColor[label ?? ''] ?? "white"}>{label}</Text>
  return <Text color={typeof value === "number" ? (value > 0) ? COLORS.GREEN : COLORS.RED : "white"}>{value}</Text>
}