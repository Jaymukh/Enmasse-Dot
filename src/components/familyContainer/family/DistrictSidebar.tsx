/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../../constants';
import Select, { SelectSize } from '../../ui/select/Select';
import '../../../App.css';
import '../../../styles/main.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { ProgressBar } from '../../ui/progressbar/ProgressBar';
import { useRecoilValue } from 'recoil';
import { mapFeatureState } from '../../../states/MapFeatureState';

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

const DistrictSidebar = () => {
    const navigate = useNavigate();
    const mapFeatures = useRecoilValue(mapFeatureState);
    const [currency, setCurrency] = useState<string>("$");

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }
    const handleExploreMore = () => {
        navigate(RouteConstants.dashboards);
    }
   
    return (
        <div className='py-2 bg-white px-0 h-100 me-0' >
            <div className='row d-flex justify-content-between align-items-center px-3 py-2 me-1'>
                <h6 className='col-6 text-start m-0 fs-16'>Kutch</h6>
                <div className='col-6 p-0'>
                    <Select
                        options={options}
                        value={currency}
                        labelKey='currency'
                        valueKey='symbol'
                        size={SelectSize.small}
                        onChange={handleChangeCurrency}
                    />
                </div>
            </div>
            <div className="row d-flex justify-content-center pt-1 mx-0 px-3 h-100 pb-5" style={{ overflow: 'auto' }}>
                <div className='row data-card px-3 d-flex flex-row mx-0 my-2'>
                    <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 border-end d-flex flex-column align-items-start text-start' >
                        <h6 className='fs-14'>{mapFeatures.cifData?.properties?.totalHouseholds ? mapFeatures.cifData?.properties?.totalHouseholds : "__"}</h6>
                        <p className='fs-12 m-0 data-card-normal-font'>Total Households</p>
                    </div>
                    <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 ps-3 d-flex flex-column align-items-start text-start'>
                        <h6 className='fs-14'>{mapFeatures.cifData?.properties?.population ? mapFeatures.cifData?.properties?.population : "__"}</h6>
                        <p className='fs-12 m-0 data-card-normal-font'>Total Population</p>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <h6 className='me-2 fs-14 my-0'>EnMasses Thesis</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-3 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top card-green-bg'>
                            <h6 className='text-left fs-14 m-0 text-white'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 text-white'>Total Addressable Market</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Average Annual EH Transactional Value</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enmasseThesis?.numberOfEH ? mapFeatures.cifData?.properties?.enmasseThesis?.numberOfEH : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Number of Entrepreneurial Households (EH)</p>
                        </div>
                    </div>
                </div>
                <div className='row data-card d-flex flex-row mx-0 my-2 px-2 pt-2 pb-3'>
                    <div className='d-flex justify-content-between align-items-center m-0 p-0'>
                        <div className='d-flex justify-content-start align-items-center m-0 px-0 pb-2'>
                            <h6 className='me-2 fs-13 my-0'>EI Coverage</h6>
                            <AiOutlineInfoCircle fontSize={20} color='#606060' />
                        </div>
                        <p className='fs-10 m-0'>{mapFeatures.cifData?.properties?.EICoverage?.covered ? mapFeatures.cifData?.properties?.EICoverage?.covered : "__"} out 0f {mapFeatures.cifData?.properties?.EICoverage?.total ? mapFeatures.cifData?.properties?.EICoverage?.total : "__"} Districts</p>
                    </div>
                    <ProgressBar />
                </div>

                <div className='d-flex flex-column justify-content-center pb-1 pt-2 px-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <h6 className='me-2 fs-13 my-0'>EH Economic Activity Indicators</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-3 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top primary-bgColor text-white'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.pointsOfInterest ? mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.pointsOfInterest : "__"}</h6>
                            <p className='fs-10 m-0'>Points of Interest</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.healthcarePointsOfInterest ? mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.healthcarePointsOfInterest : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Healthcare activity points of interest</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.educationPointsOfInterest ? mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.educationPointsOfInterest : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Education activity points of interest</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end border-top'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.agricultureMarketPointsOfInterest ? mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.agricultureMarketPointsOfInterest : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Agri Markets activity points of interest</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.financialSolutionsPointsOfInterest ? mapFeatures.cifData?.properties?.EHEconmicActivityIndicators?.financialSolutionsPointsOfInterest : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Financial Solutions activity points of interest</p>
                        </div>
                    </div>

                </div>

                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <h6 className='me-2 fs-13 my-0'>EH Spend</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-3 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top primary-bgColor text-white'>
                            <h6 className='fs-14 m-0'>Annual EH Spend </h6>
                            <p className='fs-10 m-0'>Annual EH Spend</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Spend</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Spend on Non-Core Solutions</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end border-top'>
                            <h6 className='fs-14 m-0'></h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Spend on Health</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                            <h6 className='fs-14 m-0'></h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Spend on Education</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end border-top'>
                            <h6 className='fs-14 m-0'></h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Spend on Agriculture</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                            <h6 className='fs-14 m-0'>m</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Spend on Financial Solutions</p>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <h6 className='me-2 fs-13 my-0'>EH Borrowing</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-3 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top primary-bgColor text-white'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0'>Median Annual EH Borrowing from Formal Sources</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0 font-primary-green'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Borrowing</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0 font-rejected'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Borrowing from Informal Sources</p>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <h6 className='me-2 fs-13 my-0'>EH Income</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-3 d-flex flex-column align-items-start justify-content-center text-start py-2 border-bottom rounded-top primary-bgColor text-white'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0'>Median Annual EH Income from Variable Sources</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0 font-primary-green'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Borrowing</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 p-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0 font-rejected'>{mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket ? mapFeatures.cifData?.properties?.enmasseThesis?.TotalAddressableMarket : "__"}</h6>
                            <p className='fs-10 m-0 data-card-normal-font'>Median Annual EH Borrowing from Informal Sources</p>
                        </div>
                    </div>
                </div>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleExploreMore()}
                    classname='my-4'
                >
                    Explore More
                    <PiArrowRightBold className='ms-2' />
                </Button>
            </div>

        </div >
    );
}

export default DistrictSidebar;
