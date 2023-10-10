import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { AuthFormData } from '../../types/forms'
import { auth } from './config'

export const firebaseRegister = async (credentials: AuthFormData) => {
    const { email, password } = credentials
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}

export const firebaseLogin = async (credentials: AuthFormData) => {
    const { email, password } = credentials
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user)
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}

export const firebaseSignOut = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(`firebase: ${error}`)
    }
}