/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Label, ReferenceLine } from 'recharts';
import Select, { SelectSize } from '../ui/select/Select';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { cifState } from '../../states';
import { useRecoilValue } from 'recoil';
import NoVisualData from './NoVisualData';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';

const CustomizedDot = ({ cx, cy, payload }: { cx: number, cy: number, payload: any }) => {
    return (
        <g>
            <text x={cx} y={cy - 10} textAnchor="middle" fill="black" fontSize={12} fontWeight={500}>
                {payload?.geoValue}
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

const ScatterGraph = ({ geoName }: { geoName: string }) => {
    const { inOutFlowData } = useRecoilValue(cifState);
    const [center, setCenter] = useState<{ x: number | null, y: number | null }>({ x: 0, y: 0 });

    const options: any[] = [];
    const currentYear = new Date().getFullYear();

    for (let year = currentYear - 10; year <= currentYear; year++) {
        options.push({ key: year, value: year.toString() });
    }

    const [selectedYear, setSelctedYear] = useState(currentYear);

    const handleChangeYear = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSelctedYear(value);
    }

    const calculateMedian = (keyName: 'outflow' | 'inflow') => {
        const filteredData = inOutFlowData.filter(item => item[keyName] !== null);
        if (filteredData.length === 0) {
            return 0;
        }
        const sortedData = filteredData.sort((a: any, b: any) => a[keyName] - b[keyName]);
        const middle = Math.floor(sortedData.length / 2);

        if (sortedData.length % 2 === 0) {
            return (filteredData![middle - 1]![keyName]! + filteredData![middle]![keyName]!) / 2;
        } else {
            return sortedData[middle][keyName];
        }
    }

    useEffect(() => {
        if (inOutFlowData && inOutFlowData.length > 0) {
            const x = calculateMedian('outflow');
            const y = calculateMedian('inflow');
            setCenter({ x: x, y: y })
        }
    }, [inOutFlowData])

    return (
        <div className={`h-100 ${geoName === 'district' ? 'mb-5 pb-5' : ''}`}>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='p-3 h-100'>
                <div className='row px-2 pt-2 d-flex justify-content-between'>
                    <div className='m-0 p-0 d-flex col-4 align-items-center'>
                        <Heading
                            title='EH Income and Expense'
                            type={TypographyType.h5}
                            colour={TypographyColor.dark}
                            classname='text-start px-1'
                        />
                        <AiOutlineInfoCircle fontSize={15} color='#606060' />
                    </div>
                    <div className='col-1'>
                        <Select
                            options={options}
                            onChange={handleChangeYear}
                            value={selectedYear}
                            labelKey='value'
                            valueKey='value'
                            size={SelectSize.small}
                            disabled={inOutFlowData?.length > 0 ? false : true}
                        />
                    </div>
                </div>

                {inOutFlowData?.length > 0
                    ? <ScatterChart width={1275} height={429} margin={{ top: 60, right: 20, bottom: 20, left: 20 }} className='px-1'>
                        <defs>
                            <ArrowMarker />
                        </defs>
                        <defs>
                            <ReverseArrowMarker />
                        </defs>
                        <XAxis type="number" dataKey="outflow" name="x" strokeWidth='0.35' strokeOpacity='0.5' fontSize={10} >
                            <Label value="OUTFLOW: Spend" position="bottom" offset={0} fontWeight={500} fill='000000' fontSize={10} />
                        </XAxis>
                        <YAxis type="number" dataKey="inflow" name="y" strokeWidth='0.35' strokeOpacity='0.5' className='mb-3' fontSize={10} >
                            <Label angle={270} value="INFLOW: Income + Borrowing" position={{ x: 5, y: 80 }} offset={30} fontWeight={500} fill='000000' fontSize={10} />
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={inOutFlowData} fill="rgba(75, 192, 192, 0.6)" shape={<CustomizedDot cx={0} cy={0} payload={undefined} />} />

                        <ReferenceLine x={center.x ? center.x : 0} stroke="gray" strokeWidth='0.35' strokeOpacity='0.5' markerStart="url(#reverse-arrow)" markerEnd="url(#arrow)" />
                        <ReferenceLine y={center.y ? center.y : 0} stroke="gray" strokeWidth='0.35' strokeOpacity='0.5' markerStart="url(#reverse-arrow)" markerEnd="url(#arrow)" />
                        <text x={90} y={55} textAnchor="start" fill="#000000" fontSize={10}>
                            Low Inflow & High Outflow
                        </text>
                        <text x={1250} y={55} textAnchor="end" fill="#000000" fontSize={10}>
                            High Inflow & Outflow
                        </text>
                        <text x={90} y={375} textAnchor="start" fill="#000000" fontSize={10}>
                            Low Inflow & Outflow
                        </text>
                        <text x={1250} y={375} textAnchor="end" fill="#000000" fontSize={10}>
                            High Inflow & Low Outflow
                        </text>
                    </ScatterChart>
                    : <NoVisualData displayImage={true} />}
            </Card>
        </div>
    )
}

export default ScatterGraph;