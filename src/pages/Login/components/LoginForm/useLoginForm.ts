import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthFormData } from '../../../../types/forms';
import { firebaseLogin } from '../../../../services/firebase/auth';

export const useLoginForm = () => {

  const [isLoading, isLoadingSet] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    isLoadingSet(true)
    firebaseLogin({ email, password }).then(() => isLoadingSet(false)).catch(error => {
      console.error(error)
      isLoadingSet(false)
    })
  })

  return {
    register,
    errors,
    onSubmit,
    reset,
    isLoading
  }
}