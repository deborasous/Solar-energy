import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';

interface ChartProps {
  data: {
    labels: string[]; 
    datasets: {
      data: number[]; 
      borderColor: string; 
      fill: boolean; 
    }[];
  };
}

export const LineChart = ({ data }: ChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        onClick: () => {},
        align: 'start' as 'start',
      },
      title: {
        display: true,
        text: 'Total de energia gerada por mês',
        font: {
          size: 30,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        position: 'right' as 'right',
      },
    },
  };

  return (
    <div id="lineChart" className="w-full">
      <Line
        style={{ width: '100%', height: 'auto', margin: 'auto' }}
        data={data}
        options={options}
      />
    </div>
  );
};
