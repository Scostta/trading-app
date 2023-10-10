import { MetatraderAccount } from "metaapi.cloud-sdk"
import { Modal } from "../../components/Modal"
import { Button, Flex, HStack, Text } from "@chakra-ui/react"
import { FaCopy } from 'react-icons/fa'

interface CredentialsModalProps {
  account?: MetatraderAccount
  isOpen: boolean
  onClose: () => void
}

const ButtonCopy = ({ value }: { value: string }) => (
  <Button variant="ghost" colorScheme="brand">
    <HStack onClick={() => { navigator.clipboard.writeText(value) }}>
      <FaCopy />
      <Text>Copiar</Text>
    </HStack>
  </Button>
)

export const CredentialsModal = ({ account, isOpen, onClose }: CredentialsModalProps): JSX.Element | null => {

  if (!account) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Flex direction="column" gap={8}>
        <Text fontSize="xl">Credenciales de la cuenta</Text>
        <Flex direction="column" gap={2}>
          <Flex justify="space-between">
            <HStack gap={10}>
              <Text color="grey">Login:</Text>
              <Text color="lightgray">{account.login}</Text>
            </HStack>
            <ButtonCopy value={account.login} />
          </Flex>
          <Flex justify="space-between">
            <HStack gap={6}>
              <Text color="grey">Nombre:</Text>
              <Text color="lightgray">{account.name}</Text>
            </HStack>
            <ButtonCopy value={account.name} />
          </Flex>
          <Flex justify="space-between">
            <HStack gap={6}>
              <Text color="grey">Servidor:</Text>
              <Text color="lightgray">{account.server}</Text>
            </HStack>
            <ButtonCopy value={account.server} />
          </Flex>
          <Flex justify="space-between">
            <HStack gap={2}>
              <Text color="grey">Plataforma:</Text>
              <Text color="lightgray">{`MT${account.version}`}</Text>
            </HStack>
            <ButtonCopy value={account.version.toString()} />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}