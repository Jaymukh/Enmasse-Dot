// External libraries
import React from 'react';
import { Bar } from 'react-chartjs-2';
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
import { colorDescription } from '../../utils/constants/Constants';

// CSS
import '../../styles/main.css';


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
                backgroundColor: colorDescription[selected?.type],
                borderColor: colorDescription[selected?.type],
                borderWidth: 0,
                borderRadius: 5,
                barPercentage: 0.6,
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
            tooltip: {
                callbacks: {
                    title: (context: any) => {
                        return `${context[0].dataset.label}`;
                    },
                    label: (context: any) => {
                        const index = context.dataIndex;
                        const description =  selected?.subcategory?.[index].description;
                        return `${description}`;
                    },
                },
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