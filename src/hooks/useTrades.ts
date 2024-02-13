import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  firebaseCreateTrade,
  firebaseDeleteTrade,
  firebaseEditTrade,
  firebaseGetTrade,
  tradesCollectionRef
} from '../services/firebase/db/trades';
import { TradeFormData } from '../types/forms';
import { Trade } from '../types/db';
import { onSnapshot, query, where } from 'firebase/firestore';
import { TradeMetatrader } from '../types/metaStats';
import { firebaseCreateLink, firebaseDeleteLink } from '../services/firebase/db/links';
import { v4 as uuidv4 } from 'uuid';
import { useAtomValue } from 'jotai';
import { metatraderAccountIdAtom } from '../store/account';

const defaultValues = {
  date: new Date().toLocaleString("es", { year: "numeric", month: "2-digit", day: "2-digit" }).split('/').reverse().join('-'),
  orderType: "",
  executionType: "",
  killzoneTime: "",
  pipsSl: "",
  result: "",
  sesion: "",
  strategy: "",
  trend: "",
  scanTimeframe: "",
  entryType: "",
  entryTimeframe: "",
  isBe: false,
  comment: "",
  images: []
}

export const useGetTrades = () => {
  const [data, dataSet] = useState<Array<Trade>>()
  const [isLoading, isLoadingSet] = useState(true)
  const metatraderAccountId = useAtomValue(metatraderAccountIdAtom)

  useEffect(() => {
    isLoadingSet(true)
    const q = query(
      tradesCollectionRef,
      where("accountId", "==", metatraderAccountId)
    )

    const unsub = onSnapshot(q, (querySnapshot) => {
      dataSet(
        querySnapshot.docs.map(docc => ({
          ...docc.data(),
          id: docc.id
        })) as Array<Trade>
      )
      isLoadingSet(false)
    })
    return () => {
      unsub()
    }
  }, [metatraderAccountId])

  return {
    data,
    isLoading
  };
}

export const useDeleteTrade = () => {
  const [isLoading, isLoadingSet] = useState<string | null>(null)

  const onDelete = (id: string, linkId: string) => {
    isLoadingSet(id)
    firebaseDeleteTrade(id)
      .then(() => firebaseDeleteLink(linkId))
      .finally(() => isLoadingSet(null)).catch((err) => {
        console.error(err)
        isLoadingSet(null)
      })
  }

  return {
    onDelete,
    isLoading
  };
}

export const useTradeForm = (trade?: TradeFormData | null, callback?: () => void, isEdit?: boolean) => {

  const [isLoading, isLoadingSet] = useState<boolean>(false)
  const metatraderAccountId = useAtomValue(metatraderAccountIdAtom)

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TradeFormData>({
    defaultValues: defaultValues,
    values: trade ? trade : defaultValues
  });

  const onSubmit = handleSubmit((data) => {

    if (!metatraderAccountId) return

    const { _id, isBE, success, openTime, type } = (data as TradeFormData & TradeMetatrader)
    const newTrade = {
      ...data,
      id: _id,
      result: isBE ? "be" : success,
      date: openTime,
      orderType: type === "DEAL_TYPE_BUY" ? "buy" : "sell",
    } as Trade
    isLoadingSet(true)

    if (!isEdit) {
      firebaseCreateLink({ id: uuidv4(), tradeId: _id, accountId: metatraderAccountId })
        .then(linkId => firebaseCreateTrade({ ...newTrade, linkId, accountId: metatraderAccountId })).catch((error) => console.error(error))
        .finally(() => {
          isLoadingSet(false)
          callback?.()
          reset()
        })
    } else {
      firebaseEditTrade(newTrade as Trade)
        .finally(() => {
          isLoadingSet(false)
          callback?.()
          reset()
        }).catch(err => {
          console.error(err)
          isLoadingSet(false)
        })
    }
  })

  return {
    register,
    errors,
    onSubmit,
    reset,
    isLoading,
    watch,
    setValue
  }
}

export const useGetTrade = (tradeId: string | undefined) => {
  const [data, dataSet] = useState<TradeFormData & TradeMetatrader | undefined>()
  const [isLoading, isLoadingSet] = useState(true)

  useEffect(() => {
    if (!tradeId) return
    isLoadingSet(true)
    firebaseGetTrade(tradeId)
      .then(result => {
        dataSet(result as TradeFormData & TradeMetatrader)
        isLoadingSet(false)
      }).catch((error) => console.error(error))
  }, [tradeId])

  return {
    data,
    isLoading
  };
}