import React, { useRef, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Title, Tooltip, Label, ReferenceLine } from 'recharts';
import SelectYear from './SelectYear';

const CustomizedDot = ({ cx, cy, payload }) => {
    return (
        <g>
            {/* <circle cx={cx} cy={cy} r={6} fill="blue" /> */}
            <text x={cx} y={cy - 10} textAnchor="middle" fill="black" fontSize={12} fontWeight={500}>
                {payload.label}
            </text>
        </g>
    );
};

const ArrowMarker = () => (
    <marker
        id="arrow"
        markerWidth="40"
        markerHeight="40"
        refX="25"
        refY="20"
        orient="auto"
        markerUnits="strokeWidth"
    >
        <path d="M0,0 L40,20 L0,40" fill="none" stroke="gray" />
    </marker>
);

const ReverseArrowMarker = () => (
    <marker
        id="reverse-arrow"
        markerWidth="40"
        markerHeight="40"
        refX="0"
        refY="20"
        orient="auto"
        markerUnits="strokeWidth"
    >
        <path d="M40,0 L0,20 L40,40" fill="none" stroke="gray" />
    </marker>
)

const DashboardContainer = () => {

    const data = [
        { x: 70, y: -90, label: "Kerala" },
        { x: 56, y: 36, label: "Arunachal Pradesh" },
        { x: -55, y: 25, label: "Andra Pradesh" },
        { x: -25, y: 65, label: "Gujarat" }
    ]

    return (
        <div className='white-bg py-3 dashboard-col'>
            <div className='px-4 pt-2 d-flex justify-content-between'>
                <h6 className='text-start fs-14' >EH Income and Expense</h6>
                <SelectYear />
            </div>

            <ScatterChart width={750} height={375} margin={{ top: 60, right: 20, bottom: 20, left: 20 }}>
                <defs>
                    <ArrowMarker />
                </defs>
                <defs>
                    <ReverseArrowMarker />
                </defs>
                <XAxis type="number" dataKey="x" name="x" strokeWidth='0.35' strokeOpacity='0.5' >
                    <Label value="EXPENSE" position="bottom" offset={0} fontWeight={500} fill='000000' fontSize={13} />
                </XAxis>
                <YAxis type="number" dataKey="y" name="y" strokeWidth='0.35' strokeOpacity='0.5' >
                    <Label angle={-90} value="INCOME" position="left" offset={0} fontWeight={500} fill='000000' fontSize={13} />
                </YAxis>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill="rgba(75, 192, 192, 0.6)" shape={<CustomizedDot />} />
                <ReferenceLine x={0} stroke="gray" strokeWidth='0.35' strokeOpacity='0.5' markerStart="url(#reverse-arrow)" markerEnd="url(#arrow)" />
                <ReferenceLine y={0} stroke="gray" strokeWidth='0.35' strokeOpacity='0.5' markerStart="url(#reverse-arrow)" markerEnd="url(#arrow)" />
                <text x={90} y={60} textAnchor="start" fill="#000000" fontSize={10}>
                    Low Income & High Expense
                </text>
                <text x={725} y={60} textAnchor="end" fill="#000000" fontSize={10}>
                    High Income & Expense
                </text>
                <text x={90} y={315} textAnchor="start" fill="#000000" fontSize={10}>
                    Low Income & Expense
                </text>
                <text x={725} y={315} textAnchor="end" fill="#000000" fontSize={10}>
                    High Income & Low Expense
                </text>
            </ScatterChart>
        </div>
    )
}

export default DashboardContainer;