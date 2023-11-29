import { DisplayPercentage, DisplayProfit, DisplayToFixed } from "../../../../components/Displays";

export const COLUMNS = [
  { header: "Fecha", field: "date" },
  { header: "Trades", field: "trades" },
  { header: "Lotes", field: "lots", component: DisplayToFixed },
  { header: "Profit", field: "profit", component: DisplayProfit },
  { header: "Porcentaje", field: "percentage", component: DisplayPercentage }
]