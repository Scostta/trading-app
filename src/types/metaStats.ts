interface CloseTradesByWeekDay {
  day: number
  gains: number
  longGains: number
  longPips: number
  longProfit: number
  longTrades: number
  longTradesPercent: number
  lostGains: number
  lostPips: number
  lostProfit: number
  lostTrades: number
  lostTradesPercent: number
  pips: number
  profit: number
  trades: number
}

interface TradeByType {
  pips: number
  profit: number
  trades: number
}

interface History {
  date: string
  longPips?: number
  longProfit?: number
  shortPips?: number
  shortProfit?: number
  totalPips: number
  totalProfit: number
}

interface CurrencySummary {
  currency: string
  history: Array<History>
  long?: TradeByType
  short?: TradeByType
  total: {
    lostTrades?: number
    lostTradesPercent?: number
    winTrades?: number
    winTradesPercent?: number
    pips: number
    profit: number
    trades: number
  }
}

interface DailyGrowth {
  balance: number
  date: string
  drawdownPercentage: number
  drawdownProfit: number
  gains: number
  lots: number
  pips: number
  profit: number
  totalGains: number
  totalProfit: number
}

interface MonthlyAnalytics {
  currencies: Array<{ currency: string, popularityPercent: number, rewardToRiskRatio: number }>
  date: string
  gains: number
  lots: number
  pips: number
  profit: number
  trades: number
}

interface OpenTradesByHour {
  gains: number
  hour: number
  longGains?: number
  longPips?: number
  longProfit?: number
  longTrades?: number
  longTradesPercent?: number
  lostGains?: number
  lostPips?: number
  lostProfit?: number
  lostTrades?: number
  lostTradesPercent?: number
  shortGains?: number
  shortPips?: number
  shortProfit?: number
  shortTrades?: number
  shortTradesPercent?: number
  winGains?: number
  winPips?: number
  winProfit?: number
  winTrades?: number
  winTradesPercent?: number
  pips: number
  profit: number
  trades: number
}

interface Period {
  gain: number
  lots: number
  pips: number
  profit: number
  trades: number
}

interface RiskOfRuin {
  consecutiveLosingTrades: number
  lossSize: number
  probabilityOfLoss: number
}

interface TradeDuration {
  durationInMinutes: number
  gains: Array<number>
  lots: Array<number>
  pips: Array<number>
  profits: Array<number>
}


export interface MetricsMetatrader {
  absoluteGain: number
  averageHoldingPeriodReturn: number
  averageLoss: number
  averageLossPips: number
  averageTradeLengthInMilliseconds: number
  averageWin: number
  averageWinPips: number
  balance: number
  bestTrade: number
  bestTradeDate: string
  bestTradePips: number
  bestTradePipsDate: string
  closeTradesByWeekDay: Array<CloseTradesByWeekDay>
  currencySummary: Array<CurrencySummary>
  dailyGain: number
  dailyGrowth: Array<DailyGrowth>
  daysSinceTradingStarted: number
  deposits: number
  equity: number
  equityPercent: number
  expectancy: number
  expectancyPips: number
  freeMargin: number
  gain: number
  geometricHoldingPeriodReturn: number
  highestBalance: number
  highestBalanceDate: string
  longTrades?: number
  shortTrades?: number
  lostTrades?: number
  wonTrades?: number
  lostTradesPercent?: number
  wonTradesPercent?: number
  lots: number
  margin: number
  monthlyAnalytics: Array<MonthlyAnalytics>
  monthlyGain: number
  openTradesByHour: Array<OpenTradesByHour>
  periods: { thisMonth: Period, thisWeek: Period, thisYear: Period, today: Period }
  pips: number
  profit: number
  profitFactor: number
  riskOfRuin: Array<RiskOfRuin>
  totalTradeMarketValue: number
  tradeDuration: { lost: Array<TradeDuration> }
  // tradeDurationDiagram: any
  trades: number
  tradingStartBrokerTime: string
  worstTrade: number
  worstTradeDate: string
  worstTradePips: number
  worstTradePipsDate: string
  withdrawals: number
}

export interface TradeMetatrader {
  accountId: number
  closePrice: number
  closeTime: string
  durationInMinutes: number
  gain: number
  marketValue: number
  openPrice: number
  openTime: string
  pips: number
  positionId: string
  profit: number
  success: string
  symbol: string
  type: DealType
  volume: number
  _id: string
}

export type TradesMetatrader = Array<TradeMetatrader>

export type OpenTradesMetatrader = Array<TradeMetatrader>

export type DealType = "DEAL_TYPE_BALANCE" | "DEAL_TYPE_BUY" | "DEAL_TYPE_SELL"