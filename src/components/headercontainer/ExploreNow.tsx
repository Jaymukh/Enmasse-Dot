import '../../App.css';
import React, { useState } from 'react';
import { MdOutlineTravelExplore } from 'react-icons/md';
import * as Constants from '../../utils/constants/Constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import Search from '../ui/search/Search';

const ExploreNow = () => {
	//const [selectedValue, setSelectedValue] = useState<string>('');
	const [inputValue, setInputValue] = useState<string>('');
	const [selectedshowDiv, setSelectedshowDiv] = useState<boolean>(true);
	const [selectedDistricts, setSelectedDistricts] = useState<any>([]);
	const [selectedDistrictOptions, setSelectedDistrictOptions] = useState<string[]>([]);
	const [selectedPlaceType, setSelectedPlaceType] = useState<string>('state');
	const [showExploreNowModal, setShowExploreNowModal] = useState<boolean>(false); // explore now dialog

	// // explore now dialog open and close functions
	const openExploreNowModal = () => {
		setShowExploreNowModal(true);
	};

	const closeExploreNowModal = () => {
		setShowExploreNowModal(false);
		// setSelectedValue('');
		// setInputValue('');
		// setSelectedDistricts(Constants.explorePlaces);
		// setSelectedDistrictOptions(Constants.explorePlaces.map((option) => option.name));
		// setSelectedPlaceType('state');
		// setSelectedshowDiv(true);
	};

	// const handleStateChange = (event: React.ChangeEvent<{}>, newValue: string | null, clear: string) => {
	// 	if (!newValue && !selectedValue) {
	// 		setSelectedDistricts(Constants.explorePlaces); // Keep the entire array
	// 		setSelectedDistrictOptions(Constants.explorePlaces.map((option) => option.name));
	// 		setSelectedPlaceType('state');
	// 		setInputValue(clear);
	// 	} else {
	// 		if (!newValue) {
	// 			const index = Constants.explorePlaces.findIndex((option) => option.name === selectedValue);
	// 			setSelectedDistricts(Constants.explorePlaces[index].districts);
	// 		} else {
	// 			const val = Constants.explorePlaces.some((option) => option.name === newValue) ? 'districts' : 'state';
	// 			if (val === 'districts') {
	// 				setSelectedValue(newValue);
	// 				setInputValue(clear); // Clear the input value when the option is selected
	// 				const index = Constants.explorePlaces.findIndex((option) => option.name === newValue);
	// 				setSelectedDistricts(Constants.explorePlaces[index].districts);
	// 				setSelectedDistrictOptions(Constants.explorePlaces[index].districts);
	// 				setSelectedPlaceType(val);
	// 				setSelectedshowDiv(false);
	// 			} else {
	// 				const districtFound = Constants.explorePlaces.some((option) =>
	// 					option.districts.includes(newValue)
	// 				);
	// 				if (districtFound) {
	// 					setSelectedDistricts([newValue]);
	// 					setSelectedPlaceType('districts');
	// 					setSelectedshowDiv(false);
	// 				} else {
	// 					setSelectedDistricts(Constants.explorePlaces); // Keep the entire array
	// 					setSelectedDistrictOptions(Constants.explorePlaces.map((option) => option.name));
	// 					setSelectedPlaceType('state');
	// 					setInputValue(clear);
	// 				}
	// 			}
	// 		}
	// 	}
	// };

	// const onhandleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
	// 	setInputValue('');
	// };

	// const clearInput = () => {
	// 	setSelectedValue('');
	// 	setInputValue('');
	// 	setSelectedshowDiv(true);
	// 	setSelectedDistricts(Constants.explorePlaces); // Keep the entire array
	// 	setSelectedPlaceType('state');
	// };

	const [results, setResults] = useState<any>(Constants.explorePlaces);
	const [value, setValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState({ state: '', district: '' });
	const [suggestions, setSuggestions] = useState<any>(Constants.explorePlaces);

	const handleInputChange = (value: string) => {
		setValue(value);
		if (!value) {
			setSuggestions(Constants.explorePlaces);
		} else {
			const result = suggestions.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()));
			setSuggestions(result);
		}
	}

	const handleSelectValue = (value: string) => {
		setValue(value);
		const filteredData = suggestions.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()));
		setResults(filteredData);
		setSelectedValue({...selectedValue, state: filteredData[0].name});
	}

	return (
		<div>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.default}
				variant={ButtonVariant.contained}
				onClick={openExploreNowModal}>
				<MdOutlineTravelExplore className='me-2' fontSize={20} />
				Explore Now
			</Button>
			<div
				className={`modal ${showExploreNowModal ? 'show' : ''}`}
				tabIndex={-1}
				role='dialog'
				style={{ display: showExploreNowModal ? 'block' : 'none' }}
			>
				<div className='modal-dialog  modal-dialog-centered dialog-width'
					style={{ width: '62.5rem', height: '38.5625rem' }}
				>
					<div className='modal-content' >
						<div className='modal-body d-flex flex-column justify-content-center m-4' >
							<div className='d-flex flex-row justify-content-between'>
								<h5>Explore Now</h5>
								<button type='button' className='btn-close' onClick={closeExploreNowModal}></button>
							</div>
							<div className='modal-dialog-scrollable'>
								<p className='text-muted text-start fs-14'>
									Explore the available list of regions in our platform. Our team is working on getting more regions unlocked for you!
								</p>
								<div className='d-flex flex-row justify-content-start'>
									{Object.values(selectedValue)?.map(item => (
										item &&
										(<>
											<h5 className='fs-16'>{item}</h5>
											<button
												type='button'
												className='btn-close mx-3'
											/>
										</>)
									))}

								</div>
								<Search
									handleInputChange={handleInputChange}
									handleSelectValue={handleSelectValue}
									data={Constants.explorePlaces}
									value={value}
									suggestions={suggestions}

								// data={Constants.explorePlaces}
								// results={results}
								// value={value}
								// handleChangeResults={handleChangeResults}
								// handleSelectedValue={handleSelectedValue}
								/>
								<div className='my-4'>
									<div>
										{results.map((item: any) => (
											<div key={item.name} className='my-2'>
												<h5 className='d-flex justify-content-start fs-18 mb-0'>{item.name}</h5>
												<hr className='mt-0'></hr>
												<div className='row'>
													{item.districts.map((district: any) => (
														<p className='col-4 text-start mb-1 color-green fs-16'>{district.name}</p>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showExploreNowModal && <div className=" modal-backdrop fade show"></div>}
		</div>
	);
};

export default ExploreNow;
