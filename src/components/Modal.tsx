import {
  Button,
  ButtonProps,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalProps as ChakraModalProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { brand, cardBg } from "../utils/css";

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
  title?: string | JSX.Element | null
  actions?: Array<ButtonProps>
  size?: ChakraModalProps["size"]
}

export const Modal = ({ isOpen, onClose, children, title, actions, size }: ModalProps): JSX.Element => {

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size={size ?? "3xl"}>
      <ModalOverlay />
      <ModalContent margin="auto" backgroundColor={cardBg} borderTop={`4px solid ${brand}`}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter gap={4}>
          {actions?.map((action, i) => <Button key={i} {...action}></Button>)}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}