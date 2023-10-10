import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

interface PopoverProps {
  trigger: JSX.Element
  header?: string | JSX.Element
  content: string | JSX.Element
}

export const Popover = ({ trigger, header, content }: PopoverProps): JSX.Element => {

  return (
    <ChakraPopover placement='top'>
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <PopoverContent mr={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        {Boolean(header) && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  )
} 