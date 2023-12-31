/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import { LiaArrowRightSolid } from 'react-icons/lia';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import Select, { SelectSize } from '../../ui/select/Select';
import { ProgressBar } from '../../ui/progressbar/ProgressBar';
import InfoPanel from '../../ui/InfoPanel';
import RequestData from './RequestData';
import { mapFeatureState, AllSettingsState, UserSettingsState, errorState } from '../../../states';

// Utilities
import WIPImage from '../../../utils/images/WIP-FINAL.svg';
import { RouteConstants } from '../../../constants';
import { useSettingsService } from '../../../services';
import { useMapHelpers } from '../../../helpers';

const DistrictSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const { cifData: { properties } } = useRecoilValue(mapFeatureState);
    const [currency, setCurrency] = useState<string>("$");
    const settingsService = useSettingsService();
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState(UserSettingsState);
    const setError = useSetRecoilState(errorState);
    const { getCurrencyWithSymbol } = useMapHelpers();


    //function to get all the user's setting
    const [requestDataDrawerOpen, setRequestDataDrawerOpen] = useState(false);

    const handleRequestDataDrawer = (requestDataDrawerOpen: boolean) => {
        setRequestDataDrawerOpen(requestDataDrawerOpen);
    };

    const fetchUserSettings = () => {
        settingsService.getUserSettings().then((response) => {
            if (response) {
                setUserSettings(response);
                // setSpinner(false);
            }
        }).catch(error => {
            // setSpinner(false);
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
            setError({ type: 'Error', message: errorMsg });

        });
    }

    const fetchAllSettings = () => {
        settingsService.getAllSettings().then((response) => {
            if (response) {
                setSettings(response);
            }
        }).catch(error => {
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
            setError({ type: 'Error', message: errorMsg });
        });
    }

    //function to get all the user's setting
    useEffect(() => {
        fetchAllSettings();
        fetchUserSettings();
    }, []);

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }

    const handleExploreMore = (geo_id: string) => {
        navigate({
            pathname: RouteConstants.dashboards,
            search: `?geo_code=${geo_id}`,
        });
    }

    return (
        <div className='w-100 bg-white px-0 me-0' style={{ height: pathname === '/' ? '85.5vh' : '91.75vh' }} >
            <div className='w-100 d-flex justify-content-between align-items-center px-3 py-auto' style={{height: '10%'}}>
                <div className='d-flex justify-content-start align-items-center col-6 m-0 text-start'>
                    <Heading
                        title={properties?.region}
                        colour={TypographyColor.dark}
                        type={TypographyType.h4}
                        classname='me-2 my-0'
                    />
                    <InfoPanel fontSize={20} text={properties?.infoButton} />
                </div>
                <div className='col-6 p-0'>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='symbol'
                        size={SelectSize.small}
                        name='currency'
                        disabled={true}
                    />
                </div>
            </div>
            <div className="row d-flex justify-content-center pt-1 mx-0 px-3" style={{ overflowY: 'auto', overflowX: 'hidden', height: '80%' }}>
                <div className='row data-card px-2 d-flex flex-row mx-0 my-2' style={{ height: 'fit-content' }}>
                    <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 border-end d-flex flex-column align-items-start text-start' >
                        <Heading
                            title={getCurrencyWithSymbol(properties?.totalPopulation)}
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='m-0'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                            classname='m-0'>
                            Total Population
                        </Body>
                    </div>
                    <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 ps-2 d-flex flex-column align-items-start text-start'>
                        <Heading
                            title={getCurrencyWithSymbol(properties?.totalHouseholds)}
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='m-0'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                            classname='m-0'>
                            Number of Households 
                        </Body>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <Heading
                            title='EnMasses Thesis'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='me-2 my-0'
                        />
                        <InfoPanel fontSize={20} text={properties?.enMassesThesis?.infoButton} />
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 mt-2 mb-3 px-0'>
                        <div className='col-12 px-2 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top bg-purple'>
                            <Heading
                                title={getCurrencyWithSymbol(properties?.enMassesThesis?.totalAddressableMarket, properties?.enMassesThesis?.totalAddressableMarketUOM)}
                                colour={TypographyColor.secondary}
                                type={TypographyType.h5}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.white}
                                classname='m-0'>
                                Total Addressable Market
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                            <Heading
                                title={getCurrencyWithSymbol(properties?.enMassesThesis?.averageAnnualEHTransactionalValue, properties?.enMassesThesis?.averageAnnualEHTransactionalValueUOM)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='m-0'>
                                Average Annual Core Transactional Value (CTV)
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <Heading
                                title={getCurrencyWithSymbol(properties?.enMassesThesis?.numberOfEntrepreneurialHouseholds)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='m-0'>
                                Number of Entrepreneurial Households (EH)
                            </Body>
                        </div>
                    </div>
                </div>
                <hr className='m-0 data-card' />
                {properties?.showExploreMore ?
                    <div className='m-0 mt-1 p-0'>
                        {properties?.EICoverage && (properties?.geo_name !== 'district') && <div className='row data-card d-flex flex-row mx-0 mb-2 mt-3 px-2 pt-2 pb-3'>
                            <div className='d-flex justify-content-between align-items-center m-0 p-0 pb-2'>
                                <div className='d-flex justify-content-start align-items-center m-0 p-0'>
                                    <Heading
                                        title='EI Coverage'
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='me-2 my-0 text-start'
                                    />
                                    <InfoPanel fontSize={20} text={properties?.EICoverage?.infobutton} />
                                </div>
                                <Body
                                    type={BodyType.p4}
                                    color={BodyColor.dark}
                                    classname='m-0'>
                                    {properties?.EICoverage?.covered} out 0f {properties?.EICoverage?.total} Districts
                                </Body>
                            </div>
                            <ProgressBar coverage={properties?.EICoverage} />
                        </div>}

                        {properties?.EHEconomicActivityIndicators?.showPOI 
                        && <div className='d-flex flex-column justify-content-center pb-1 pt-2 px-0'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <Heading
                                    title='EH Economic Activity Indicators'
                                    colour={TypographyColor.dark}
                                    type={TypographyType.h5}
                                    classname='me-2 my-0 text-start'
                                />
                                <InfoPanel fontSize={20} text={properties?.EHEconomicActivityIndicators?.infoButton} />
                            </div>
                            <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                                <div className='col-12 px-2 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top bg-purple-1'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.pointsOfInterest)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.dark}
                                        classname='m-0'>Points of Interest
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.healthcareActivityPointsOfInterest)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'

                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Healthcare ecosystem markers 
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.educationActivityPointsOfInterest)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Education ecosystem markers 
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end border-top'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.agriMarketActivityPointsOfInterest)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Agricultural ecosystem markers 
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.financialSolutionsActivityPointsOfInterest)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Financial Solutions ecosystem markers 
                                    </Body>
                                </div>
                            </div>

                        </div>}

                        {properties?.EHSpend?.showSpend 
                        && <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <Heading
                                    title='EH Spend'
                                    colour={TypographyColor.dark}
                                    type={TypographyType.h5}
                                    classname='me-2 my-0'
                                />
                                <InfoPanel fontSize={20} text={properties?.EHSpend?.infoButton} />
                            </div>
                            <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                                <div className='col-12 p-2 d-flex flex-column align-items-start justify-content-center text-start border-bottom rounded-top bg-purple-1'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.annualEHSpend, properties?.EHSpend?.annualEHSpendUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.dark}
                                        classname='m-0'>
                                        Average Annual EH Spend 
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.averageAnnualEHSpend, properties?.EHSpend?.averageAnnualEHSpendUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Spend on Core Solutions
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.averageAnnualEHSpendOnNonCoreSolutions, properties?.EHSpend?.averageAnnualEHSpendOnNonCoreSolutionsUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Spend on Non-Core Solutions
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end border-top'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnHealthcare, properties?.EHSpend?.healthcareSpendUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Spend on Healthcare
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnEducation, properties?.EHSpend?.educationSpendUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Spend on Education
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end border-top'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnAgriMarket, properties?.EHSpend?.agriMarketSpendUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Spend on Agri Markets
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnFinancialSolutions, properties?.EHSpend?.financialSolutionsSpendUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Spend on Financial Solutions
                                    </Body>
                                </div>
                            </div>
                        </div>}

                        {properties?.EHBorrow?.showBorrow 
                        && <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <Heading
                                    title='EH Borrowing'
                                    colour={TypographyColor.dark}
                                    type={TypographyType.h5}
                                    classname='me-2 my-0'
                                />
                                <InfoPanel fontSize={20} text={properties?.EHBorrow?.infoButton} />
                            </div>
                            <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                                <div className='col-12 p-2 d-flex flex-column align-items-start justify-content-center text-start border-bottom rounded-top bg-purple-1'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHBorrow?.averageAnnualEHBorrowing, properties?.EHBorrow?.averageAnnualEHBorrowingUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.dark}
                                        classname='m-0'>
                                        Average Annual EH Borrowing
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHBorrow?.averageAnuualEHBorrowingFromFormalSources, properties?.EHBorrow?.averageAnuualEHBorrowingFromFormalSourcesUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.dark}
                                        classname='m-0'>
                                        Average Annual EH Borrowing from Formal Sources
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHBorrow?.averageAnnualEHBorrowingFromInformalSources, properties?.EHBorrow?.averageAnnualEHBorrowingFromInformalSourcesUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Borrowing from Informal Sources
                                    </Body>
                                </div>
                            </div>
                        </div>
                        }

                        {properties?.EHIncome?.showIncome 
                        && <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <Heading
                                    title='EH Income'
                                    colour={TypographyColor.dark}
                                    type={TypographyType.h5}
                                    classname='me-2 my-0'
                                />
                                <InfoPanel fontSize={20} text={properties?.EHIncome?.infoButton} />
                            </div>
                            <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                                <div className='col-12 p-2 d-flex flex-column align-items-start justify-content-center text-start border-bottom rounded-top bg-purple-1'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHIncome?.annualEHIncome, properties?.EHIncome?.annualEHIncomeUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.dark}
                                        classname='m-0'>
                                        Average Annual EH Income
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHIncome?.averageAnnualEHIncomeFromVariableSources, properties?.EHIncome?.averageAnnualEHIncomeFromVariableSourcesUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.dark}
                                        classname='m-0'>
                                        Average Annual EH Income from Formal Sources
                                    </Body>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                    <Heading
                                        title={getCurrencyWithSymbol(properties?.EHIncome?.averageAnnualEHIncomeFromInformalSources, properties?.EHIncome?.averageAnnualEHIncomeFromInformalSourcesUOM)}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='m-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                        classname='m-0'>
                                        Average Annual EH Income from Informal Sources
                                    </Body>
                                </div>
                            </div>
                        </div>}
                    </div> 
                    : <div className='row d-flex flex-row m-0 p-0 justify-content-center align-items-center'>
                        <img src={WIPImage} alt='WIP' width="40%" height='50%' />
                        <Heading
                            title='Work in progress.'
                            type={TypographyType.h5}
                            colour={TypographyColor.dark}
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.muted}
                            classname='p-0 m-0 w-95'>
                            We are working on measuring EH Spend, Income, and Borrowing for this district to project a TAM. Please check again soon.
                        </Body>
                        <Button
                            theme={ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.bordered}
                            onClick={() => handleRequestDataDrawer(true)}
                        >
                            Request Data
                        </Button>
                    </div>
                }
            </div>
            <div className="p-3 d-flex justify-content-center align-items-center" style={{height: '10%'}}>
                <Button
                    disabled={!properties?.showExploreMore}
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleExploreMore(properties?.geo_id)}
                    classname='mb-0 w-100 bottom-0'
                >
                    Explore More
                    <LiaArrowRightSolid className='ms-2' fontSize={22} />
                </Button>
            </div>
            {requestDataDrawerOpen && <RequestData requestDataDrawerOpen={requestDataDrawerOpen} handleRequestDataDrawer={handleRequestDataDrawer} />}
        </div >
    );
}

export default DistrictSidebar;
