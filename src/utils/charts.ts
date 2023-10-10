import { ChartData } from "chart.js";
import { Trade } from "../types/db";
import { COLORS, getColorCharts } from "../constants/colors";
import { getMonthByDate } from "./dates";
import { MetricsMetatrader, TradesMetatrader } from "../types/metaStats";
import { brand } from "./css";

type ResultOptions = "won" | "lost" | "be"
type Options = Array<{ readonly value: string, label: string }>
type Filter = { field: keyof Trade, value: string }
type TradeType = "DEAL_TYPE_SELL" | "DEAL_TYPE_BUY"
type TradeSuccess = "won" | "lost"

//#region WINRATE
export const parseWinrate = (data?: Array<Trade>): ChartData<"doughnut"> => {
  if (!data) return { labels: [], datasets: [] }

  const winrate = { wins: 0, loses: 0, be: 0 }
  data.forEach(({ result }) => {
    if (result === "won") return winrate.wins += 1
    if (result === "lost") return winrate.loses += 1
    if (result === "be") return winrate.be += 1
  })

  const colors = getColorCharts(0.6)
  const bordercolors = getColorCharts()

  return {
    labels: ["Ganados", "Perdidos", "BE"],
    datasets: [{
      data: [winrate.wins, winrate.loses, winrate.be],
      backgroundColor: [
        colors.GREEN,
        colors.RED,
        colors.ORANGE,
      ],
      borderColor: [
        bordercolors.GREEN,
        bordercolors.RED,
        bordercolors.ORANGE,
      ],
    }]
  }
}
//#endregion

//#region WINS AND LOSES BARS
export const parseWinAndLosesByTime = (data?: Array<Trade>): ChartData<"bar"> => {
  if (!data) return { labels: [], datasets: [] }

  const months = [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('es', { month: 'long' }))

  const colors = getColorCharts(0.8)
  const bars = {
    WIN: { label: "Ganados", value: "won", bg: colors.GREEN },
    LOSS: { label: "Perdidos", value: "lost", bg: colors.RED },
    BE: { label: "BE", value: "be", bg: colors.ORANGE },
  }

  const winrateByMonths = data.reduce((prev: { [key: string]: { won: number, lost: number, be: number } }, curr) => {
    const month = getMonthByDate(curr.date)
    if (prev[month]?.[curr.result as ResultOptions] === undefined) return { ...prev, [month as string]: { ...prev[month], [curr.result as ResultOptions]: 1 } }
    return { ...prev, [month]: { ...prev[month], [curr.result]: prev[month][curr.result as ResultOptions] + 1 } }
  }, {})

  return {
    labels: months.map(month => month.toUpperCase()),
    datasets: Object.values(bars).map(result => ({
      label: result.label,
      data: months.map(month => winrateByMonths[month]?.[result.value as ResultOptions] || 0),
      backgroundColor: result.bg,
      borderRadius: 6
    }))
  }
}
//#endregion

//#region WINNER FIELDS
export const parseWinnerFields = (data?: Array<Trade>, options?: Options, key?: string, filter?: Filter): ChartData<"doughnut"> => {
  if (!data || !options || !key) return { labels: [], datasets: [] }

  const colors = getColorCharts(0.6)
  const borderColors = getColorCharts()
  const winrateObject = {
    WIN: { label: "Ganados", value: "won", bg: colors.GREEN },
    LOSS: { label: "Perdidos", value: "lost", bg: colors.RED },
    BE: { label: "BE", value: "be", bg: colors.ORANGE },
  }

  const getDataByResult = (result: string, value: string) => {
    const canFilter = filter?.field && filter.value
    return data.filter(trade => trade.result === result && trade[key as keyof Trade] === value && (canFilter ? trade[filter.field] === filter.value : true)).length
  }

  return {
    labels: Object.values(winrateObject).map(obj => obj.label),
    datasets: options.map(option => ({
      label: option.label,
      data: Object.values(winrateObject).map(obj => getDataByResult(obj.value, option.value)),
      backgroundColor: [
        colors.GREEN,
        colors.RED,
        colors.ORANGE,
      ],
      borderColor: [
        borderColors.GREEN,
        borderColors.RED,
        borderColors.ORANGE,
      ],
    }))
  }
}
//#endregion

