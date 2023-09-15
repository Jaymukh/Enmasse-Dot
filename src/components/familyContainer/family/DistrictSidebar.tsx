import React, {useState} from 'react';
import { countryData } from '../../../utils/constants/Constants';
import { PiArrowRightBold } from 'react-icons/pi';
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
        <div className='col-3 py-2 bg-white' style={{ height: '98%' }}>
            <div className='SideBar'>
                <h6 className='text-left my-3'>EnMasses Thesis</h6>
                <div className='SideBarContent'>
                    <div className='p-2'>
                        <div className='container'>
                            {/* Rest of the JSX content */}
                            {countryData.map((data, key) => (
                                <div className="card my-3" key={key}>
                                    <div className="container">
                                        <h6 className='text-left my-3'>{data.country}</h6>
                                        <div className='row'>
                                            {/* Rest of the JSX content */}
                                        </div>
                                    </div>
                                    <button className='border-top rounded-0 explore-country-btn'>{data.button}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className='btn btn-dark rounded w-100'>Explore more<PiArrowRightBold className='ms-4' /></button>
                </div>
            </div>
        </div>
    );
}

export default DistrictSidebar;