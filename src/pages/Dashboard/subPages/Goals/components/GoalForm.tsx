import { ButtonProps, Checkbox, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import { useGoalForm } from "../../../../../hooks/useGoals"
import { Modal } from "../../../../../components/Modal"
import { GoalFormData } from "../../../../../types/forms"
import { posibleGoals } from "../config"
import { CURRENCY } from "../../../../../constants/currency"
import { brand } from "../../../../../utils/css"

interface GoalFormProps {
  isOpen: boolean
  onClose: () => void
  data?: GoalFormData | null
}

const GoalForm = ({ isOpen, onClose, data }: GoalFormProps): JSX.Element => {

  const isEdit = Boolean(data)
  const { register, onSubmit, isLoading, reset } = useGoalForm(data, onClose)

  const handleOnCancel = () => {
    reset()
    onClose()
  }

  const primaryActionText = isEdit ? "Editar" : "Añadir"
  const actions = [
    { variant: "ghost", children: "Cancelar", onClick: handleOnCancel },
    { isLoading, type: "submit", colorScheme: "brand", children: primaryActionText, onClick: onSubmit },
  ] as ButtonProps[]

  return (
    <Modal isOpen={isOpen} onClose={handleOnCancel} actions={actions}>
      <form onSubmit={onSubmit}>
        <FormControl mb={6}>
          <Checkbox colorScheme="brand"  {...register("showInOverview")}>Añadir Objetivo a la vision general</Checkbox>
        </FormControl>
        <Flex w="full" gap={8}>
          <FormControl py={1.5} isRequired>
            <FormLabel>Escoge un objetivo</FormLabel>
            <Select
              _hover={{ borderColor: brand }}
              _focusVisible={{ borderColor: brand }}
              placeholder="Select..." {...register("field")}
            >
              {posibleGoals.map(({ field, label, valuePrefix }) => (
                <option key={field} value={field}>{`${label} (${valuePrefix === "money" ? CURRENCY : "%"})`}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl py={1.5} isRequired>
            <FormLabel>Valor del objetivo para cumplir</FormLabel>
            <Input
              _hover={{ borderColor: brand }}
              _focusVisible={{ borderColor: brand }}
              type="number"
              {...register("goalValue", { required: true })}
            />
          </FormControl>
        </Flex>
      </form>
    </Modal>
  )
}

export default GoalForm