//#region GROWTH CURVE
export const parseGrowthCurve = (data?: MetricsMetatrader["dailyGrowth"]): ChartData<"line"> => {
  if (!data) return { labels: [], datasets: [] }
  let highWaterMark = 0

  return {
    labels: data.map(day => day.date),
    datasets: [
      {
        label: "Balance",
        data: data.map(day => day.balance),
        borderColor: brand,
        backgroundColor: "transparent",
        borderWidth: 2,
      },
      {
        label: "Saldo más alto",
        data: data.map(day => {
          if (day.balance > highWaterMark) {
            highWaterMark = day.balance
            return day.balance
          }
          return highWaterMark
        }),
        borderColor: COLORS.GREEN,
        backgroundColor: "transparent",
        borderWidth: 2,
      },
    ]
  }
}
//#endregion

//#region LONG & SHORT ANALYSIS CHARTS
export const parselongAndShortStatistics = (data?: TradesMetatrader): ChartData<"bar"> => {
  if (!data) return { labels: [], datasets: [] }

  const colors = getColorCharts()

  const chartObject = {
    DEAL_TYPE_BUY: {
      won: 0,
      lost: 0
    },
    DEAL_TYPE_SELL: {
      won: 0,
      lost: 0
    }
  }

  const color = {
    won: colors.GREEN,
    lost: colors.RED
  }

  const tranlateType = {
    DEAL_TYPE_BUY: "Compras",
    DEAL_TYPE_SELL: "Ventas"
  }

  const tranlateSuccess = {
    won: "Ganado",
    lost: "Perdido"
  }

  data.forEach(trade => {
    chartObject[trade.type as TradeType][trade.success as TradeSuccess] =
      chartObject[trade.type as TradeType][trade.success as TradeSuccess] + trade.profit
  })

  return {
    labels: Object.keys(chartObject).map(key => tranlateType[key as TradeType]),
    datasets: ["won", "lost"].map(success => ({
      label: tranlateSuccess[success as TradeSuccess],
      data: Object.keys(chartObject).map(key => chartObject[key as TradeType][success as TradeSuccess]),
      backgroundColor: color[success as TradeSuccess],
      barPercentage: 0.3,
      borderRadius: 6
    }))
  }
}
//#endregion

//#region PAIRS ANALYSIS CHARTS
export const parsePairsStatistics = (data?: TradesMetatrader): ChartData<"bar"> => {
  if (!data) return { labels: [], datasets: [] }

  const colors = getColorCharts()

  const chartObject = {} as { [key: string]: { [key: string]: number } }

  data.forEach(trade => {
    if (!chartObject[trade.symbol as string]) {
      chartObject[trade.symbol as string] = {}
    }
    // if(chartObject[trade.symbol as string][trade.success])
    chartObject[trade.symbol as string][trade.success] = (chartObject[trade.symbol as string]?.[trade.success] ?? 0) + trade.profit
  })

  const color = {
    won: colors.GREEN,
    lost: colors.RED
  }

  const tranlateSuccess = {
    won: "Ganado",
    lost: "Perdido"
  }

  return {
    labels: Object.keys(chartObject).map(key => key),
    datasets: ["won", "lost"].map(success => ({
      label: tranlateSuccess[success as TradeSuccess],
      data: Object.keys(chartObject).map(key => chartObject[key][success]),
      backgroundColor: color[success as TradeSuccess],
      barPercentage: 0.3,
      borderRadius: 6
    }))
  }
}
//#endregion

//#region VOLUME ANALYSIS CHARTS
export const parseVolumeStatistics = (data?: TradesMetatrader): ChartData<"bar"> => {
  if (!data) return { labels: [], datasets: [] }

  const colors = getColorCharts()

  const chartObject = {} as { [key: string]: number }

  data.forEach(trade => {
    chartObject[trade.symbol as string] = (chartObject[trade.symbol as string] ?? 0) + trade.volume
  })

  return {
    labels: Object.keys(chartObject).map(key => key),
    datasets: [{
      label: "Volumen",
      data: Object.keys(chartObject).map(key => chartObject[key]),
      backgroundColor: colors.GREEN,
      barPercentage: 0.3,
      borderRadius: 6
    }]
  }
}
//#endregion

//#region MONTHLY RETURNS CHART
export const parseMonthlyReturns = (data?: MetricsMetatrader["monthlyAnalytics"]): ChartData<"bar"> => {
  if (!data) return { labels: [], datasets: [] }

  const colors = getColorCharts()

  return {
    labels: data.map(key => key.date),
    datasets: [{
      label: "Rentabilidad mensual",
      data: data.map(key => Number(key.gains.toFixed(2))),
      backgroundColor: (d) => {
        if ((d.raw as number) > 0) return colors.GREEN
        return colors.RED
      },
      barPercentage: 0.3,
      borderRadius: 6
    }]
  }
}
//#endregion