import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useRegisterForm } from "./useRegisterForm"

const RegisterForm = (): JSX.Element => {

    const { register, onSubmit, isLoading } = useRegisterForm()

    return <form onSubmit={onSubmit}>
        <FormControl py={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email")} required />
        </FormControl>
        <FormControl py={4}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" {...register("password")} required />
        </FormControl>
        <Flex justifyContent="center" mt={6}>
            <Button isLoading={isLoading} type="submit" colorScheme="brand">Register</Button>
        </Flex>
    </form>
}

export default RegisterForm