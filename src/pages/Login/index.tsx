import { Card, CardBody, CardHeader, Heading, Container } from "@chakra-ui/react"
import LoginForm from "./components/LoginForm"
import { cardBg } from "../../utils/css"

const Login = (): JSX.Element => {

  return (
    <Container centerContent height="full" justifyContent="center">
      <Card w="full" bg={cardBg}>
        <CardHeader textAlign="center">
          <Heading>Login</Heading>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </Container>
  )
}

export default Login