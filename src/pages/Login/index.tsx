import { Card, CardBody, CardHeader, Heading, Container } from "@chakra-ui/react"
import LoginForm from "./components/LoginForm"
// import { ROUTES } from "../../routes/constants"
import { cardBg } from "../../utils/css"
// import { signInWithPopup } from "firebase/auth"
// import { auth, googleProvider } from "../../services/firebase/config"
// import { useState } from "react"

const Login = (): JSX.Element => {

    // const [isLoading, isLoadingSet] = useState(false)

    // const handleOnGoogleLogin = () => {
    //     isLoadingSet(true)
    //     signInWithPopup(auth, googleProvider).finally(() => isLoadingSet(false))
    // }

    return (
        <Container centerContent height="full" justifyContent="center">
            <Card w="full" bg={cardBg}>
                <CardHeader textAlign="center">
                    <Heading>Login</Heading>
                </CardHeader>
                <CardBody>
                    <LoginForm />
                </CardBody>
                {/* <CardFooter display="flex" justifyContent="flex-end">
                    <Link href={ROUTES.REGISTER}>Do not have an account?</Link>
                </CardFooter> */}
            </Card>
            {/* <Flex direction="column" gap={2} mt={6}>
                <Text>O haz login con: </Text>
                <IconButton
                    aria-label="google-button"
                    icon={<FaGoogle />}
                    colorScheme="brand"
                    onClick={handleOnGoogleLogin}
                    isLoading={isLoading}
                />
            </Flex> */}
        </Container>
    )
}

export default Login