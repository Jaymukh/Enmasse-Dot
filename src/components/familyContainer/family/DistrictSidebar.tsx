import React, {useState} from 'react';
import { countryData } from '../../../utils/constants/Constants';
import { PiArrowRightBold } from 'react-icons/pi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../../App.css';

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
    const [currency, setCurrency] = useState<string>("US Dollar");

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }
    return (
        // <div className='col-3 py-4 px-2 bg-white px-0' style={{ height: '98%', overflow: 'auto' }}>
        <div className='py-4 px-2 bg-white px-0 h-100' style={{ overflow: 'auto' }}>
            <div className='d-flex justify-content-between align-items-start px-2'>
                <div>
                    <h6 className='fs-18'>Kutch</h6>
                    <p className='ps-2 fs-14 mx-0 my-0'>Gujarat</p>
                </div>
                <select className='currency-select-box px-2 py-1 fs-11' value={currency} onChange={handleChangeCurrency}>
                    {options.map((option, key) => <option key={key} value={option.currency}>{option.currency} {option.symbol}</option>)}
                </select>
            </div>
            <div className="row d-flex justify-content-center py-2">
                <div className='col-sm-11 col-md-11 col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start' >
                    <h6 className='fs-14'>2 Billion</h6>
                    <p className='fs-11 m-0'>Total Population</p>
                </div>
                <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                    <h6 className='fs-14'>800 Million</h6>
                    <p className='fs-11 m-0'>Households</p>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center py-2'>
                <div className='d-flex justify-content-start ms-2'>
                    <h6 className='me-2 ms-1 fs-13'>EnMasses Thesis</h6>
                    <AiOutlineInfoCircle fontSize={20} color='#606060' />
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11 p-0 d-flex flex-column align-items-center justify-content-center text-start pb-2'>
                        <div className='tam-info p-2 d-flex flex-column justify-content-center'>
                            <h6 className='text-left fs-18'>$3 Trillion</h6>
                            <p className='fs-11 m-0'>Total Addressable Market</p>
                        </div>
                    </div>
                    <div className='col-sm-11 col-md-11 col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start' >
                        <h6 className='fs-14 insight-bar-green-color'>400 Thousand</h6>
                        <p className='fs-11 m-0'>Number of Entrepreneurial Households (EH)</p>
                    </div>
                    <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                        <h6 className='fs-14 insight-bar-green-color'>$7500</h6>
                        <p className='fs-11 m-0'>Median Annual EH Household Spend</p>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center py-2'>
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
            </div>
            <div className='d-flex flex-column justify-content-center py-2'>
                <div className='d-flex justify-content-start ms-2'>
                    <h6 className='me-2 ms-1 fs-13'>EH Income</h6>
                    <AiOutlineInfoCircle fontSize={20} color='#606060' />
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11 p-0 d-flex flex-column align-items-center justify-content-center text-start pb-2'>
                        <div className='tam-info p-2 d-flex flex-column justify-content-center'>
                            <h6 className='fs-14'>$7000</h6>
                            <p className='fs-11 m-0'>Median Annual EH Household Income</p>
                        </div>
                    </div>
                    <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                        <h6 className='fs-14'>$3000</h6>
                        <p className='fs-11 m-0'>Formal Sources</p>
                    </div>
                    <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                        <h6 className='fs-14'>$4000</h6>
                        <p className='fs-11 m-0'>Informal Sources</p>
                    </div>
                </div>
            </div>
            <button className='btn btn-dark rounded w-100 my-4 fs-12'>Explore more<PiArrowRightBold className='ms-2' /></button>
        </div>
    );
}

export default DistrictSidebar;
