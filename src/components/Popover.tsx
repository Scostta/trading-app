import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { bg } from '../utils/css'

interface PopoverProps {
  trigger: JSX.Element
  header?: string | JSX.Element
  content: string | JSX.Element
}

export const Popover = ({ trigger, header, content }: PopoverProps): JSX.Element => {

  return (
    <ChakraPopover placement='top' trigger='hover' >
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <PopoverContent mr={4} bg={bg}>
        <PopoverArrow />
        <PopoverCloseButton />
        {Boolean(header) && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  )
} 