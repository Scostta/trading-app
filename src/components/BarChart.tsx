import { Card, CardBody, CardHeader, CardProps, Text } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { cardBg } from '../utils/css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DEFAULT_OPTIONS = {
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white"
      }
    },
  },
  scales: {
    y: {
      ticks: {
        color: "grey"
      },
      grid: {
        color: "rgba(128, 128, 128, 0.2)"
      }
    },
    x: {
      ticks: {
        color: "grey"
      },
      grid: {
        color: "transparent"
      }
    }
  }
} as ChartOptions<"bar">;

interface BarChartProps {
  containerProps?: CardProps
  data: ChartData<"bar">
  options?: ChartOptions<"bar">
  title?: string
  withoutCard?: boolean
  isStacked?: boolean
  maintainAspectRatio?: boolean
  hasLegend?: boolean
}

export const BarChart = ({ data, containerProps, options, title, withoutCard, isStacked, maintainAspectRatio = true, hasLegend = true }: BarChartProps): JSX.Element => {

  const defaultOptions = {
    ...DEFAULT_OPTIONS,
    plugins: {
      ...DEFAULT_OPTIONS.plugins,
      legend: hasLegend ? DEFAULT_OPTIONS.plugins?.legend : null
    },
    maintainAspectRatio,
    scales: {
      ...DEFAULT_OPTIONS.scales,
      y: {
        ...DEFAULT_OPTIONS.scales?.y,
        stacked: isStacked
      },
      x: {
        ...DEFAULT_OPTIONS.scales?.x,
        stacked: isStacked
      }
    }
  } as ChartOptions<"bar">

  if (withoutCard) return <Bar options={options ?? defaultOptions} data={data} />
  return (
    <Card {...containerProps} bg={cardBg}>
      {title && <CardHeader>
        <Text color="lightgray" fontSize="2xl">{title}</Text>
      </CardHeader>}
      <CardBody>
        <Bar options={options ?? defaultOptions} data={data} />
      </CardBody>
    </Card>
  )
}
