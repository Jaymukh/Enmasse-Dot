import React, { useState } from "react";
import * as d3 from "d3";
import { bubbleData } from '../../utils/constants/Constants';
import Select, { SelectSize } from '../ui/select/Select';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';

interface BubbleNode {
	name: string;
	value: number;
	color?: string;
	// children?: BubbleNode[];
}

const BubbleGraph = () => {
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

	const hierarchy = d3
		.hierarchy<BubbleNode>(bubbleData)
		.sum((d) => d.value)
		.sort((a, b) => (b.value || 0) - (a.value || 0));

	const packGenerator = d3.pack<BubbleNode>().size([500, 300]).padding(15);
	const root = packGenerator(hierarchy);

	return (
		<div className="h-100 me-3">
			<Card size={CardSize.default} variant={CardVariant.bordered} classname='p-3 h-100'>
				<div className='row px-1 pt-2 d-flex justify-content-between'>
					<Heading
						title='Core Solutions by EH'
						type={TypographyType.h4}
						colour={TypographyColor.dark}
						classname='col-4 text-start'
					/>
					<div className='col-2'>
						<Select
							options={options}
							onChange={handleChangeYear}
							value={selectedYear}
							labelKey='value'
							valueKey='value'
							size={SelectSize.small}
						/>
					</div>
				</div>
				<div style={{ width: '30rem', height: '22rem' }}>
					<svg width={550} height={330} style={{ display: "inline-block" }}>
						{/* <svg width='100%' height='100%' style={{ display: "inline-block" }}> */}
						{root
							.descendants()
							.slice(1)
							.map((node) => (
								<circle
									key={node.data.name}
									cx={node.x}
									cy={node.y}
									r={node.r}
									fill={node.data.color}
									fillOpacity={1}
								/>
							))}
						{root
							.descendants()
							.slice(1)
							.map((node) => (
								<text
									key={node.data.name}
									x={node.x}
									y={node.y}
									fontSize={14}
									fontWeight={0.4}
									textAnchor="middle"
									alignmentBaseline="middle"
									fill="#ffffff"
								>
									{/* {`${node.data.value}%`} */}
									{`${node.data.value || 0}%`}
								</text>
							))}
						<g className="legend" transform="translate(90, 310)">
							{bubbleData.children.map((child, index) => (
								<g className="legend-item" transform={`translate(${index * 85}, 0)`}>
									<rect width="15" height="15" fill={child.color} />
									<text x="20" y="10" fontSize={10} alignmentBaseline="middle" dominantBaseline="middle">{child.name}</text>
								</g>
							))}
						</g>
					</svg>
				</div>
			</Card>
		</div>
	)
}

export default BubbleGraph;