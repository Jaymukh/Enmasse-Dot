import React, { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../../constants';
import Select, { SelectSize } from '../../ui/select/Select';
import '../../../App.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';


const options = [
    {
        currency: "US Dollar",
        symbol: "$"
    },
    {
        currency: "Indian Rupee",
        symbol: '₹'
    }
]
const DistrictSidebar = () => {
    const navigate = useNavigate();
    const [currency, setCurrency] = useState<string>("US Dollar");

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }
    const handleExploreMore = () => {
        navigate(RouteConstants.dashboards);
    }
    return (
        <div className='py-2 bg-white px-0 h-100 me-0' style={{ overflow: 'auto' }}>
            <div className='row d-flex justify-content-between align-items-start px-3'>
                <div className='col-8 d-flex flex-column align-items-start'>
                    <h6 className='fs-16'>Kutch</h6>
                </div>
                <div className='col-4'>
                    <Select
                        options={options}
                        value={currency}
                        labelKey='currency'
                        valueKey='currency'
                        size={SelectSize.small}
                        onChange={handleChangeCurrency}
                    />
                </div>
            </div>
            <div className="row d-flex justify-content-center py-2 mx-0 px-3">
                <div className='row card px-3 d-flex flex-row mx-0 my-2'>
                    <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 border-end d-flex flex-column align-items-start text-start' >
                        <h6 className='fs-14'>2 Billion</h6>
                        <p className='fs-11 m-0'>Total Households</p>
                    </div>
                    <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 ps-3 d-flex flex-column align-items-start text-start'>
                        <h6 className='fs-14'>800 Million</h6>
                        <p className='fs-11 m-0'>Total Population</p>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start ms-2'>
                        <h6 className='me-2 ms-1 fs-13 my-0'>EnMasses Thesis</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-0 d-flex flex-column align-items-center justify-content-center text-start py-2 border-bottom rounded-top primary-bgColor'>
                            {/* <div className='tam-info p-2 d-flex flex-column justify-content-center'> */}
                            <h6 className='text-left fs-18 m-0 text-white'>$3 Trillion</h6>
                            <p className='fs-11 m-0 text-white'>Total Addressable Market</p>
                            {/* </div> */}
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0'>400 Thousand</h6>
                            <p className='fs-11 m-0'>Number of Entrepreneurial Households (EH)</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0'>$7500</h6>
                            <p className='fs-11 m-0'>Median Annual EH Household Spend</p>
                        </div>
                    </div>
                </div>
                {/* <div className='d-flex flex-column justify-content-center py-2'>
                    <div className='d-flex justify-content-start ms-2'>
                        <h6 className='me-2 ms-1 fs-13'>Core Solutions</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                            <h6 className='fs-14'>150</h6>
                            <p className='fs-11 m-0'>Healthcare activity per 100 EH</p>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                            <h6 className='fs-14'>150</h6>
                            <p className='fs-11 m-0'>Education activity per 100 EH</p>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                            <h6 className='fs-14'>200</h6>
                            <p className='fs-11 m-0'>Agri Solutions activity per 100 EH</p>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                            <h6 className='fs-14'>550</h6>
                            <p className='fs-11 m-0'>Financial Solutions activity per 100 EH</p>
                        </div>
                    </div>
                </div> */}
                <div className='d-flex flex-column justify-content-center pb-1 px-0'>
                    <div className='d-flex justify-content-start ms-2 '>
                        <h6 className='me-2 ms-1 fs-13 my-0'>EH Income</h6>
                        <AiOutlineInfoCircle fontSize={20} color='#606060' />
                    </div>
                    <div className='row card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 px-0 d-flex flex-column align-items-center justify-content-center text-start py-2 border-bottom rounded-top primary-bgColor text-white'>
                            {/* <div className='tam-info p-2 d-flex flex-column justify-content-center'> */}
                            <h6 className='fs-14 m-0'>$7000</h6>
                            <p className='fs-11 m-0'>Median Annual EH Household Income</p>
                            {/* </div> */}
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start text-start border-end'>
                            <h6 className='fs-14 m-0'>$3000</h6>
                            <p className='fs-11 m-0'>Formal Sources</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <h6 className='fs-14 m-0'>$4000</h6>
                            <p className='fs-11 m-0'>Informal Sources</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start text-start border-end border-top'>
                            <h6 className='fs-14 m-0'>$3000</h6>
                            <p className='fs-11 m-0'>Formal Sources</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                            <h6 className='fs-14 m-0'>$4000</h6>
                            <p className='fs-11 m-0'>Informal Sources</p>
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
            </div>

        </div >
    );
}

export default DistrictSidebar;
