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

const ExploreNow = () => {
	const mapsService = useMapsService();
	const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);
	const setSpinner = useSetRecoilState(spinnerState);    
	const [showModal, setshowModal] = useState<boolean>(false);
	const [results, setResults] = useState<any>(mapFeatures.suggestions);
	const [value, setValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<{ state: string; district: string }>({ state: '', district: '' });
	const [suggestions, setSuggestions] = useState<any>(mapFeatures.suggestions);

	const handleInputChange = (value: string) => {
		setValue(value);
		if (!value) {
			setSuggestions(mapFeatures.suggestions);
		} else {
			const result = suggestions?.filter((item: any) => item?.name?.toLowerCase().includes(value.toLowerCase()));
			setSuggestions(result);
		}
	}

	const handleSelectValue = (value: string) => {
		setValue('');
		const filteredData = suggestions?.find((item: any) => item.name.toLowerCase().includes(value.toLowerCase()));
		if (filteredData.districts) {
			setResults([filteredData]);
			setSelectedValue({ ...selectedValue, state: filteredData.name });
			setSuggestions(filteredData.districts);
		} else {
			setSelectedValue({ ...selectedValue, district: filteredData.name });
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
		debugger		
		setshowModal(flag);
		if(flag === true) {
			setSpinner(true);
			mapsService.getExploreNow().then(data => {
				setMapFeatures(prevMapFeatures => ({
					...prevMapFeatures,
					suggestions: data[0].children
				}));
				setSuggestions(data[0].children);
				setResults(data[0].children);
				setSpinner(false);
			});
		}		
	}

	return (
		<div>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.small}
				variant={ButtonVariant.contained}
				onClick={() => handleModalOpen(true)}>
				<MdOutlineTravelExplore className='me-2' fontSize={20} />
				Explore Now
			</Button>
			<Modal showModal={showModal} classname='width-62-5'>
				<div className='d-flex flex-row justify-content-between mb-2'>
					<Heading
						title='Explore Now'
						type={TypographyType.h2}
						colour={TypographyColor.dark}
					/>
					<button type='button' className='btn-close' onClick={() => handleModalOpen(false)}></button>
				</div>
				<div className='modal-dialog-scrollable'>
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
						hideSuggestionBox={false}
						placeholderValue='Search by State'
						classname='height-3 width-26-625'
					/>
					<div className='my-4'>
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
										{/* {item.children.map((district: any) => (
											<p className='col-4 text-start mb-1 color-green fs-16' key={district.geo_id}>{district.geo_value}</p>
										))} */}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ExploreNow;
