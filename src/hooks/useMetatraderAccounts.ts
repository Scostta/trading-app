import { useEffect, useState } from 'react'
import { connectMetatraderAccount, getMetatraderAccounts } from '../services/metatrader/account'
import { MetatraderAccount } from 'metaapi.cloud-sdk'

export const useGetMetatraderAccounts = () => {
  const [accounts, accountsSet] = useState<Array<MetatraderAccount> | undefined>(undefined)
  const [isLoading, isLoadingSet] = useState(true)

  useEffect(() => {
    getMetatraderAccounts().then((results) => {
      accountsSet(results)
      isLoadingSet(false)
    }).finally(() => {
      isLoadingSet(false)
    })
  }, [accountsSet])

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