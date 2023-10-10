import { TradeFormData } from "../types/forms"

type TradeFields = {
  label: string
  key: keyof TradeFormData
  type?: "text" | "number" | "time" | "date" | "file" | "checkbox"
  required?: boolean
  options?: Array<{ readonly value: string, label: string }>
  notShowing?: boolean
  onlyRead?: boolean
  helpText?: string
}

export const TRADE_FIELDS = [
  {
    label: "Tipo de Orden",
    key: "orderType",
    required: true,
    options: [
      { value: "sell", label: "Sell" },
      { value: "buy", label: "Buy" },
    ],
    onlyRead: true
  },
  {
    label: "Tipo de Ejecucion",
    key: "executionType",
    required: true,
    options: [
      { value: "limit", label: "Limit" },
      { value: "market", label: "Market" },
    ]
  },
  {
    label: "Estrategia",
    key: "strategy",
    required: true,
    options: [
      { value: "ob", label: "OB Inducida" },
      { value: "maxOrMin", label: "Máximo o Mínimo" },
    ]
  },
  {
    label: "Tendencia",
    key: "trend",
    required: true,
    options: [
      { value: "bullish", label: "Alcista" },
      { value: "bearish", label: "Bajista" },
    ]
  },
  {
    label: "Sesion",
    key: "sesion",
    required: true,
    options: [
      { value: "london", label: "London" },
      { value: "newYork", label: "New York" },
    ]
  },
  {
    label: "Ventana horaria",
    key: "killzoneTime",
    options: [
      { value: "9:00 - 9:45", label: "9:00 - 9:45" },
      { value: "10:20 - 10:35", label: "10:20 - 10:35" },
      { value: "15:30 - 16:15", label: "15:30 - 16:15" },
      { value: "ninguna", label: "Ninguna" }
    ],
    required: true
  },
  {
    label: "Timeframe de Escaneo",
    key: "scanTimeframe",
    required: true,
    options: [
      { value: "15", label: "15 min" },
      { value: "30", label: "30 min" },
      { value: "1", label: "1 H" },
    ]
  },
  {
    label: "Timeframe de Entrada",
    key: "entryTimeframe",
    required: true,
    options: [
      { value: "1", label: "1 min" },
      { value: "3", label: "3 min" },
      { value: "5", label: "5 min" },
    ]
  },
  {
    label: "Tipo de Entrada",
    key: "entryType",
    required: true,
    options: [
      { value: "no-confirmation", label: "Sin confirmacion" },
      { value: "candlestick-formation", label: "Patron de velas" },
      { value: "IMB-confirmation", label: "IMB mas confirmacion" },
      { value: "IMB-no-confirmation", label: "IMB sin confirmacion" },
    ]
  },
  {
    label: "Pips del SL",
    key: "pipsSl",
    required: true,
    type: "number"
  },
  {
    label: "Fecha",
    key: "date",
    type: "date",
    onlyRead: true
  },
  {
    label: "Resultado",
    key: "result",
    required: true,
    options: [
      { value: "won", label: "Win" },
      { value: "lost", label: "Loss" },
      { value: "be", label: "BE" },
    ],
    onlyRead: true
  },
  {
    label: "Tradingview Scan",
    key: "tradingviewScan",
    type: "file",
    notShowing: true
  },
  {
    label: "Tradingview Entry",
    key: "tradingviewEntry",
    type: "file",
    notShowing: true
  },
  {
    label: "Marca como Breakeven",
    key: "isBE",
    type: "checkbox",
    notShowing: true,
    helpText: "Marcando la casilla se considera el trade en BE"
  },
] as Array<TradeFields>