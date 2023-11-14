import { Trade } from "../../../types/db";
import { db } from "../config";
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const DB_NAME = "trades"
export const tradesCollectionRef = collection(db, DB_NAME)

export const firebaseGetTrades = async (): Promise<Array<Trade> | undefined> => {

    try {
        const data = await getDocs(tradesCollectionRef)
        return data.docs.map(docc => ({
            ...docc.data(),
            id: docc.id
        })) as Array<Trade>
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}

export const firebaseCreateTrade = async (data: Trade) => {

    try {
        const tradeRef = doc(tradesCollectionRef, data.id)
        await setDoc(tradeRef, { ...data, createdAt: serverTimestamp() })
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}

export const firebaseDeleteTrade = async (id: Trade["id"]) => {

    try {
        const tradeDoc = doc(db, DB_NAME, id)
        await deleteDoc(tradeDoc)
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}

export const firebaseEditTrade = async (data: Trade) => {

    const { id, ...rest } = data

    try {
        const tradeRef = doc(tradesCollectionRef, id)
        await updateDoc(tradeRef, rest)
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}


export const firebaseGetTrade = async (id: string) => {
    try {
        const tradeRef = doc(tradesCollectionRef, id)
        const data = await getDoc(tradeRef)
        return data.data()
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}