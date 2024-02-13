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
  const {
    register,
    onSubmit,
    isLoading,
    reset,
    watch,
    setValue
  } = useTradeForm(data, () => [onClose(), imagesScreenOpenSet(false)], isEdit)

  const images = watch('images')

  const handleOnCancel = (): void => {
    reset()
    onClose()
    imagesScreenOpenSet(false)
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


  const primaryActionText = imagesScreenOpen ? "Guardar cambios" : isEdit ? "Editar" : "Añadir"
  const secondaryActionText = imagesScreenOpen ? "Volver al formulario" : "Cancelar"
  const secondaryActionClick = imagesScreenOpen ? handleOnReturnToForm : handleOnCancel

  const actions = [
    { variant: "ghost", children: secondaryActionText, onClick: secondaryActionClick },
    { isLoading, type: "submit", colorScheme: "brand", children: primaryActionText, onClick: onSubmit },
  ] as ButtonProps[]

  const tradesFields = TRADE_FIELDS.filter(field => !field.onlyRead)
  const imagesText = !images?.length ? "Añadir imagenes" : `Editar las imagenes añadidas (${images.length})`

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnCancel}
      actions={actions}
    >
      {!imagesScreenOpen
        ? (
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