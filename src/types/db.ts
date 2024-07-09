import { Timestamp } from "firebase/firestore"

export type Trade = {
  pipsSl: string
  date: string
  orderType: string
  result: string
  id: string
  createdAt: Timestamp
  linkId?: string
  accountId: string
  comment?: string
  images?: Array<{
    title?: string
    description?: string
    url: string
  }>
  entryTimeframe: string
  sesion: string
  stage: string
  executionModel: string
  hasLiquidity?: boolean
  interiorFractals?: number
  hasVTX?: string
}

export interface Goal {
  label: string
  field: string
  valuePrefix: "money" | "percentage",
  type: "PASSED" | "FAILED",
  goalValue: number,
  showInOverview: boolean
  id: string
  accountId: string
}

export interface Link {
  id: string
  tradeId: string
  accountId: string
}