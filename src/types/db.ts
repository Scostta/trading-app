import { Timestamp } from "firebase/firestore"

export type Trade = {
  pipsSl: string
  date: string
  orderType: string
  executionType: string
  sesion: string
  killzoneTime: string
  result: string
  id: string
  createdAt: Timestamp
  strategy: string
  trend: string
  scanTimeframe: string
  entryType: string
  entryTimeframe: string
  imagesPaths?: Array<string>
  linkId?: string
  accountId: string
  comment?: string
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