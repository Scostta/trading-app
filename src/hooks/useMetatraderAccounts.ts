import { useEffect, useState } from 'react'
import { connectMetatraderAccount, getMetatraderAccounts } from '../services/metatrader/account'
import { MetatraderAccount } from 'metaapi.cloud-sdk'
import { useToast } from '@chakra-ui/react'

export const useGetMetatraderAccounts = () => {
  const [accounts, accountsSet] = useState<Array<MetatraderAccount> | undefined>(undefined)
  const [isLoading, isLoadingSet] = useState(true)
  const toast = useToast()

  useEffect(() => {
    getMetatraderAccounts().then((results) => {
      accountsSet(results)
      isLoadingSet(false)
    }).finally(() => {
      isLoadingSet(false)
    }).catch(error =>
      console.log(error.message)
    )
  }, [accountsSet, toast])

  return {
    accounts,
    isLoading
  };
}

export const useConnectMetatraderAccount = (accountId?: string | null) => {
  const [isLoading, isLoadingSet] = useState(true)
  const [account, accountSet] = useState<MetatraderAccount | undefined>(undefined)

  useEffect(() => {
    if (!accountId) return
    connectMetatraderAccount(accountId).then((res) => {
      accountSet(res)
      isLoadingSet(false)
    })
  }, [accountId])

  return { isLoading, account }
}