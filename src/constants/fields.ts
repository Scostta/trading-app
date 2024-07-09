import { TradeFormData } from "../types/forms"

export type TradeFields = {
  label: string
  key: keyof TradeFormData
  type?: "text" | "number" | "time" | "date" | "file" | "checkbox"
  required?: boolean
  options?: Array<{ readonly value: string, label: string }>
  notShowing?: boolean
  onlyRead?: boolean
  helpText?: string
  full?: boolean
  dependency?: string
}

export const TRADE_FIELDS = [
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
    label: "Etapa macro",
    key: "stage",
    required: true,
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
  },
  {
    label: "Modelo de entrada",
    key: "executionModel",
    options: [
      { value: "RVP", label: "RVP" },
      { value: "slit", label: "Silt" },
      { value: "spear", label: "Spear" },
    ],
    required: true,
  },
  {
    label: "Timeframe de Entrada",
    key: "entryTimeframe",
    required: true,
    options: [
      { value: "1D", label: "1D" },
      { value: "4H", label: "4H" },
      { value: "1H", label: "1H" },
      { value: "15m", label: "15 min" },
      { value: "5m", label: "5 min" },
      { value: "1m", label: "1 min" },
    ]
  },
  {
    label: "Pips del SL",
    key: "pipsSl",
    required: true,
    type: "number",
  },
  {
    label: "Fecha",
    key: "date",
    type: "date",
    onlyRead: true,
    notShowing: true
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
    label: "Fractales internos",
    key: "interiorFractals",
    required: true,
    type: "number",
    notShowing: true,
    dependency: "RVP"
  },
  {
    label: "Tipo de rompimiento",
    key: "break_type",
    options: [
      { value: "weak", label: "Fuerte" },
      { value: "strong", label: "Debil" },
    ],
    notShowing: true,
    dependency: "RVP"
  },
  {
    label: "Incentivo",
    key: "hasVTX",
    type: "checkbox",
    notShowing: true,
    helpText: "Tiene VTX para crear un nuevo fractal",
    dependency: "RVP"
  },
  {
    label: "Liquidez",
    key: "hasLiquidity",
    type: "checkbox",
    notShowing: true,
    helpText: "Tiene liquidez previa?",
    dependency: "RVP"
  },
  {
    label: "Nivel de falso rompimiento",
    key: "break_level",
    options: [
      { value: "VTX", label: "Vortice" },
      { value: "DKL", label: "Docking" },
      { value: "RKL", label: "Rocking" },
    ],
    notShowing: true,
    dependency: "slit"
  },
  {
    label: "Velas desde el máximo/mínimo anterior",
    key: "candles",
    type: "number",
    notShowing: true,
    dependency: "slit"
  },
  {
    label: "Tipo de rompimiento del máximo/mínimo anterior",
    key: "break_type_slit",
    options: [
      { value: "weak", label: "Fuerte" },
      { value: "strong", label: "Debil" },
    ],
    notShowing: true,
    dependency: "slit"
  },
  {
    label: "Imbalance",
    key: "hasImbalance",
    type: "checkbox",
    notShowing: true,
    helpText: "Tiene imbalance en la micro?",
    dependency: "slit"
  },
  {
    label: "Tipo de rompimiento",
    key: "break_type_spear",
    options: [
      { value: "weak", label: "Fuerte" },
      { value: "strong", label: "Debil" },
    ],
    notShowing: true,
    dependency: "spear"
  },
  {
    label: "Tipo de entrada",
    key: "entry_type",
    options: [
      { value: "VTX", label: "VTX" },
      { value: "Cambio de ritmo", label: "Cambio de ritmo" },
      { value: "Alineacion de velas", label: "Alineacion de velas" },
    ],
    notShowing: true,
    dependency: "spear"
  },
  {
    label: "Marca como Breakeven",
    key: "isBE",
    type: "checkbox",
    notShowing: true,
    helpText: "Marcando la casilla se considera el trade en BE"
  },
] as Array<TradeFields>