import { Button, Card, CardBody, CardHeader, Flex, Grid, Text } from '@chakra-ui/react'
import { Loading } from '../../../../components/Loading'
import { MetricsMetatrader } from '../../../../types/metaStats'
import { cardBg } from '../../../../utils/css'
import Goal from './components/Goal'
import GoalForm from './components/GoalForm'
import { useState } from 'react'
import { Goal as GoalDB } from '../../../../types/db'
import { useDeleteGoal } from '../../../../hooks/useGoals'

interface GoalsProps {
  metrics?: MetricsMetatrader
  isLoading: boolean
  goals?: Array<GoalDB>
}

const Goals = ({ metrics, isLoading, goals }: GoalsProps): JSX.Element => {

  const [showGoalFormModal, showGoalFormModalSet] = useState(false)
  const [selectedGoal, selectedGoalSet] = useState<GoalDB | undefined>(undefined)
  const { onDelete, isLoading: deleteLoadingId } = useDeleteGoal()

  const handleOnClose = () => {
    selectedGoal ? selectedGoalSet(undefined) : showGoalFormModalSet(false)
  }

  if (isLoading) return <Loading />
  return (
    <>
      <Card pb={6} bg={cardBg}>
        <CardHeader display="flex" justifyContent="space-between">
          <Text color="lightgray" fontSize="2xl">Objetivos</Text>
          <Button colorScheme='brand' onClick={() => showGoalFormModalSet(true)} >Añadir Objetivo</Button>
        </CardHeader>
        <CardBody>
          {goals?.length
            ? <Grid w="full" templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={8}>
              {goals?.map((goal) => {
                const { field, goalValue, label, type, valuePrefix, id } = goal
                return (
                  <Goal
                    containerProps={{ cursor: "pointer" }}
                    key={field}
                    currentValue={Number(metrics?.[field as keyof MetricsMetatrader] ?? "")}
                    goalType={type}
                    fieldType={valuePrefix}
                    label={label}
                    goalValue={goalValue}
                    onEdit={() => selectedGoalSet(goal)}
                    onDelete={() => onDelete(id)}
                    deleteLoading={deleteLoadingId === goal.id}
                  />
                )
              })}

            </Grid>
            : <Flex justifyContent="center">
              <Text color="grey">No tienes ningún objetivo marcado</Text>
            </Flex>
          }
        </CardBody>
      </Card>
      <GoalForm isOpen={showGoalFormModal || Boolean(selectedGoal)} onClose={handleOnClose} data={selectedGoal} />
    </>
  )
}

export default Goals