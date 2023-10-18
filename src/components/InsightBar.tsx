import '../App.css';
import '../styles/main.css';
import React, { useState } from 'react';
import * as Constants from '../utils/constants/Constants';
import { useNavigate } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Select, { SelectSize } from './ui/select/Select';

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
        <div className='sideBar-parent-expended py-4 px-0 z-index-1' style={{ overflow: 'auto', overflowX: 'hidden', position: 'inherit' }} >
            <div className='row d-flex justify-content-between align-items-start px-3'>
                <div className='col-6 d-flex justify-content-start'>
                    <h6 className='ms-1 fs-16'>EnMasses Thesis</h6>
                    {/* <AiOutlineInfoCircle fontSize={15} color='#606060' /> */}
                </div>
                <div className='col-5'>
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
            {Constants.countryData.map((data) => (
                <>
                    <h6 className='fs-16 text-start px-3 my-1 ms-1'>{data.country}</h6>
                    <div className="row d-flex justify-content-center py-2 mx-0 px-4">
                        <div className='row data-card px-3 d-flex flex-row mx-0 my-2'>
                            <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 border-end d-flex flex-column align-items-start text-start' >
                                <h6 className='fs-14'>{data.households}</h6>
                                <p className='fs-12 m-0'>Total Households</p>
                            </div>
                            <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 ps-3 d-flex flex-column align-items-start text-start'>
                                <h6 className='fs-14'>{data.population}</h6>
                                <p className='fs-12 m-0'>Total Population</p>
                            </div>
                        </div>
                        <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                            <div className='col-12 p-0 d-flex flex-column align-items-center justify-content-center text-start py-2 border-bottom'>
                                {/* <div className='tam-info-grey p-2 d-flex flex-column justify-content-center'> */}
                                <h6 className='text-left fs-18 m-0'>{data.tam}</h6>
                                <p className='fs-12 m-0'>Total Addressable Market</p>
                                {/* </div> */}
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start justify-content-center text-start border-end' >
                                <h6 className='fs-14 m-0'>{data.entrepreneurialHouseholds}</h6>
                                <p className='fs-12 m-0'>Number of Entrepreneurial Households (EH)</p>
                            </div>
                            <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start text-start'>
                                <h6 className='fs-14 m-0'>{data.medianSpendonCoreSoln}</h6>
                                <p className='fs-12 m-0'>Median Annual EH Household Spend</p>
                            </div>
                            
                        </div>
                    </div>
                </>))
            }
        </div>
    )
}