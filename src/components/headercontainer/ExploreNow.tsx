// External libraries
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MdOutlineTravelExplore } from 'react-icons/md';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import Search from '../ui/search/Search';
import Modal from '../ui/modal/Modal';
import { errorState, spinnerState, mapFeatureState } from '../../states';

// Utilities
import WorkInProgressImage from '../../utils/images/work_in_progress.svg';
import { rollbar } from '../../constants';
import { useMapsService } from '../../services';


const ExploreNow = () => {
	const mapsService = useMapsService();
	const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);
	const setSpinner = useSetRecoilState(spinnerState);
	const setError = useSetRecoilState(errorState);
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
			}
			else {
				// setSelectedValue({ ...selectedValue, district: filteredData.geo_value });
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
			}).catch(error => {
				setSpinner(false);
				const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
				setError({ type: 'Error', message: errorMsg });
				rollbar.error(error);
			});
		}
		else {
			setHasData(true);
			setSelectedValue({ state: '', district: '' });
			setValue('');
		}
	}
	const handleViewAvailableStates = () => {
		setHasData(true);
		setSuggestions(mapFeatures.suggestions);
	}

	return (
		<div>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.small}
				variant={ButtonVariant.bordered}
				onClick={() => handleModalOpen(true)}
			>
				<MdOutlineTravelExplore className='me-2' fontSize={20} />
				Explore Now
			</Button>
			<Modal showModal={showModal} classname='width-62-5 h-100 m-5 p-1'>
				<div className='d-flex flex-row justify-content-between mb-2'>
					<Heading
						title='Explore Now'
						type={TypographyType.h2}
						colour={TypographyColor.dark}
					/>
					<button type='button' className='btn-close' onClick={() => handleModalOpen(false)}></button>
				</div>
				<div className='' style={{ maxHeight: '68vh', minHeight: '68vh', minWidth: '56.27rem', maxWidth: '56.27rem' }}>
					<Body
						type={BodyType.p2}
						color={BodyColor.muted}
						classname='text-start'
					>
						Explore the available list of regions in our platform. Our team is working on getting more regions unlocked for you!
					</Body>
					<div className='d-flex flex-row justify-content-start mb-2'>
						{Object.values(selectedValue)?.map((item, index) => (
							item &&
							(<>
								<Heading
									title={item}
									type={TypographyType.h4}
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
						<div className='my-2 position-inherit' style={{ maxHeight: '52vh', overflowY: 'auto', overflowX: 'hidden', minHeight: '52vh' }}>
							<div>
								{results?.map((item: any) => (
									(item.has_data &&
										<div key={item.geo_id} className='my-2'>
											<Heading
												title={item.geo_value}
												type={TypographyType.h4}
												colour={TypographyColor.dark}
												classname='text-start'
											/>
											<hr className='mt-0'></hr>
											<div className='row m-0 p-0'>
												{item.children.map((district: any) => (
													(item.has_data
														&& <Body
															type={BodyType.p1}
															color={BodyColor.primary}
															classname='col-4 text-start mb-1 p-0'
															key={district.geo_id}>{district.geo_value}
														</Body>
													)))}
											</div>
										</div>)
								))}
							</div>
						</div> :
						<div className='d-flex justify-content-center align-items-center'>
							<div className="mx-4 mt-4 mb-0 d-flex flex-column justify-content-center align-items-center" style={{ width: '23rem' }}>
								<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
								<Heading
									title="The state you're Searching is currently unavailable."
									type={TypographyType.h5}
									colour={TypographyColor.dark}
									classname='pt-3 mb-1'
								/>
								<Body
									type={BodyType.p3}
									color={BodyColor.dark}
									classname='text-center my-3 mx-0'
								>
									Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.
								</Body>
								<Button
									theme={ButtonTheme.primary}
									size={ButtonSize.small}
									variant={ButtonVariant.bordered}
									onClick={() => handleViewAvailableStates()}>
									View available states
								</Button>
							</div>
						</div>
					}
				</div>
			</Modal>
		</div>
	);
};

export default ExploreNow;
