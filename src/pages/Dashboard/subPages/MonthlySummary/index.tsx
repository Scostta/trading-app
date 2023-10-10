import { Box, Flex } from '@chakra-ui/react'
import { MetricsMetatrader } from '../../../../types/metaStats'
import { Loading } from '../../../../components/Loading'
import { Table } from '../../../../components/Table'
import { COLUMNS } from './columns'
import { BarChart } from '../../../../components/BarChart'
import { parseMonthlyReturns } from '../../../../utils/charts'

interface MonthlySummaryProps {
  metrics?: MetricsMetatrader
  isLoading: boolean
}

const MonthlySummary = ({ metrics, isLoading }: MonthlySummaryProps): JSX.Element => {

  const parsedReturns = parseMonthlyReturns(metrics?.monthlyAnalytics)

  if (isLoading) return <Loading />
  return (
    <Flex flexDirection="column" gap={6} pb={6}>
      <Flex w="full" gap={8} direction={["column", "column", "column", "row"]}>

        <Box w="full">
          <BarChart
            data={parsedReturns}
            title='Rentabilidad Mensual'
            hasLegend={false}
            containerProps={{ height: "100%" }}
          />
        </Box>

        <Box w="full">
          <Table
            title='Resumen Mensual'
            columns={COLUMNS}
            rows={metrics?.monthlyAnalytics}
          />
        </Box>

      </Flex>
    </Flex>
  )
}

export default MonthlySummary