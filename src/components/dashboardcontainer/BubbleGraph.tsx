import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { BubbleNode, colorDescription } from '../../utils/constants/Constants';
import Select, { SelectSize } from '../ui/select/Select';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';
import { useRecoilValue } from 'recoil';
import { cifState } from '../../states';
import '../../styles/main.css';
import NoVisualData from './NoVisualData';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
		if (coreSolutionsData?.coreSolutionsByEH?.length > 0) {
			const coreSolutionsByEH = [...coreSolutionsData?.coreSolutionsByEH];
			const modifiedCoreSolutions = coreSolutionsByEH.map(child => {
				return { ...child, color: colorDescription[child.type] };
			});

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
			<Card size={CardSize.default} variant={CardVariant.contained} classname='p-3 h-100'>
				<div className='row px-2 d-flex justify-content-between'>
					<div className='m-0 p-0 d-flex col-4 align-items-center'>
						<Heading
							title='Core Solutions by EH'
							type={TypographyType.h5}
							colour={TypographyColor.dark}
							classname='text-start px-1'
						/>
						<AiOutlineInfoCircle fontSize={15} color='#606060' />
					</div>
					<div className='col-2'>
						<Select
							options={options}
							onChange={handleChangeYear}
							value={selectedYear}
							labelKey='value'
							valueKey='value'
							size={SelectSize.small}
							disabled={coreSolutionsData?.coreSolutionsByEH?.length > 0 ? false : true}
						/>
					</div>
				</div>
				<div className='d-flex justify-content-center align-items-center h-auto w-100'>
					{coreSolutionsData?.coreSolutionsByEH?.length > 0 ?
						<div className='m-0 p-0'>
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
										<Body
											type={BodyType.p4}
											color={BodyColor.muted}
											classname='m-0 p-0'>
											{child.coreSolution}
										</Body>
									</div>
								))}
							</div>
						</div> :
						<NoVisualData displayImage={true} size='large' />
					}
				</div>
			</Card>
		</div>
	)
}

export default BubbleGraph;