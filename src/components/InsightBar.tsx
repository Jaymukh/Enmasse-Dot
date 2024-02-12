// External libraries
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// CSS
import '../styles/main.css';

// Components
import { AllSettingsState, UserSettingsState, errorState, mapFeatureState } from '../states';
import { Heading, TypographyColor, TypographyType } from './ui/typography/Heading'
import Body, { BodyColor, BodyType } from './ui/typography/Body';
import Select, { SelectSize } from './ui/select/Select';

// Utilities
import { useSettingsService } from '../services';
import { useMapHelpers } from '../helpers';


const options = [
    {
        currency: "US Dollar",
        symbol: "$"
    },
    {
        currency: "Indian Rupee",
        symbol: '₹'
    }
];

export default function InsightBar() {
    const [currency, setCurrency] = useState("US Dollar");
    const mapFeatures = useRecoilValue(mapFeatureState);
    const settingsService = useSettingsService();
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState(UserSettingsState);
    const setError = useSetRecoilState(errorState);
    const { getCurrencyWithSymbol } = useMapHelpers();

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }

    const fetchAllSettings = () => {
        settingsService.getAllSettings().then((response) => {
            if (response) {
                setSettings(response);
            }
        }).catch(error => {
            const errorMsg = error?.response?.data?.detail ? error?.response?.data?.detail : "Something went wrong. Please try again."
            setError({ type: 'Error', message: errorMsg });
        });
    }

    const fetchUserSettings = () => {
        settingsService.getUserSettings().then((response) => {
            if (response) {
                setUserSettings(response);
                // setSpinner(false);
            }
        }).catch(error => {
            // setSpinner(false);
            const errorMsg = error?.response?.data?.detail ? error?.response?.data?.detail : "Something went wrong. Please try again."
            setError({ type: 'Error', message: errorMsg });

        });
    }

    useEffect(() => {
        fetchAllSettings();
        fetchUserSettings();
    }, []);

    return (
        <div className='sideBar-parent-expended py-4 px-0 z-index-1' style={{ overflow: 'auto', overflowX: 'hidden', position: 'inherit' }} >
            <div className='row d-flex justify-content-between align-items-center px-3'>
                <div className='col-6 d-flex justify-content-start'>
                    <Heading
                        title='EnMasses Thesis'
                        colour={TypographyColor.dark}
                        type={TypographyType.h4}
                        classname='ms-1' />
                </div>
                <div className='col-6'>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='symbol'
                        size={SelectSize.small}
                        name='currency'
                    />
                </div>
            </div>
            <>
                <Heading
                    title={mapFeatures.cifData?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h4}
                    classname='text-start px-3 my-1 ms-1' />
                <div className="row d-flex justify-content-center py-2 mx-0 px-4">
                    <div className='row data-card px-3 d-flex flex-row mx-0 my-2'>
                        <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 border-end d-flex flex-column align-items-start text-start' >
                            <Heading
                                title={mapFeatures.cifData?.properties?.totalHouseholds ? mapFeatures.cifData?.properties?.totalHouseholds : "__"}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='text-start px-3 my-1 ms-1' />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='m-0'
                            >
                                Number of Households
                            </Body>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 ps-3 d-flex flex-column align-items-start text-start'>
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.totalPopulation)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='m-0'
                            >
                                Total Population
                            </Body>
                        </div>
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 p-0 d-flex flex-column align-items-center justify-content-center text-start py-2 border-bottom'>
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.enMassesThesis?.totalAddressableMarket)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='text-left m-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='m-0'
                            >
                                Total Addressable Market
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start justify-content-center text-start border-end' >
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.enMassesThesis?.numberOfEntrepreneurialHouseholds)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='m-0'
                            >
                                Number of Entrepreneurial Households (EH)
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start text-start'>
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.EHSpend?.averageAnnualEHSpend)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='m-0'
                            >
                                Median Annual EH Household Spend
                            </Body>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}