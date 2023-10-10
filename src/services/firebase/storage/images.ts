import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { storage } from "../config"

export const rootStorageImages = "images"

interface UploadImagesParams {
  files: Array<File>
  tradeId: string
}

export const getImages = async (tradeId: string) => {
  if (!tradeId) return null
  const imageListRef = ref(storage, `${rootStorageImages}/${tradeId}/`)
  try {
    const images = await listAll(imageListRef)
    const promises = images.items.map(item => {
      return getDownloadURL(item).then((url) => ({ url, name: item.name }))
    })
    return Promise.all(promises).then(result => result)
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const uploadImages = async ({ files, tradeId }: UploadImagesParams) => {
  if (!files?.length) return
  try {
    files.forEach(async file => {
      const imageRef = ref(storage, `${rootStorageImages}/${tradeId}/${file.name}`)
      await uploadBytes(imageRef, file)
    })
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const deleteImages = async (paths: Array<string>) => {
  if (!paths.length) return
  try {
    paths.forEach(async path => {
      const imageRef = ref(storage, path)
      await deleteObject(imageRef)
    })
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}
