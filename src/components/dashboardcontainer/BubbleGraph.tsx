import React from "react";
import * as d3 from "d3";
import { bubbleData } from '../../utils/constants/Constants';
import SelectYear from "./SelectYear";

const BubbleGraph = () => {
	const hierarchy = d3
		.hierarchy(bubbleData)
		.sum((d) => d.value)
		.sort((a, b) => b.value - a.value);

	const packGenerator = d3.pack().size([500, 300]).padding(15);
	const root = packGenerator(hierarchy);

	return (
		<div className="white-bg py-3 dashboard-col m-4 px-4">			
			<div className='px-4 pt-2 d-flex justify-content-between'>
			<h5 className="mb-0 text-start fs-14">Core Solutions by EH</h5>
                <SelectYear />
            </div>
			<div style={{width:'30rem', height:'50rem' }}>
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
								{`${node.data.value}%`}
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
		</div>
	)
}

export default BubbleGraph;