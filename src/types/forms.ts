
export type AuthFormData = {
  email: string;
  password: string;
};

export type TradeFormData = {
  executionModel: string
  pipsSl: string
  date: string
  sesion: string
  stage: string
  result: string
  entryTimeframe: string
  isBE?: boolean
  comment?: string
  images?: Array<{
    title?: string
    description?: string
    url: string
  }>
  hasLiquidity?: boolean
  interiorFractals?: number
  hasVTX?: string
  dependency?: string
}

export interface GoalFormData {
  label: string
  field: string
  valuePrefix: "money" | "percentage",
  type: "PASSED" | "FAILED",
  goalValue: number | null,
  showInOverview: boolean
  id?: string
} 