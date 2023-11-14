import { useGetTradeImages } from "../../../../../../hooks/useGetTradeImages"
import { Flex, IconButton, Image, Text } from "@chakra-ui/react"
import { Loading } from "../../../../../../components/Loading"
import { useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { brand } from "../../../../../../utils/css"

interface TradeImagesProps {
  tradeId?: string
}

const getName = (nameWithExt?: string | null): string => {
  if (!nameWithExt) return ""
  const nameWithoutExt = nameWithExt.split(".")[0]
  return nameWithoutExt.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
}

export const TradeImages = ({ tradeId }: TradeImagesProps): JSX.Element | null => {
  const [index, indexSet] = useState(0)

  const { data, isLoading } = useGetTradeImages(tradeId)
  const image = data?.[index]

  if (!tradeId) return null
  return (
    <>
      {isLoading || !image
        ? <Flex w="full"><Loading /></Flex>
        : (
          <Flex direction="column" gap={2}>
            <Image resize={"both"} height={400} src={image.url}></Image>
            <Flex w="full" justify="space-between">
              <IconButton
                aria-label='left'
                icon={<ArrowLeftIcon />}
                onClick={() => indexSet(index - 1)}
                isDisabled={!data[index - 1]}
                color={brand}
              />
              <Text fontSize="xl">{getName(image.name)}</Text>
              <IconButton
                aria-label='right'
                icon={<ArrowRightIcon />}
                onClick={() => indexSet(index + 1)}
                isDisabled={!data[index + 1]}
                color={brand}
              />
            </Flex>
          </Flex>
        )
      }
    </>
  )
}
