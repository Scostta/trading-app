
import { Box, Button, Card, Flex, IconButton, Image, Tag, Text } from '@chakra-ui/react'
import { useGetMetatraderAccounts } from '../../hooks/useMetatraderAccounts'
import { Loading } from '../../components/Loading'
import { brand, cardBg } from '../../utils/css'
import { getColorFromAccountStatus } from '../../utils/status'
import { useSetAtom } from 'jotai'
import { metatraderAccountIdAtom } from '../../store/account'
import { MetatraderAccount } from 'metaapi.cloud-sdk'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const Accounts = (): JSX.Element => {

  const { accounts, isLoading } = useGetMetatraderAccounts()
  const metatraderAccountId = useSetAtom(metatraderAccountIdAtom)

  const handleOnAccountClick = (account: MetatraderAccount) => {
    metatraderAccountId(account.id)
  }

  if (isLoading) return <Loading />
  return (
    <Flex flexDirection="column" gap={6} pb={6}>
      <Button alignSelf="flex-end" w="fit-content" colorScheme='brand'>Crear una cuenta</Button>
      <Flex w="full" gap={8}>
        {accounts?.map(account => (
          <Card w="full" position="relative" cursor="pointer" bg={cardBg} p={6} key={account.id} onClick={() => handleOnAccountClick(account)}>
            <Flex justifyContent="space-between">
              <Flex gap={2} direction="column">
                <Flex gap={4}>
                  <Text>ID: </Text>
                  <Text color="gray">{account.id}</Text>
                </Flex>
                <Flex gap={4}>
                  <Text>Nombre de la cuenta: </Text>
                  <Text color="gray">{account.name}</Text>
                </Flex>
                <Flex gap={4}>
                  <Text>Servidor: </Text>
                  <Text color="gray">{account.server}</Text>
                </Flex>
                <Flex gap={4}>
                  <Text>Region: </Text>
                  <Text color="gray">{account.region}</Text>
                </Flex>
                <Flex gap={4}>
                  <Text>Status: </Text>
                  <Tag colorScheme={account.state === "DEPLOYED" ? "green" : "red"}>{account.state}</Tag>
                </Flex>
                <Flex gap={4}>
                  <Text>Connected: </Text>
                  <Flex align="center">
                    <Box width={3} height={3} borderRadius="50%" bg={getColorFromAccountStatus(account.connectionStatus)} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex h="full" direction="column" justifyContent="space-between">
                <Flex>
                  <IconButton _hover={{ color: brand }} variant="link" aria-label='delete-button' icon={<DeleteIcon />} />
                  <IconButton _hover={{ color: brand }} variant="link" aria-label='edit-button' icon={<EditIcon />} />
                </Flex>
                <Image alignSelf="flex-end" width={"50px"} height={"50px"} borderRadius="30%" src={`/mt${account.version}.png`} />
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  )
}

export default Accounts