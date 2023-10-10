import { Goal } from "../../../types/db";
import { db } from "../config";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const DB_NAME = "goals"
export const goalsCollectionRef = collection(db, DB_NAME)

export const firebaseGetGoals = async (): Promise<Array<Goal> | undefined> => {

  try {
    const data = await getDocs(goalsCollectionRef)
    return data.docs.map(docc => ({
      ...docc.data(),
      id: docc.id
    })) as Array<Goal>
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const firebaseCreateGoal = async (data: Goal) => {

  try {
    const goalRef = doc(goalsCollectionRef, data.id)
    await setDoc(goalRef, data)
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const firebaseDeleteGoal = async (id: Goal["id"]) => {

  try {
    const goalDoc = doc(db, DB_NAME, id)
    await deleteDoc(goalDoc)
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}

export const firebaseEditGoal = async (data: Goal) => {

  const { id, ...rest } = data
  try {
    const goalRef = doc(goalsCollectionRef, id)
    await updateDoc(goalRef, rest)
  } catch (error) {
    console.error(`firebase: ${error}`)
  }
}
