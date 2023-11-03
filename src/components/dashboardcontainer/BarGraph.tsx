import React, { useEffect, useRef, useState } from 'react';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import * as d3 from 'd3';
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
    selected: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ selected }) => {
    const graphData = [
        { year: 'Sub category 1', value: 100 },
        { year: 'Sub category 2', value: 120 },
        { year: 'Sub category 3', value: 140 },
        { year: 'Sub category 4', value: 160 },
        { year: 'Sub category 5', value: 180 },
    ];
    const xKey = 'year';
    const yKey = 'value';

    const xAxisData = graphData.map(data => data[xKey]);
    const yAxisData = graphData.map(data => data[yKey]);

    const data = {
        labels: xAxisData,
        datasets: [
            {
                label: selected,
                data: yAxisData,
                backgroundColor: '#108041',
                borderColor: '#108041',
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
            {/* <h6 className='text-start fs-14 mb-3 mt-2 px-1'>{selected}</h6> */}
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarGraph;