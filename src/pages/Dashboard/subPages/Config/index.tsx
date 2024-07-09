import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react"
import { cardBg } from "../../../../utils/css"

const Config = (): JSX.Element => {

  return (
    <>
      <Card pb={6} bg={cardBg}>
        <CardHeader display="flex" justifyContent="space-between">
          <Text color="lightgray" fontSize="2xl">Configuración</Text>
        </CardHeader>
        <CardBody>
          <div>CONFIG</div>
        </CardBody>
      </Card>
    </>
  )
}

export default Config