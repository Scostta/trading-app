import { useEffect, useState } from 'react'
import { MetricsMetatrader, TradesMetatrader } from "../../../types/metaStats";
import { getMetrics, getAccountTrades } from '../../../services/metatrader/metastats';

const defaultMetaApi = {
  metrics: undefined,
  trades: undefined
}

export const useGetAllMetaApi = (accountId: string | undefined, shouldFetch: boolean) => {
  const [all, allSet] = useState<{ metrics?: MetricsMetatrader | undefined, trades?: TradesMetatrader | undefined }>(defaultMetaApi)
  const [isLoading, isLoadingSet] = useState(true)

  useEffect(() => {
    if (!accountId || !shouldFetch) return
    isLoadingSet(true)
    getMetrics(accountId).then((results) => {
      allSet({ metrics: results })
    }).finally(() => {
      getAccountTrades(accountId).then(results => {
        allSet((prev) => ({
          ...prev, trades: results?.filter(r => r.type != "DEAL_TYPE_BALANCE").map(r => {
            return ({
              ...r,
              closeTime: r.closeTime?.replace(/\.\d+/, ""),
              openTime: r.openTime?.replace(/\.\d+/, ""),
            })
          })
        }))
      }).finally(() => {
        isLoadingSet(false)
      })
    })
  }, [accountId, shouldFetch])

  return {
    all,
    isLoading
  };
}

export const useGetMetaStats = (accountId: string | undefined, shouldFetch: boolean) => {
  const [metrics, metricsSet] = useState<MetricsMetatrader | undefined>(undefined)
  const [isLoading, isLoadingSet] = useState(true)

  useEffect(() => {
    if (!accountId || !shouldFetch) return
    isLoadingSet(true)
    getMetrics(accountId).then((results) => {
      metricsSet(results)
    }).finally(() => {
      isLoadingSet(false)
    })
  }, [accountId, shouldFetch])

  return {
    metrics,
    isLoading
  };
}

export const useGetAccountTrades = (accountId: string | undefined, shouldFetch: boolean) => {
  const [accountTrades, accountTradesSet] = useState<TradesMetatrader | undefined>(undefined)
  const [isLoading, isLoadingSet] = useState(true)

  useEffect(() => {
    if (!accountId || !shouldFetch) return
    isLoadingSet(true)
    getAccountTrades(accountId).then((results) => {
      accountTradesSet(results?.filter(r => r.type != "DEAL_TYPE_BALANCE").map(r => {
        return ({
          ...r,
          closeTime: r.closeTime?.replace(/\.\d+/, ""),
          openTime: r.openTime?.replace(/\.\d+/, ""),
        })
      }))
    }).finally(() => {
      isLoadingSet(false)
    })
  }, [accountId, shouldFetch])

  return {
    accountTrades,
    isLoading
  };
}