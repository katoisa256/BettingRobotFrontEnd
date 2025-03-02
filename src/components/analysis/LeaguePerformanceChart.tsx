import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { LeaguePerformance } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LeaguePerformanceChartProps {
  data: LeaguePerformance[];
}

const LeaguePerformanceChart: React.FC<LeaguePerformanceChartProps> = ({ data }) => {
  const labels = data.map(item => item.league);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Home Win Rate',
        data: data.map(item => item.homeWinRate * 100),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
      {
        label: 'Draw Rate',
        data: data.map(item => item.drawRate * 100),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Away Win Rate',
        data: data.map(item => item.awayWinRate * 100),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
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
        text: 'League Performance Comparison (%)',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LeaguePerformanceChart;