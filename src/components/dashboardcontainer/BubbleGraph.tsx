import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { BubbleNode, bubbleData, colorDescription } from '../../utils/constants/Constants';
import Select, { SelectSize } from '../ui/select/Select';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { useRecoilValue } from 'recoil';
import { cifState } from '../../states';
import '../../styles/main.css'

const BubbleGraph = () => {
	const [data, setData] = useState<BubbleNode>();
	const [root, setRoot] = useState<d3.HierarchyCircularNode<BubbleNode>>();
	const { coreSolutionsData } = useRecoilValue(cifState);
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

	useEffect(() => {
		if (coreSolutionsData?.coreSolutionsByEH.length > 0) {
			const coreSolutionsByEH = [...coreSolutionsData?.coreSolutionsByEH];
			const coreSolutions = coreSolutionsByEH.filter((item: any) => {
				return item.coreSolution !== "Core Sum";
			});

			const modifiedCoreSolutions = coreSolutions.map(child => {
				const foundItem = colorDescription.find(item => item.coreSolution === child.coreSolution);
				if (foundItem) {
					return {
						...child,
						color: foundItem.color,
					};
				} else {
					return child;
				}
			});;

			const modifiedParentNode = { children: modifiedCoreSolutions };
			setData(modifiedParentNode);
			const hierarchy = d3
				.hierarchy<BubbleNode>(modifiedParentNode)
				.sum((d) => {
					if (d.pointsOfInterest) {
						return d.pointsOfInterest;
					}
					return 0;
				})
				.sort((a, b) => (b.value || 0) - (a.value || 0));

			const packGenerator = d3.pack<BubbleNode>().size([500, 300]).padding(15);
			const root = packGenerator(hierarchy);
			setRoot(root);
		}

	}, [coreSolutionsData]);



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
					<svg width={500} height={320} style={{ display: "inline-block" }}>
						{root && root
							.descendants()
							.slice(1)
							.map((node) => (
								<circle
									key={node.data.coreSolution}
									cx={node.x}
									cy={node.y}
									r={node.r}
									fill={node.data.color}
									fillOpacity={1}
								/>
							))}
						{root && root
							.descendants()
							.slice(1)
							.map((node) => (
								<text
									key={node.data.coreSolution}
									x={node.x}
									y={node.y}
									fontSize={14}
									fontWeight={0.4}
									textAnchor="middle"
									alignmentBaseline="middle"
									fill="#ffffff"
								>
									{`${node.data.percentageContribution || 0}%`}
								</text>
							))}
					</svg>
					<div className='d-flex w-100 justify-content-center align-items-center'>
						{data?.children?.map((child, index) => (
							<div className='d-flex ms-2'>
								<div className='bubble-legend me-1' style={{ backgroundColor: `${child.color}` }}></div	>
								<p className='fs-10 m-0 p-0 text-muted'>{child.coreSolution}</p>
							</div>
						))}
					</div>
				</div>
			</Card>
		</div>
	)
}

export default BubbleGraph;