import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthFormData } from '../../../../types/forms';
import { firebaseRegister } from '../../../../services/firebase/auth';

export const useRegisterForm = () => {

  const [isLoading, isLoadingSet] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    isLoadingSet(true)
    firebaseRegister({ email, password }).then((user) => {
      console.log(user)
    }).catch(error => {
      console.error(error)
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