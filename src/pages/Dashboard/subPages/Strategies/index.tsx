
import { Flex } from '@chakra-ui/react'
import { useGetTrades } from '../../../../hooks/useTrades'
import { parseWinAndLosesByTime, parseWinrate } from '../../../../utils/charts'
import { DoughnutChart } from '../../../../components/DoughnutChart'
import { BarChart } from '../../../../components/BarChart'
import { FieldsCharts } from '../../../Dashboard/subPages/Strategies/components/FieldsCharts'
import { TradesTable } from '../../../Dashboard/subPages/Strategies/components/TradesTable'

const Strategies = (): JSX.Element => {

  const { data: trades, isLoading: tradesLoading } = useGetTrades()

  const winrateData = parseWinrate(trades)
  const winAndLosesByMonth = parseWinAndLosesByTime(trades)

  return (
    <Flex flexDirection="column" gap={6} pb={6}>
      <TradesTable data={trades} isLoading={tradesLoading} />
      <Flex gap={6} direction={["column", "column", "row"]}>
        <DoughnutChart title='Winrate' data={winrateData} containerProps={{ w: ["100%", "100%", "30%"] }} />
        <BarChart title='Winrate Por Meses' data={winAndLosesByMonth} containerProps={{ w: ["100%", "100%", "70%"] }} />
      </Flex>
      <Flex gap={6}>
        <FieldsCharts data={trades} containerProps={{ w: "100%" }} />
      </Flex>
    </Flex>
  )
}

export default Strategies