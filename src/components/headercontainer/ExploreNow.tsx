import '../../App.css';
import '../../styles/main.css';
import { useState } from 'react';
import { MdOutlineTravelExplore } from 'react-icons/md';
import * as Constants from '../../utils/constants/Constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Search from '../ui/search/Search';
import Modal from '../ui/modal/Modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mapFeatureState } from '../../states/MapFeatureState';
import { useMapsService } from '../../services/Maps.service';
import { spinnerState } from '../../states';
import WorkInProgressImage from '../../utils/images/work_in_progress.svg';

const ExploreNow = () => {
	const mapsService = useMapsService();
	const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);
	const setSpinner = useSetRecoilState(spinnerState);
	const [showModal, setshowModal] = useState<boolean>(false);
	const [results, setResults] = useState<any>(mapFeatures.suggestions);
	const [value, setValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<{ state: string, district: string }>({ state: '', district: '' });
	const [suggestions, setSuggestions] = useState<any>(mapFeatures.suggestions);
	const [hasData, setHasData] = useState(true);

	const handleInputChange = (value: string) => {
		setValue(value);
		if (!value) {
			setSuggestions(mapFeatures.suggestions);
		} else {
			const result = suggestions?.filter((item: any) => item?.geo_value?.toLowerCase().includes(value.toLowerCase()));
			setSuggestions(result);
		}
	}

	const handleSelectValue = (value: string) => {

		setValue('');
		const filteredData = suggestions?.find((item: any) => item.geo_value?.toLowerCase().includes(value.toLowerCase()));
		if (filteredData?.has_data) {
			setHasData(true);
			if (filteredData?.children) {
				setResults([filteredData]);
				setSelectedValue({ ...selectedValue, state: filteredData.geo_value });
				setSuggestions(filteredData.children);
			} else {
				setSelectedValue({ ...selectedValue, district: filteredData.geo_value });
			}
		}
		else {
			setHasData(false);
		}
	}

	const handleCloseSelected = (index: number) => {
		const objKeys: Array<keyof typeof selectedValue> = ['state', 'district'];
		setSelectedValue({ ...selectedValue, [objKeys[index]]: '' });
		if (!index) {
			setSuggestions(mapFeatures.suggestions);
			setResults(mapFeatures.suggestions);
		}
	}

	const handleModalOpen = (flag: boolean) => {
		setshowModal(flag);
		if (flag === true) {
			setSpinner(true);
			mapsService.getExploreNow().then(data => {
				setMapFeatures(prevMapFeatures => ({
					...prevMapFeatures,
					suggestions: data
				}));
				setSuggestions(data);
				setResults(data);
				setSpinner(false);
			});
		}
	}

	return (
		<div>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.small}
				variant={ButtonVariant.bordered}
				onClick={() => handleModalOpen(true)}>
				<MdOutlineTravelExplore className='me-2' fontSize={20} />
				Explore Now
			</Button>
			<Modal showModal={showModal} classname='width-62-5 height-90'>
				<div className='d-flex flex-row justify-content-between mb-2'>
					<Heading
						title='Explore Now'
						type={TypographyType.h2}
						colour={TypographyColor.dark}
					/>
					<button type='button' className='btn-close' onClick={() => handleModalOpen(false)}></button>
				</div>
				<div className=''>
					<p className='text-muted text-start fs-14'>
						Explore the available list of regions in our platform. Our team is working on getting more regions unlocked for you!
					</p>
					<div className='d-flex flex-row justify-content-start mb-2'>
						{Object.values(selectedValue)?.map((item, index) => (
							item &&
							(<>
								<Heading
									title={item}
									type={TypographyType.h3}
									colour={TypographyColor.dark}
								/>
								<button
									type='button'
									className='btn-close mx-2 fs-12'
									onClick={() => handleCloseSelected(index)}
								/>
							</>)
						))}

					</div>
					<Search
						handleInputChange={handleInputChange}
						handleSelectValue={handleSelectValue}
						data={mapFeatures.suggestions}
						value={value}
						suggestions={suggestions}
						labelKey='geo_value'
						valueKey='geo_value'
						hideSuggestionBox={false}
						placeholderValue={selectedValue?.state ? 'Search by District' : 'Search by State'}
						classname='height-3 width-26-625'
					/>
					{hasData ?
						<div className='my-2 position-inherit' style={{maxHeight: '60vh', overflowY: 'auto', overflowX: 'hidden'}}>
							<div>
								{results?.map((item: any) => (
									<div key={item.geo_id} className='my-2'>
										<Heading
											title={item.geo_value}
											type={TypographyType.h3}
											colour={TypographyColor.dark}
											classname='text-start'
										/>
										<hr className='mt-0'></hr>
										<div className='row'>
											{item.children.map((district: any) => (
												<p className='col-4 text-start mb-1 color-green fs-16' key={district.geo_id}>{district.geo_value}</p>
											))}
										</div>
									</div>
								))}
							</div>
						</div> :
						<div className='d-flex justify-content-center align-items-center'>
							<div className="mx-4 my-1 dialog-div d-flex flex-column justify-content-center align-items-center py-5">
								<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
								<Heading
									title='Work in progress.'
									type={TypographyType.h4}
									colour={TypographyColor.dark}
									classname='pt-5'
								/>
								<p className="text-center fs-12 my-3 mx-0">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
							</div>
						</div>
					}
				</div>
			</Modal>
		</div>
	);
};

export default ExploreNow;
