import { Card, CardBody, CardHeader, Heading, Link, CardFooter, Container } from "@chakra-ui/react"
import RegisterForm from "./components/RegisterForm"
import { ROUTES } from "../../routes/constants"
import { cardBg } from "../../utils/css"

const Register = (): JSX.Element => {

    return (
        <Container centerContent height="full" justifyContent="center">
            <Card w="full" bg={cardBg}>
                <CardHeader textAlign="center">
                    <Heading>Register</Heading>
                </CardHeader>
                <CardBody>
                    <RegisterForm />
                </CardBody>
                <CardFooter display="flex" justifyContent="flex-end">
                    <Link href={ROUTES.LOGIN}>I already have an account</Link>
                </CardFooter>
            </Card>
        </Container>
    )
}

export default Register