import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { OddsAnalysis } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AverageOddsChartProps {
  data: OddsAnalysis[];
}

const AverageOddsChart: React.FC<AverageOddsChartProps> = ({ data }) => {
  const labels = data.map(item => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Avg Home Odds',
        data: data.map(item => item.averageHomeOdds),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Avg Draw Odds',
        data: data.map(item => item.averageDrawOdds),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Avg Away Odds',
        data: data.map(item => item.averageAwayOdds),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Average Odds Trends',
      },
    },
    scales: {
      y: {
        min: 1,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AverageOddsChart;