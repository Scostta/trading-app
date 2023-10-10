import { Card, CardBody, CardHeader, CardProps, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { cardBg } from '../utils/css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_OPTIONS = {
  plugins: {
    legend: {
      labels: {
        color: "white"
      }
    }
  }
} as ChartOptions<"doughnut">;

interface DoughnutChartProps {
  containerProps?: CardProps
  data: ChartData<"doughnut">
  options?: ChartOptions<"doughnut">
  title?: string
  withoutCard?: boolean
}

export const DoughnutChart = ({ containerProps, data, options = DEFAULT_OPTIONS, title, withoutCard }: DoughnutChartProps): JSX.Element => {

  if (withoutCard) return <Doughnut data={data} options={options} />
  return (<Card {...containerProps} bg={cardBg}>
    {title && <CardHeader>
      <Text color="lightgray" fontSize="2xl">{title}</Text>
    </CardHeader>}
    <CardBody>
      <Doughnut data={data} options={{ ...DEFAULT_OPTIONS, ...options }} />
    </CardBody>
  </Card>)
}
