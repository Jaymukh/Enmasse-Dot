import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: [2021, 2022, 2023],
    datasets: [
        {
            label: 'Sales Data',
            data: [100, 120, 300],
            borderColor: '#367A2B', // Line color
            backgroundColor: '#ffffff', // Area under the line color
            pointRadius: 0, // Radius of data points
            pointBackgroundColor: '#ffffff', // Data point color
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'EH POPULATION (Million)', // Set the Y axis header text
                color: 'black',       // Set the color to black
            },
        },
        x: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'YEAR', // Set the Y axis header text
                color: 'black',       // Set the color to black                
            },
        },
    },
    plugins: {
        tooltip: {
            mode: 'index',
            intersect: false,
            yAlign: 'bottom',
            titleColor: '#696B71', // Set the title (header) color
            bodyColor: '#696B71', // Set the body (content) color
            backgroundColor: '#ffffff', // Set the background color
            borderColor: '#CBCBCB',
            borderWidth: 1,
            bodyFontSize: 14,  // Increase body font size
            caretPadding: 10,  // Add padding around the caret
            caretSize: 10,     // Increase caret size
            cornerRadius: 6,   // Adjust corner radius
            xPadding: 12,      // Increase padding on the x-axis
            yPadding: 12,
            callbacks: {
                label: function (context) {
                    const yLabel = context.parsed.y !== null ? context.parsed.y : '';
                    return yLabel;
                },
                labelColor: function (context) {
                    return {
                        borderColor: 'transparent', // Hide the legend color border
                        backgroundColor: 'transparent' // Hide the legend color background
                    };
                }
            },
        },
        legend: {
            display: false, // Hide the legend
        },
        hover: {
            mode: 'index',
            intersect: false
        },
    },
    elements: {
        point: {
            radius: 0,
            hoverRadius: 5, // Increase radius on hover
        },
    },
};

const LineGraph = () => {
    return (
        <div className='white-bg py-3 dashboard-col px-4 h-100'>
            <h6 className='text-start fs-14 mb-3'>EH Population Growth</h6>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineGraph;