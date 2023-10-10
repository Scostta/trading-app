import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  firebaseCreateGoal,
  firebaseDeleteGoal,
  firebaseEditGoal,
  goalsCollectionRef
} from '../services/firebase/db/goals';
import { GoalFormData } from '../types/forms';
import { Goal } from '../types/db';
import { onSnapshot, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { posibleGoals } from '../pages/Dashboard/subPages/Goals/config';
import { useAtomValue } from 'jotai';
import { metatraderAccountIdAtom } from '../store/account';

const defaultValues = {
  label: "",
  field: "",
  valuePrefix: "",
  type: "",
  goalValue: null,
  showInOverview: false
}

export const useGetGoals = () => {
  const [data, dataSet] = useState<Array<Goal>>()
  const [isLoading, isLoadingSet] = useState(true)
  const metatraderAccountId = useAtomValue(metatraderAccountIdAtom)

  useEffect(() => {
    isLoadingSet(true)
    const q = query(
      goalsCollectionRef,
      where("accountId", "==", metatraderAccountId)
    )

    const unsub = onSnapshot(q, (querySnapshot) => {
      dataSet(
        querySnapshot.docs.map(docc => ({
          ...docc.data(),
          id: docc.id
        })) as Array<Goal>
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

export const useDeleteGoal = () => {
  const [isLoading, isLoadingSet] = useState<string | null>(null)

  const onDelete = (id: string) => {
    isLoadingSet(id)
    firebaseDeleteGoal(id).finally(() => isLoadingSet(null)).catch((err) => {
      console.error(err)
      isLoadingSet(null)
    })
  }

  return {
    onDelete,
    isLoading
  };
}

export const useGoalForm = (goal?: GoalFormData | null, callback?: () => void) => {

  const [isLoading, isLoadingSet] = useState<boolean>(false)
  const metatraderAccountId = useAtomValue(metatraderAccountIdAtom)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<GoalFormData>({
    defaultValues: defaultValues as GoalFormData,
    values: goal ? (goal as GoalFormData) : (defaultValues as GoalFormData)
  });

  const onSubmit = handleSubmit(({ field, goalValue, showInOverview }) => {
    const goalFound = posibleGoals.find(goal => goal.field === field)
    if (!goalFound || !goalValue || !metatraderAccountId) return
    const newGoal = {
      ...goalFound,
      goalValue: Number(goalValue),
      showInOverview,
      id: goal ? goal.id : uuidv4(),
    } as Goal
    isLoadingSet(true)
    !goal
      ? firebaseCreateGoal({ ...newGoal, accountId: metatraderAccountId }).finally(() => {
        isLoadingSet(false)
        callback?.()
        reset()
      }).catch(err => {
        console.error(err)
        isLoadingSet(false)
      })
      : firebaseEditGoal(newGoal as Goal).finally(() => {
        isLoadingSet(false)
        callback?.()
        reset()
      }).catch(err => {
        console.error(err)
        isLoadingSet(false)
      })
  })

  return {
    register,
    errors,
    onSubmit,
    reset,
    isLoading,
  }
}