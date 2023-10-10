import { Link } from "../../../types/db";
import { db } from "../config";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

const DB_NAME = "links"
export const linksCollectionRef = collection(db, DB_NAME)

export const firebaseGetLinks = async (): Promise<Array<Link> | undefined> => {

  try {
    const data = await getDocs(linksCollectionRef)
    return data.docs.map(docc => ({
      ...docc.data(),
      id: docc.id
    })) as Array<Link>
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const firebaseCreateLink = async (link: Link) => {

  try {
    const linkRef = doc(linksCollectionRef, link.id)
    await setDoc(linkRef, link)
    return link.id
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const firebaseDeleteLink = async (id: string) => {

  try {
    const linkDoc = doc(db, DB_NAME, id)
    await deleteDoc(linkDoc)
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}
