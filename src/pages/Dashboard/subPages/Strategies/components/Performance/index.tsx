import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { cardBg } from '../../../../../../utils/css';

interface PerformanceProps {
  performance: "best" | "worst"
  title: string
}

export const Performance = ({ performance, title }: PerformanceProps): JSX.Element => {

  return (<Card bg={cardBg} w="full">
    <CardHeader>
      <Text color="lightgray" fontSize="2xl">{title}</Text>
    </CardHeader>
    <CardBody>
      {performance}
    </CardBody>
  </Card>)
}
