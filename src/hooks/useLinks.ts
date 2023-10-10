import { useEffect, useState } from 'react'
import { linksCollectionRef } from '../services/firebase/db/links';
import { Link } from '../types/db';
import { onSnapshot, query, where } from 'firebase/firestore';
import { useAtomValue } from 'jotai';
import { metatraderAccountIdAtom } from '../store/account';

export const useGetLinks = () => {
  const [data, dataSet] = useState<Array<Link>>()
  const [isLoading, isLoadingSet] = useState(true)
  const metatraderAccountId = useAtomValue(metatraderAccountIdAtom)

  useEffect(() => {
    isLoadingSet(true)
    const q = query(
      linksCollectionRef,
      where("accountId", "==", metatraderAccountId)
    )

    const unsub = onSnapshot(q, (querySnapshot) => {
      dataSet(
        querySnapshot.docs.map(docc => ({
          ...docc.data(),
          id: docc.id
        })) as Array<Link>
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