import '../../App.css';
import React, { useState } from 'react';
import { MdOutlineTravelExplore } from 'react-icons/md';
import * as Constants from '../../utils/constants/Constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Search from '../ui/search/Search';

const ExploreNow = () => {
	const [showModal, setshowModal] = useState<boolean>(false);
	const [results, setResults] = useState<any>(Constants.explorePlaces);
	const [value, setValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<{ state: string; district: string }>({ state: '', district: '' });
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
		setValue('');
		const filteredData = suggestions.find((item: any) => item.name.toLowerCase().includes(value.toLowerCase()));
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
			setSuggestions(Constants.explorePlaces);
			setResults(Constants.explorePlaces);
		}
	}

	const handleModalOpen = (flag: boolean) => {
		setshowModal(flag)
	}

	return (
		<div>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.default}
				variant={ButtonVariant.contained}
				onClick={() => handleModalOpen(true)}>
				<MdOutlineTravelExplore className='me-2' fontSize={20} />
				Explore Now
			</Button>
			<div
				className={`modal ${showModal ? 'show' : ''}`}
				tabIndex={-1}
				role='dialog'
				style={{ display: showModal ? 'block' : 'none' }}
			>
				<div className='modal-dialog  modal-dialog-centered dialog-width'
				>
					<div className='modal-content' >
						<div className='modal-body d-flex flex-column justify-content-center m-4' >
							<div className='d-flex flex-row justify-content-between'>
								<Heading
                            title='Explore Now'
                            type={TypographyType.h5}
                            colour={TypographyColor.dark}
                        />
								<button type='button' className='btn-close' onClick={() => handleModalOpen(false)}></button>
							</div>
							<div className='modal-dialog-scrollable'>
								<p className='text-muted text-start fs-14'>
									Explore the available list of regions in our platform. Our team is working on getting more regions unlocked for you!
								</p>
								<div className='d-flex flex-row justify-content-start'>
									{Object.values(selectedValue)?.map((item, index) => (
										item &&
										(<>
											<h5 className='fs-14'>{item}</h5>
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
									data={Constants.explorePlaces}
									value={value}
									suggestions={suggestions}
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
			{showModal && <div className=" modal-backdrop fade show"></div>}
		</div>
	);
};

export default ExploreNow;
