import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, Text } from '@chakra-ui/react'
import { Loading } from '../../../../components/Loading'
import { MetricsMetatrader } from '../../../../types/metaStats'
import { bg, cardBg } from '../../../../utils/css'
import { COLORS } from '../../../../constants/colors'
import { addSufixToNumber } from '../../../../utils/displays'
import { CURRENCY } from '../../../../constants/currency'
import { LineChart } from '../../../../components/LineChart'
import { parseGrowthCurve } from '../../../../utils/charts'
import { Goal as GoalDB } from '../../../../types/db'
import Goal from '../Goals/components/Goal'
import { MetatraderAccount } from 'metaapi.cloud-sdk'
import { formatDate } from '../../../../utils/dates'
import { useSetAtom } from 'jotai'
import { activeTabIndexAtom } from '../../../../store/tabs'

interface OverviewProps {
  metrics?: MetricsMetatrader
  isLoading: boolean
  goals?: Array<GoalDB>
  account?: MetatraderAccount
}

// const SHOW_MAX_GOALS = 3
const getPercentage = (num?: number, total?: number) => ((100 * (num ?? 0)) / (total ?? 0))
const getColor = (num?: number) => {
  if (!num || (typeof num !== "number")) return "grey"
  if (num > 0) return COLORS.GREEN
  return COLORS.RED
}

const Overview = ({ metrics, isLoading, goals, account }: OverviewProps): JSX.Element => {

  const activeTabIndexSet = useSetAtom(activeTabIndexAtom)

  const { profit, withdrawals, deposits, equity, highestBalance, dailyGrowth, tradingStartBrokerTime, daysSinceTradingStarted } = metrics ?? {}

  const withdrawalsPercentage = getPercentage(Math.abs(withdrawals ?? 0), deposits)
  const equityPercentage = getPercentage(profit, deposits)
  const highestBalancePercentage = getPercentage(((highestBalance ?? 0) - (deposits ?? 0)), deposits)

  const filteredGoals = goals?.filter(goal => goal.showInOverview)

  if (isLoading) return <Loading />
  return (
    <Flex flexDirection={"column"} gap={6} pb={6} w="full">
      <Flex w="full" gap={8} direction={["column", "row", "row"]}>

        <Card bg={cardBg} w="full">
          <CardBody>
            <Flex justify="space-between">
              <Text color="grey" fontSize="xl">Depositado</Text>
            </Flex>
            <Text fontSize="large">{addSufixToNumber(deposits, CURRENCY)}</Text>
          </CardBody>
        </Card>

        <Card bg={cardBg} w="full">
          <CardBody>
            <Flex justify="space-between">
              <Text color="grey" fontSize="xl">Retiradas</Text>
              <Text color={getColor(withdrawalsPercentage)}>{addSufixToNumber(withdrawalsPercentage, "%")}</Text>
            </Flex>
            <Text fontSize="large">{addSufixToNumber(withdrawals, CURRENCY)}</Text>
          </CardBody>
        </Card>

      </Flex>
      <Flex w="full" gap={8} direction={["column", "column", "row"]}>

        <Card bg={cardBg} w="full">
          <CardBody>
            <Flex justify="space-between">
              <Text color="grey" fontSize="xl">Patrimonio actual</Text>
              <Text color={getColor(equityPercentage)}>{addSufixToNumber(equityPercentage, "%")}</Text>
            </Flex>
            <Text fontSize="large">{addSufixToNumber(equity, CURRENCY)}</Text>
          </CardBody>
        </Card>

        <Card bg={cardBg} w="full">
          <CardBody>
            <Flex justify="space-between">
              <Text color="grey" fontSize="xl">Ganacia/Perdida neta</Text>
              <Text color={getColor(equityPercentage)}>{addSufixToNumber(equityPercentage, "%")}</Text>
            </Flex>
            <Text fontSize="large">{addSufixToNumber(profit, CURRENCY)}</Text>
          </CardBody>
        </Card>

        <Card bg={cardBg} w="full">
          <CardBody>
            <Flex justify="space-between">
              <Text color="grey" fontSize="xl">Saldo más alto</Text>
              <Text color={getColor(highestBalancePercentage)}>{addSufixToNumber(highestBalancePercentage, "%")}</Text>
            </Flex>
            <Text fontSize="large">{addSufixToNumber(highestBalance, CURRENCY)}</Text>
          </CardBody>
        </Card>
      </Flex>
      <LineChart containerProps={{ height: "500px" }} data={parseGrowthCurve(dailyGrowth)} title='Curva de crecimiento' />
      <Flex w="full" gap={8} direction={["column", "column", "row"]}>

        <Card bg={cardBg} w="full" height={"fit-content"}>
          <CardHeader>
            <Text color="lightgray" fontSize="2xl">Información de la cuenta</Text>
          </CardHeader>
          <CardBody>
            <Flex direction="column" gap={4}>

              <Box w="full" p={4} borderRadius={4}>
                <Flex justify="space-between">
                  <Text>Fecha de inicio</Text>
                  <Text>{formatDate(new Date(tradingStartBrokerTime ?? ''))}</Text>
                </Flex>
                <Text fontSize="sm" color="grey">Inicio del periodo de trading</Text>
              </Box>

              <Box w="full" p={4} bg={bg} borderRadius={4}>
                <Flex justify="space-between">
                  <Text>Días desde el inicio</Text>
                  <Text>{Math.round(daysSinceTradingStarted ?? 0)}</Text>
                </Flex>
                <Text fontSize="sm" color="grey">Días que han pasado desde que se abrio la cuenta</Text>
              </Box>

              <Box w="full" p={4} borderRadius={4}>
                <Flex justify="space-between">
                  <Text>Servidor</Text>
                  <Text>{account?.server}</Text>
                </Flex>
              </Box>

              <Box w="full" p={4} bg={bg} borderRadius={4}>
                <Flex justify="space-between">
                  <Text>Plataforma</Text>
                  <Text>{`MT${account?.version}`}</Text>
                </Flex>
              </Box>

            </Flex>
          </CardBody>
        </Card>

        <Card bg={cardBg} w="full">
          <CardHeader>
            <Text color="lightgray" fontSize="2xl">Visión general de los objetivos</Text>
          </CardHeader>
          {filteredGoals?.length
            ? <CardBody>
              <Grid w="full" templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={8}>
                {filteredGoals?.map(({ field, goalValue, label, type, valuePrefix }) => (
                  <Goal key={field} currentValue={Number(metrics?.[field as keyof MetricsMetatrader] ?? "")} goalType={type} fieldType={valuePrefix} label={label} goalValue={goalValue} />
                ))}
              </Grid>
            </CardBody>
            : <Flex w="full" h="full" justify="center" align="center" direction="column" gap={2}>
              <Text color="grey">No hay objtivos para mostrar</Text>
              <Button fontWeight={400} colorScheme='brand' variant="link" onClick={() => activeTabIndexSet(2)}>
                <Text>Ves a la pestaña Objetivos para empezar a configurarlos</Text>
              </Button>
            </Flex>
          }
        </Card>

      </Flex>
    </Flex>
  )
}

export default Overview