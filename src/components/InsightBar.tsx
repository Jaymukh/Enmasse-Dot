import '../App.css';
import React, { useState } from 'react';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';
import { BiSolidChevronRightCircle , BiSolidChevronLeftCircle} from 'react-icons/bi';
import * as Constants from '../utils/constants/Constants';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../utils/constants/routeConstants';

export default function InsightBar() {
    const [visible, setVisible] = useState(true);
    var navigate = useNavigate();

    const onDialog = () => {
        setVisible(!visible);
    };

    const handleBtnPress = () => {
        navigate(RouteConstants.dashboards);
    }

    return (
        <div className={visible? 'sideBar-parent-expended' : 'sideBar-parent-collapsed'} >
            <button onClick={onDialog} className='btn-white SideBarIcon'>
                {visible ? <BiSolidChevronRightCircle size={35} /> : <BiSolidChevronLeftCircle size={35} />}
            </button>
            <div className='SideBar'>
                <h6 className='text-start my-3'>EnMasses Thesis</h6>
                <div className='SideBarContent'>
                    <div className='p-2'>
                        <div className='container'>                            
                            <div className="row align-items-center justify-content-center p-2 my-2 tam-info">
                                <div className='col-10 d-flex flex-column align-items-start py-2'>
                                    <h6 className='text-start tam-header'>$3 Trillion</h6>
                                    <p className='text-start fontSizeS m-0'>Total Addressable Market</p>
                                </div>
                                <div className='col-2'>
                                    <BiSolidInfoCircle size={25} />
                                </div>
                            </div>                            
                        </div>
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-2 card py-2' >
                                    <h6 className='text-start'>2 Billion</h6>
                                    <p className='text-start fontSizeS m-0'>Total Population</p>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6   my-2 card py-2'>
                                    <h6 className='text-start'>800 Million</h6>
                                    <p className='text-start fontSizeS m-0'>Households</p>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-2 card py-2'>
                                    <h6 className='text-start'>500 Million</h6>
                                    <p className='text-start fontSizeS m-0'>Entrepreneurial Households</p>
                                </div>
                                <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6  my-2 card py-2'>
                                    <h6 className='text-start'>7500 $</h6>
                                    <p className='text-start fontSizeS m-0'>Median Annual Household Income</p>
                                </div>
                            </div>
                        </div>
                        {Constants.countryData.map((data, key) => {
                            return (
                                <div className="card my-3">
                                    <div className="container">
                                        <h6 className='text-start my-3'>{data.country}</h6>
                                        <div className='row'>
                                            <div className="col-sm-12 col-md-12	col-lg-6 col-xl-6 pe-0" >
                                                <h5 className='text-start'>{data.population}</h5>
                                                <p className='text-start fontSizeXS'>Population</p>
                                            </div>
                                            <div className="col-sm-12 col-md-12	col-lg-6 col-xl-6 pe-0" >
                                                <h5 className='text-start'>{data.annualAverageIncome}</h5>
                                                <p className='text-start fontSizeXS'>Average Annual Income</p>
                                            </div>
                                            <div className="col-sm-12 col-md-12	col-lg-6 col-xl-6 pe-0" >
                                                <h5 className='text-start'>{data.entrepreneurialHouseholds}</h5>
                                                <p className='text-start fontSizeXS'>Enterpreneurial Households</p>
                                            </div>
                                            <div className="col-sm-12 col-md-12	col-lg-6 col-xl-6 pe-0" >
                                                <h5 className='text-start'>{data.totalAddressableMarket}</h5>
                                                <p className='text-start fontSizeXS'>Total Addressable Market</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='border-top rounded-0 explore-country-btn' >{data.button}</button>
                                </div>
                            );
                        })}
                    </div>
                    {/* <button className='btn btn-dark rounded w-100' onClick={() => handleDisplayDashboard(true)} >Explore more<FiArrowRight className='ms-2' /></button> */}
                    <button className='btn btn-dark rounded w-100' onClick={() => handleBtnPress()} >Explore more<FiArrowRight className='ms-2' /></button>
                </div>
            </div>
        </div>
    )
}