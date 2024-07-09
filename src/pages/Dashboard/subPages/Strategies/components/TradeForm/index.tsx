import { Box, Button, ButtonProps, Checkbox, Flex, FormControl, FormLabel, IconButton, Input, Select, Text } from "@chakra-ui/react"
import { useTradeForm } from "../../../../../../hooks/useTrades"
import { Modal } from "../../../../../../components/Modal"
import { TRADE_FIELDS } from "../../../../../../constants/fields"
import { TradeFormData } from "../../../../../../types/forms"
import { brand } from "../../../../../../utils/css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa";
import { DeleteIcon } from '@chakra-ui/icons'


interface TradeFormProps {
  isOpen: boolean
  onClose: () => void
  data: TradeFormData | null
  isEdit?: boolean
}

const TradeForm = ({ isOpen, onClose, data, isEdit }: TradeFormProps): JSX.Element => {

  const [imagesScreenOpen, imagesScreenOpenSet] = useState(false)
  const [inputImageState, inputImageStateSet] = useState('')
  const [step, setStep] = useState(0)

  const {
    register,
    onSubmit,
    isLoading,
    reset,
    watch,
    setValue
  } = useTradeForm(data, () => [onClose(), imagesScreenOpenSet(false), setStep(0)], isEdit)

  const images = watch('images')
  const executionModel = watch('executionModel')

  const handleOnCancel = (): void => {
    reset()
    onClose()
    imagesScreenOpenSet(false)
    setStep(0)
  }

  const handleOnReturnToForm = () => imagesScreenOpenSet(false)


  const handleOnAddImage = (newImage: { url: string }) => {
    setValue("images", [
      ...images ?? [],
      newImage
    ])
    inputImageStateSet('')
  }

  const handleOnDeleteImage = (index: number) => {
    setValue("images", images?.filter((_, i) => i !== index))
  }

  const primaryActionText = imagesScreenOpen ? "Guardar cambios" : step === 0 ? "Continuar" : isEdit ? "Editar" : "Añadir"
  const primaryActionClick = step === 0 ? () => setStep(1) : onSubmit
  const secondaryActionText = imagesScreenOpen ? "Volver al formulario" : step === 0 ? "Cancelar" : "Atras"
  const secondaryActionClick = imagesScreenOpen ? handleOnReturnToForm : step === 0 ? handleOnCancel : () => setStep(0)

  const actions = [
    { variant: "ghost", children: secondaryActionText, onClick: secondaryActionClick },
    { isLoading, type: "submit", colorScheme: "brand", children: primaryActionText, onClick: primaryActionClick, isDisabled: !executionModel },
  ] as ButtonProps[]

  const tradesFields = TRADE_FIELDS.filter(field => !field.onlyRead && !field.dependency)
  const imagesText = !images?.length ? "Añadir imagenes" : `Editar las imagenes añadidas (${images.length})`

  const dependantFields = TRADE_FIELDS.filter(field => field.dependency === executionModel)

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnCancel}
      actions={actions}
    >
      {!imagesScreenOpen
        ? (
          <form onSubmit={onSubmit}>
            {step === 0 ? (
              <>
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
                                  <Checkbox size="lg" colorScheme="brand" {...register(key)} />
                                  <Text fontSize={"small"} >{helpText}</Text>
                                </Flex>
                                : <Input
                                  _hover={{ borderColor: brand }}
                                  _focusVisible={{ borderColor: brand }}
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
                <FormControl>
                  <FormLabel>Cometario</FormLabel>
                  <Input {...register("comment")} />
                </FormControl>
                <Box mt={3}>
                  <Button colorScheme="brand" variant="link" onClick={() => imagesScreenOpenSet(true)}>
                    {imagesText}
                  </Button>
                </Box>
              </>
            ) : (
              <Flex w="full" direction="column">
                {dependantFields.map(({ label, key, required, options, type, helpText }) => (
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
                          <Checkbox size="lg" colorScheme="brand" {...register(key)} />
                          <Text fontSize={"small"} >{helpText}</Text>
                        </Flex>
                        : <Input
                          _hover={{ borderColor: brand }}
                          _focusVisible={{ borderColor: brand }}
                          py="4px"
                          placeholder="Type..."
                          type={type}
                          {...register(key, { required })}
                        />
                    }
                  </FormControl>
                ))}
              </Flex>
            )}
          </form>
        )
        : (
          <Flex direction="column" gap={10}>
            <Flex gap={4}>
              <Input
                _hover={{ borderColor: brand }}
                _focusVisible={{ borderColor: brand }}
                placeholder="Link de la imagen"
                onChange={(e) => inputImageStateSet(e.target.value)}
                w="80%"
                value={inputImageState}
              />
              <IconButton
                aria-label="add-image"
                icon={<FaCheck />}
                onClick={() => handleOnAddImage({ url: inputImageState })}
                isDisabled={!inputImageState.trim()}
              />
            </Flex>
            <Flex flexWrap="wrap" gap={4}>
              {images?.map((image, index) => (
                <Box
                  w="120px"
                  h="120px"
                  backgroundImage={image.url}
                  backgroundPosition="center"
                  backgroundSize="cover"
                  backgroundRepeat="no-repeat"
                  borderRadius={4}
                  display="flex"
                  justifyContent="flex-end"
                  p={1}
                >
                  <IconButton
                    aria-label="delete-image"
                    icon={<DeleteIcon />}
                    colorScheme="brand"
                    onClick={() => handleOnDeleteImage(index)}
                  />
                </Box>
              ))}
            </Flex>
          </Flex>
        )}
    </Modal>
  )
}

export default TradeForm