import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, CardProps, Text } from '@chakra-ui/react';
import { cardBg } from '../utils/css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DEFAULT_OPTIONS = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    r: {
      grid: {
        color: "grey"
      },
      ticks: {
        color: "white",
        backdropColor: "transparent"
      },
      pointLabels: {
        color: "white"
      }
    }
  }
} as ChartOptions<"radar">;

interface RadarChartProps {
  containerProps?: CardProps
  data: ChartData<"radar">
  options?: ChartOptions<"radar">
  title?: string
  withoutCard?: boolean
}

export const RadarChart = ({ data, containerProps, options = DEFAULT_OPTIONS, title, withoutCard }: RadarChartProps): JSX.Element => {

  if (withoutCard) return <Radar options={options} data={data} />
  return (
    <Card {...containerProps} bg={cardBg}>
      {title && <CardHeader>
        <Text color="lightgray" fontSize="2xl">{title}</Text>
      </CardHeader>}
      <CardBody>
        <Radar options={options} data={data} />
      </CardBody>
    </Card>
  )
}
