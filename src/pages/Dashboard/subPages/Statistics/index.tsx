import { Card, CardBody, CardHeader, Flex, Grid, Text } from '@chakra-ui/react'
import { MetricsMetatrader, TradesMetatrader } from '../../../../types/metaStats'
import { brand, cardBg } from '../../../../utils/css'
import { FaRegThumbsUp, FaRegThumbsDown, FaHashtag, FaTable, FaTrophy, FaChartLine, FaClock, FaArrowsAltV, FaChartPie } from "react-icons/fa"
import { Loading } from '../../../../components/Loading'
import { CURRENCY } from '../../../../constants/currency'
import { addSufixToNumber } from '../../../../utils/displays'
import { parsePairsStatistics, parseVolumeStatistics, parselongAndShortStatistics } from '../../../../utils/charts'
import { BarChart } from '../../../../components/BarChart'

const border = "1px solid grey"

const statisticsToShow = [
  { label: "Best Trade", field: "bestTrade", borderRight: border, borderBottom: border, icon: <FaRegThumbsUp color={brand} fontSize="1.5rem" />, showCurrency: true },
  { label: "Worst Trade", field: "worstTrade", borderRight: border, borderBottom: border, icon: <FaRegThumbsDown color={brand} fontSize="1.5rem" />, showCurrency: true },
  { label: "No. of Trades", field: "trades", borderRight: border, borderBottom: border, icon: <FaHashtag color={brand} fontSize="1.5rem" /> },
  { label: "Lots", field: "lots", borderRight: border, borderBottom: border, icon: <FaTable color={brand} fontSize="1.5rem" /> },
  { label: "Win Rate", field: "winrate", borderBottom: border, icon: <FaTrophy color={brand} fontSize="1.5rem" /> },
  { label: "Average Win", field: "averageWin", borderRight: border, icon: <FaChartLine color={brand} fontSize="1.5rem" />, showCurrency: true },
  { label: "Average Loss", field: "averageLoss", borderRight: border, icon: <FaChartLine style={{ transform: "scaleY(-1)" }} color={brand} fontSize="1.5rem" />, showCurrency: true },
  { label: "Average RRR", field: "averageRRR", borderRight: border, icon: <FaArrowsAltV color={brand} fontSize="1.5rem" /> },
  { label: "Expectancy", field: "expectancy", borderRight: border, icon: <FaClock color={brand} fontSize="1.5rem" />, showCurrency: true },
  { label: "Profit Factor", field: "profitFactor", icon: <FaChartPie color={brand} fontSize="1.5rem" /> },
]

interface StatisticsProps {
  metrics?: MetricsMetatrader
  isLoading?: boolean
  trades?: TradesMetatrader
}

const Statistics = ({ metrics, isLoading, trades }: StatisticsProps): JSX.Element => {

  const getValue = (field: keyof MetricsMetatrader, showCurrency?: boolean) => {
    const winrate = ((100 * (metrics?.wonTrades ?? 0)) / (metrics?.trades ?? 0))
    const average = (metrics?.averageWin ?? 0) - (metrics?.averageLoss ?? 0)
    const defaultValue = ((metrics?.[field as keyof MetricsMetatrader] as number) ?? 0)
    switch (field) {
      case "averageRRR" as keyof MetricsMetatrader:
        return addSufixToNumber(average, "")
      case "winrate" as keyof MetricsMetatrader:
        return addSufixToNumber(winrate, "%")
      default:
        return addSufixToNumber(defaultValue, showCurrency ? CURRENCY : "")
    }
  }

  const longsAndShortsAnalysis = parselongAndShortStatistics(trades)
  const pairsAnalysis = parsePairsStatistics(trades)
  const volumeAnalysis = parseVolumeStatistics(trades)

  if (isLoading) return <Loading />
  return (
    <Flex flexDirection="column" gap={6} pb={6}>
      <Card bg={cardBg}>
        <CardHeader>
          <Text color="lightgray" fontSize="2xl">Estadisticas</Text>
        </CardHeader>
        <CardBody pt={0}>
          <Grid gridTemplateColumns={"repeat(5, 1fr)"}>
            {statisticsToShow.map(({ borderBottom, borderRight, label, field, icon, showCurrency }) => {
              return (
                <Flex key={label} justify="center" padding={1.5} py={4} align="center" gap={4} borderRight={borderRight ?? ''} borderBottom={borderBottom ?? ''}>
                  {icon}
                  <Flex direction="column" align="center">
                    <Text color="grey">{label}</Text>
                    <Text fontSize={20}>{getValue(field as keyof MetricsMetatrader, showCurrency)}</Text>
                  </Flex>
                </Flex>
              )
            })}
          </Grid>
        </CardBody>
      </Card>
      <Flex gap={6} w={"full"} minHeight={500} direction={["column", "column", "column", "row"]}>
        <BarChart
          title='Analisis de Compras y Ventas'
          hasLegend={false}
          maintainAspectRatio={false}
          data={longsAndShortsAnalysis}
          isStacked
          containerProps={{ w: "full" }}
        />
        <BarChart
          title='Analisis de Pares de Divisas'
          hasLegend={false}
          maintainAspectRatio={false}
          data={pairsAnalysis}
          isStacked
          containerProps={{ w: "full" }}
        />
        <BarChart
          title='Analisis de Volumen'
          hasLegend={false}
          maintainAspectRatio={false}
          data={volumeAnalysis}
          containerProps={{ w: "full" }}
        />
      </Flex>
    </Flex>
  )
}

export default Statistics