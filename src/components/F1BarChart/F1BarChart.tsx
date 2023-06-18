import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface IF1BarChartProps {
  title: string;
  labels: string[];
  dataNumbers: number[];
}

export default function F1BarChart (props: IF1BarChartProps) {
  const {
    title,
    labels,
    dataNumbers,
  } = props;
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Rank (no)"
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Count"
        }
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataNumbers,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div style={{maxHeight: '300px'}}>
      <Bar options={options} data={data} />
    </div>
  );
}
