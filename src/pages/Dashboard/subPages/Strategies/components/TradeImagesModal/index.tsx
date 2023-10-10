import { Modal } from "../../../../../../components/Modal"
import { useGetTradeImages } from "../../../../../../hooks/useGetTradeImages"
import { Flex, IconButton, Image, Text } from "@chakra-ui/react"
import { Loading } from "../../../../../../components/Loading"
import { useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"

interface TradeImagesModalProps {
  isOpen: boolean
  onClose: () => void
  tradeId: string | null
}

const getName = (nameWithExt?: string | null): string => {
  if (!nameWithExt) return ""
  const nameWithoutExt = nameWithExt.split(".")[0]
  return nameWithoutExt.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
}

const TradeImagesModal = ({ isOpen, onClose, tradeId }: TradeImagesModalProps): JSX.Element | null => {
  const [index, indexSet] = useState(0)

  const { data, isLoading } = useGetTradeImages(tradeId)
  const image = data?.[index]

  const handleOnClose = () => {
    indexSet(0)
    onClose()
  }

  if (!tradeId) return null
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {isLoading || !image
        ? <Flex w="full"><Loading /></Flex>
        : (<Flex direction="column" align="center" gap={8}>
          <Text fontSize="xl">{getName(image.name)}</Text>
          <Flex direction="column" gap={2}>
            <Image src={image.url}></Image>
            <Flex w="full" justify="space-between">
              <IconButton
                aria-label='left'
                icon={<ArrowLeftIcon />}
                onClick={() => indexSet(index - 1)}
                isDisabled={!data[index - 1]}
              />
              <IconButton
                aria-label='right'
                icon={<ArrowRightIcon />}
                onClick={() => indexSet(index + 1)}
                isDisabled={!data[index + 1]}
              />
            </Flex>
          </Flex>
        </Flex>)
      }
    </Modal>
  )
}

export default TradeImagesModal