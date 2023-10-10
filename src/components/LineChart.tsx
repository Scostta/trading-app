import { Card, CardBody, CardHeader, CardProps, Text } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { cardBg } from '../utils/css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DEFAULT_OPTIONS = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "white"
      }
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",
      }
    },
    x: {
      ticks: {
        color: "white",
      }
    }
  }
} as ChartOptions<"line">;

interface LineChartProps {
  containerProps?: CardProps
  data: ChartData<"line">
  options?: ChartOptions<"line">
  title?: string
  withoutCard?: boolean
}

export const LineChart = ({ data, containerProps, options = DEFAULT_OPTIONS, title, withoutCard }: LineChartProps): JSX.Element => {

  if (withoutCard) return <Line options={options} data={data} />
  return (
    <Card {...containerProps} bg={cardBg}>
      {title && <CardHeader>
        <Text color="lightgray" fontSize="2xl">{title}</Text>
      </CardHeader>}
      <CardBody>
        <Line options={options} data={data} />
      </CardBody>
    </Card>
  )
}
