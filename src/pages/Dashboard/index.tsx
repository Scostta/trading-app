
import { Button, Flex, IconButton, Select, Text } from '@chakra-ui/react'
import { Tabs } from '../../components/Tabs'
import { TABS } from './config'
import { metatraderAccountIdAtom } from '../../store/account'
import { BaseSyntheticEvent, useState } from 'react'
import { useAtom } from 'jotai'
import { useConnectMetatraderAccount, useGetMetatraderAccounts } from '../../hooks/useMetatraderAccounts'
import { Loading } from '../../components/Loading'
import { HiOutlineKey } from 'react-icons/hi'
import { useGetAllMetaApi } from './hooks/useMetaStats'
import { IoMdLogOut } from 'react-icons/io'
import { brand } from '../../utils/css'
import { useGetGoals } from '../../hooks/useGoals'
import { CredentialsModal } from './CredentialsModal'

const Dashboard = (): JSX.Element => {
  const [showCredentialsModal, showCredentialsModalSet] = useState(false)
  const { accounts } = useGetMetatraderAccounts()
  const [metatraderIdAccount, metatraderAccountIdSet] = useAtom(metatraderAccountIdAtom)
  const { isLoading, account } = useConnectMetatraderAccount(metatraderIdAccount)
  const { all, isLoading: metaApiLoading } = useGetAllMetaApi(metatraderIdAccount, !isLoading)
  const { data: goals, isLoading: goalsLoading } = useGetGoals()
  const { metrics, trades } = all

  const handleOnChange = (e: BaseSyntheticEvent) => {
    metatraderAccountIdSet(e.target.value)
  }

  const handleOnLogoutMetatrader = () => {
    metatraderAccountIdSet(undefined)
  }

  if (!accounts || isLoading) return <Loading />
  return (
    <>
      <Flex flexDirection="column" gap={6} pb={6}>
        <Flex justify="space-between" align="center">
          <Select value={metatraderIdAccount ?? ''} w={400} onChange={handleOnChange} _hover={{ borderColor: brand }} _focusVisible={{ borderColor: brand }}>
            {accounts?.map(({ id, login }) => <option key={id} value={id}>{`Account ${login}`}</option>)}
          </Select>
          <Flex gap={4}>
            <Button variant="outline" colorScheme='brand' onClick={() => showCredentialsModalSet(true)}>
              <Flex align="center" gap={2}>
                <Text>Credenciales</Text>
                <HiOutlineKey />
              </Flex>
            </Button>
            <IconButton
              onClick={handleOnLogoutMetatrader}
              colorScheme='brand'
              variant="solid"
              icon={<IoMdLogOut />}
              aria-label='logount'
            />
          </Flex>
        </Flex>
        <Tabs tabs={TABS({ metrics, trades, isLoading: metaApiLoading, goals, goalsLoading, account })} containerProps={{ isLazy: true }} />
      </Flex>
      <CredentialsModal isOpen={showCredentialsModal} onClose={() => showCredentialsModalSet(false)} account={account} />
    </>
  )
}

export default Dashboard