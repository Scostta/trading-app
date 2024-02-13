import { Flex, IconButton, Image } from "@chakra-ui/react"
import { useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { brand } from "../../../../../../utils/css"

interface TradeImagesProps {
  images?: Array<{
    title?: string
    description?: string
    url: string
  }>
}

export const TradeImages = ({ images }: TradeImagesProps): JSX.Element | null => {

  const [index, indexSet] = useState(0)

  if (!images?.length) return null
  const image = images[index]

  return (
    <>
      <Flex direction="column" gap={2}>
        <Image resize={"both"} height={400} src={image.url}></Image>
        <Flex w="full" justify="space-between">
          <IconButton
            aria-label='left'
            icon={<ArrowLeftIcon />}
            onClick={() => indexSet(index - 1)}
            isDisabled={!images[index - 1]}
            color={brand}
          />
          <IconButton
            aria-label='right'
            icon={<ArrowRightIcon />}
            onClick={() => indexSet(index + 1)}
            isDisabled={!images[index + 1]}
            color={brand}
          />
        </Flex>
      </Flex>

    </>
  )
}
