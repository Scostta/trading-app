import Strategies from './subPages/Strategies'
import Overview from './subPages/Overview'
import MonthlySummary from './subPages/MonthlySummary'
import TradeHistory from './subPages/TradeHistory'
import Goals from './subPages/Goals'
import Statistics from './subPages/Statistics'
import { MetricsMetatrader, TradesMetatrader } from '../../types/metaStats'
import { Goal } from '../../types/db'
import { MetatraderAccount } from 'metaapi.cloud-sdk'

interface TabsParams {
  metrics?: MetricsMetatrader
  trades?: TradesMetatrader
  isLoading: boolean
  goals: Array<Goal> | undefined
  goalsLoading: boolean
  account?: MetatraderAccount
}

export const TABS = ({ metrics, trades, isLoading, goals, goalsLoading, account }: TabsParams) => [
  {
    label: "Vision general",
    component: <Overview metrics={metrics} isLoading={isLoading || goalsLoading} goals={goals} account={account} />,
    key: "overview"
  },
  {
    label: "Resumen mensual",
    component: <MonthlySummary metrics={metrics} isLoading={isLoading} />,
    key: "daily-summary"
  },
  {
    label: "Objetivos",
    component: <Goals metrics={metrics} isLoading={isLoading || goalsLoading} goals={goals} />,
    key: "goals"
  },
  {
    label: "Estadisticas",
    component: <Statistics metrics={metrics} isLoading={isLoading} trades={trades} />,
    key: "statistics"
  },
  {
    label: "Historial de trades",
    component: <TradeHistory trades={trades} isLoading={isLoading} />,
    key: "trade-history"
  },
  {
    label: "Estrategias",
    component: <Strategies />,
    key: "strategies"
  }
]