export interface MetatraderAccountInterface {
  id: string
  login: string
  server: string
  version: number
}

export interface AccountCreateBodyParams {
  login: string
  password: string
  name: string
  server: string
  platform: string
  type: string
  metastatsApiEnabled: boolean
  riskManagementApiEnabled: boolean
}

export interface AccountUpdateBodyParams {
  password: string
  name: string
  server: string
  magic?: number
  manualTrades?: boolean
  slippage?: number
  quoteStreamingIntervalInSeconds?: number
  tags?: Array<string>
  resourceSlots?: number
  copyFactoryResourceSlots?: number
  metastatsApiEnabled?: boolean
}