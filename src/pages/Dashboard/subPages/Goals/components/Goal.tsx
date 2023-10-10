import { useState } from 'react'
import { Box, Card, CardBody, CardProps, Flex, IconButton, Progress, SlideFade, Tag, Text } from '@chakra-ui/react'
import { bg, myGreen, myOrange, myRed } from '../../../../../utils/css'
import { GoalType, GoalsFieldsValueType } from '../config'
import { addSufixToNumber } from '../../../../../utils/displays'
import { CURRENCY } from '../../../../../constants/currency'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

interface GoalProps {
  label: string
  currentValue?: number
  goalValue: number
  goalType: GoalType
  fieldType: GoalsFieldsValueType
  containerProps?: CardProps
  onEdit?: () => void
  onDelete?: () => void
  deleteLoading?: boolean
}

const Goal = ({
  goalValue,
  label,
  currentValue,
  goalType,
  fieldType,
  containerProps,
  onEdit,
  onDelete,
  deleteLoading
}: GoalProps): JSX.Element => {

  const [showDelete, showDeleteSet] = useState(false)

  const getState = () => {
    if (Math.abs(currentValue ?? 0) < Math.abs(goalValue)) return { colorScheme: "myOrange", color: myOrange, title: "En Progreso" }
    if (goalType === "FAILED") return { colorScheme: "myRed", color: myRed, title: "Fallido" }
    return { colorScheme: "myGreen", color: myGreen, title: "Cumplido" }
  }

  const numProgress = goalType === "FAILED"
    ? (100 * Math.abs(currentValue ?? 0)) / Math.abs(goalValue)
    : 100 * (currentValue ?? 0) / goalValue

  const progress = (goalType === "PASSED" && numProgress < 0) ? 0 : numProgress
  const percentage = addSufixToNumber(progress, "%")
  const state = getState()

  const valueSufix = fieldType === "money" ? CURRENCY : "%"
  const currentValueString = addSufixToNumber(currentValue, valueSufix)
  const goalValueString = addSufixToNumber(goalValue, valueSufix)

  const { color, colorScheme, title } = state

  return (
    <Card
      onMouseEnter={() => showDeleteSet(true)}
      onMouseLeave={() => showDeleteSet(false)}
      bg={bg}
      {...containerProps}
      w="full"
      position="relative"
    >
      <CardBody>
        <Flex direction="column" gap={4}>
          <Flex justify="space-between">
            <Text color="lightgrey" fontSize="xl">{label}</Text>
            <Tag py={1.5} height="max-content" minW="max-content" colorScheme={colorScheme} borderRadius={50} px={6}><Text fontWeight="bold">{title}</Text></Tag>
          </Flex>
          <Progress borderRadius={50} value={progress} colorScheme={colorScheme} />
          <Box>
            <Flex gap={2} align="center">
              <Box borderRadius={50} w={15} h={15} bg={color} />
              <Text color="grey">Resultado Actual:</Text>
              <Text>{percentage}</Text>
            </Flex>
            <Text fontSize="xl" ml="23px" color={color}>{currentValueString}</Text>
            <Flex gap={2} align="center">
              <Box borderRadius={50} w={15} h={15} bg="lightgray" />
              <Text color="grey">Valor del Objetivo:</Text>
            </Flex>
            <Text fontSize="xl" ml="23px" color="lightgray">{goalValueString}</Text>
          </Box>
        </Flex>
      </CardBody>
      {(onEdit && onDelete) && <Box position="absolute" right={0} left={0} zIndex={10} h={"100%"}>
        <SlideFade in={showDelete} style={{ height: "100%" }}>
          <Flex h="full" gap={8} padding={6} bg={"rgba(28, 28, 28, 0.8)"} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <IconButton isLoading={deleteLoading} onClick={onDelete} colorScheme='brand' w="full" aria-label='delete-button' icon={<DeleteIcon />} />
            <IconButton onClick={onEdit} colorScheme='brand' w="full" aria-label='delete-button' icon={<EditIcon />} />
          </Flex>
        </SlideFade>
      </Box>}
    </Card>
  )
}

export default Goal