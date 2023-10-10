import { DisplayLinked, DisplayOrderType, DisplayProfit } from "../../../../components/Displays";

export const COLUMNS = [
  { header: "Fecha de apertura", field: "openTime" },
  { header: "Precio de apertura", field: "openPrice" },
  { header: "Fecha de cierre", field: "closeTime" },
  { header: "Precio de cierre", field: "closePrice" },
  { header: "Tipo de orden", field: "type", component: DisplayOrderType },
  { header: "Simbolo", field: "symbol" },
  { header: "Volumen", field: "volume" },
  { header: "Profit", field: "profit", component: DisplayProfit },
  { header: "", field: "linked", component: DisplayLinked },
]