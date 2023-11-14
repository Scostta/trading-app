import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerProps as ChakraDrawerProps,
  DrawerContentProps,
  Text
} from '@chakra-ui/react'
import { cardBg } from '../utils/css'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
  title?: string | JSX.Element | null
  footer?: string | JSX.Element | null
  drawerProps?: ChakraDrawerProps
  drawerContentProps?: DrawerContentProps
}

export const Drawer = ({ isOpen, onClose, title, children, footer, drawerProps, drawerContentProps }: DrawerProps): JSX.Element => {


  return (
    <ChakraDrawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size="lg"
      {...drawerProps}
    >
      <DrawerOverlay />
      <DrawerContent bg={cardBg} {...drawerContentProps}>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text color="lightgray" fontSize="2xl">{title}</Text>
        </DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>

        {footer && (<DrawerFooter>{footer}</DrawerFooter>)}
      </DrawerContent>
    </ChakraDrawer>
  )
}