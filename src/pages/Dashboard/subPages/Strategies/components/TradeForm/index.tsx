import { Box, ButtonProps, Checkbox, Flex, FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react"
import { useTradeForm } from "../../../../../../hooks/useTrades"
import { Modal } from "../../../../../../components/Modal"
import { TRADE_FIELDS } from "../../../../../../constants/fields"
import { TradeFormData } from "../../../../../../types/forms"
import { brand } from "../../../../../../utils/css"

interface TradeFormProps {
  isOpen: boolean
  onClose: () => void
  data: TradeFormData | null
  isEdit?: boolean
}

const TradeForm = ({ isOpen, onClose, data, isEdit }: TradeFormProps): JSX.Element => {

  const { register, onSubmit, isLoading, reset } = useTradeForm(data, onClose, isEdit)

  const handleOnCancel = () => {
    reset()
    onClose()
  }

  const primaryActionText = isEdit ? "Editar" : "Añadir"
  const actions = [
    { variant: "ghost", children: "Cancelar", onClick: handleOnCancel },
    { isLoading, type: "submit", colorScheme: "brand", children: primaryActionText, onClick: onSubmit },
  ] as ButtonProps[]

  const tradesFields = TRADE_FIELDS.filter(field => !field.onlyRead)

  return (
    <Modal isOpen={isOpen} onClose={onClose} actions={actions}>
      <form onSubmit={onSubmit}>
        <Flex w="full" gap={8}>
          {[{ start: 0, end: tradesFields.length / 2 }, { start: tradesFields.length / 2, end: tradesFields.length }].map(({ start, end }, i) => {
            return (
              <Box w="full" key={i}>
                {tradesFields.slice(Math.round(start), Math.round(end)).map(({ label, key, required, options, type, helpText }) => (
                  <FormControl py={1.5} key={key} isRequired={required}>
                    <FormLabel>{label}</FormLabel>
                    {options
                      ? <Select
                        _hover={{ borderColor: brand }}
                        _focusVisible={{ borderColor: brand }}
                        placeholder="Select..."
                        {...register(key, { required })}
                      >
                        {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                      </Select>
                      : type === "checkbox"
                        ? <Flex h={"40px"} align="center" gap={4}>
                          <Checkbox size="lg" colorScheme="brand" {...register("isBE")} />
                          <Text fontSize={"small"} >{helpText}</Text>
                        </Flex>
                        : <Input
                          _hover={{ borderColor: brand }}
                          _focusVisible={{ borderColor: brand }}
                          accept="image/*"
                          py="4px"
                          placeholder="Type..."
                          type={type}
                          {...register(key, { required })}
                        />
                    }
                  </FormControl>
                ))}
              </Box>
            )
          })}
        </Flex>
      </form>
    </Modal>
  )
}

export default TradeForm