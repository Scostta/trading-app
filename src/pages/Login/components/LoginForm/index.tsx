import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useLoginForm } from "./useLoginForm"

const LoginForm = (): JSX.Element => {

    const { register, onSubmit, isLoading } = useLoginForm()

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
            <Button isLoading={isLoading} type="submit" colorScheme="brand">Log in</Button>
        </Flex>
    </form>
}

export default LoginForm