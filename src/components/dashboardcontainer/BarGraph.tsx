// External libraries
import React from 'react';

// CSS
import '../../styles/main.css';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CoreSolutionByEH } from '../../states';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarGraphProps {
    selected: any;
}

const BarGraph: React.FC<BarGraphProps> = ({ selected }) => {
    const xAxisData = selected?.subcategory?.map((data: any) => data['name']);
    const yAxisData = selected?.subcategory?.map((data: any) => data['value']);

    const data = {
        labels: xAxisData,
        datasets: [
            {
                label: selected?.coreSolution,
                data: yAxisData,
                backgroundColor: '#108041',
                borderColor: '#108041',
                borderWidth: 0,
                borderRadius: 5,
                barPercentage: 0.6, //previously it was 0.6
            },
        ],
    };

    const options = {
        indexAxis: 'y' as 'y',
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    maxWidth: 50,
                    font: {
                        size: 12,
                    },
                }
            },
            y: {
                display: true,
                grid: {
                    display: false,
                },

                // ticks: {
                //     callback: (value: any) => `${value}`,
                //   }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className='h-100'>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarGraph;