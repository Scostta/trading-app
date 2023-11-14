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
import { deleteImages, rootStorageImages, uploadImages } from '../services/firebase/storage/images';
import { TradeMetatrader } from '../types/metaStats';
import { firebaseCreateLink, firebaseDeleteLink } from '../services/firebase/db/links';
import { v4 as uuidv4 } from 'uuid';
import { useAtomValue } from 'jotai';
import { metatraderAccountIdAtom } from '../store/account';
import { removeDuplicates } from '../utils/array';

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
  tradingviewEntry: null,
  tradingviewScan: null,
  isBe: false,
  comment: ""
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

  const onDelete = (id: string, linkId: string, imagesPaths?: Array<string>) => {
    isLoadingSet(id)
    firebaseDeleteTrade(id)
      .then(() => firebaseDeleteLink(linkId))
      .then(() => deleteImages(imagesPaths ?? []))
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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TradeFormData>({
    defaultValues: defaultValues,
    values: trade ? trade : defaultValues
  });

  const onSubmit = handleSubmit(({ tradingviewEntry, tradingviewScan, ...data }) => {

    if (!metatraderAccountId) return

    const tradingviewEntryImage = tradingviewEntry?.[0]
    const tradingviewScanImage = tradingviewScan?.[0]
    const images = [] as Array<File>
    if (tradingviewScanImage) { images.push(new File([tradingviewScanImage], `tradingViewScan.${tradingviewScanImage.type.replace(/(.*)\//g, '')}`)) }
    if (tradingviewEntryImage) { images.push(new File([tradingviewEntryImage], `tradingViewEntry.${tradingviewEntryImage.type.replace(/(.*)\//g, '')}`)) }

    const { _id, isBE, success, openTime, type, imagesPaths } = (data as TradeFormData & TradeMetatrader)
    const newTrade = {
      ...data,
      id: _id,
      result: isBE ? "be" : success,
      date: openTime,
      orderType: type === "DEAL_TYPE_BUY" ? "buy" : "sell",
      imagesPaths: removeDuplicates([...images.map((img) => `${rootStorageImages}/${_id}/${img.name}`), ...(imagesPaths ?? [])])
    } as Trade
    isLoadingSet(true)

    if (!isEdit) {
      firebaseCreateLink({ id: uuidv4(), tradeId: _id, accountId: metatraderAccountId })
        .then(linkId => firebaseCreateTrade({ ...newTrade, linkId, accountId: metatraderAccountId })).catch((error) => console.error(error))
        .then(() => uploadImages({ files: images, tradeId: newTrade.id })).catch((error) => console.error(error))
        .finally(() => {
          isLoadingSet(false)
          callback?.()
          reset()
        })
    } else {
      firebaseEditTrade(newTrade as Trade)
        .then(() => uploadImages({ files: images, tradeId: newTrade.id })).catch((error) => console.error(error))
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