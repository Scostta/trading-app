import { Tag, Text } from "@chakra-ui/react"
import { COLORS } from "../constants/colors"
import { FaLink, FaUnlink } from 'react-icons/fa'

export const DisplayProfit = ({ profit }: { profit: number }): JSX.Element => {
  const color = profit > 0 ? COLORS.GREEN : COLORS.RED

  return (
    <Text color={color}>{profit.toFixed(2)}</Text>
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