import '../App.css';
import React, { useState } from 'react';
import * as Constants from '../utils/constants/Constants';
import { useNavigate } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
    const [visible, setVisible] = useState(true);
    const [currency, setCurrency] = useState("US Dollar");
    var navigate = useNavigate();

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }

    return (
        <div className='sideBar-parent-expended py-4 me-3 px-0' style={{overflow: 'auto', overflowX: 'hidden'}} >
            <div className='d-flex justify-content-between align-items-start px-3'>
                <div className='d-flex justify-content-start'>
                    <h6 className='me-2 ms-1 fs-18'>EnMasses Thesis</h6>
                    <AiOutlineInfoCircle fontSize={20} color='#606060' />
                </div>
                <select className='currency-select-box px-2 py-1 fs-11' value={currency} onChange={handleChangeCurrency}>
                    {options.map((option, key) => <option key={key} value={option.currency}>{option.currency} {option.symbol}</option>)}
                </select>
            </div>
            {Constants.countryData.map((data, key) => (
                <>
                    <h6 className='fs-16 text-start px-3 my-1 ms-1'>{data.country}</h6>
                    <div className="row d-flex justify-content-center py-2">
                        <div className='col-sm-11 col-md-11 col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start' >
                            <h6 className='fs-14'>{data.households}</h6>
                            <p className='fs-11 m-0'>Total Households</p>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                            <h6 className='fs-14'>{data.population}</h6>
                            <p className='fs-11 m-0'>Total Population</p>
                        </div>
                        <div className='col-11 p-0 d-flex flex-column align-items-center justify-content-center text-start py-2'>
                            <div className='tam-info-grey p-2 d-flex flex-column justify-content-center'>
                                <h6 className='text-left fs-18'>{data.tam}</h6>
                                <p className='fs-11 m-0'>Total Addressable Market</p>
                            </div>
                        </div>
                        <div className='col-sm-11 col-md-11 col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start' >
                            <h6 className='fs-14 insight-bar-green-color'>{data.entrepreneurialHouseholds}</h6>
                            <p className='fs-11 m-0'>Number of Entrepreneurial Households (EH)</p>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-5 col-xl-5 mx-2 my-2 card py-2 d-flex align-items-start text-start'>
                            <h6 className='fs-14 insight-bar-green-color'>{data.medianSpendonCoreSoln}</h6>
                            <p className='fs-11 m-0'>Median Annual EH Household Spend</p>
                        </div>
                    </div>
                </>))
            }
        </div>
    )
}