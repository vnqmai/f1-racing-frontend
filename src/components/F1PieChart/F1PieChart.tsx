import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IF1PieChartProps {
  labels: string[];
  dataNumbers: number[];
}

export default function F1PieChart (props: IF1PieChartProps) {
  const {
    labels,
    dataNumbers,
  } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: dataNumbers,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div style={{maxHeight: '200px'}}>
      <Pie
        data={data}
      />
    </div>
  );
}
