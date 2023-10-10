import { useEffect, useState } from 'react'
import { getImages } from '../services/firebase/storage/images';

type Image = { url: string, name: string }

export const useGetTradeImages = (id: string | null) => {
  const [data, dataSet] = useState<Array<Image> | null>()
  const [isLoading, isLoadingSet] = useState(true)

  useEffect(() => {
    if (!id) return
    isLoadingSet(true)
    const images = getImages(id)
    images.then(result => {
      dataSet(result)
      isLoadingSet(false)
    }).catch((error) => console.error(error))
  }, [id])

  return {
    data,
    isLoading
  };
}