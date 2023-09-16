import React from 'react';
import { families } from '../../../utils/constants/Constants';

interface FamiliesDetailsContainerProps {
    handleFamilyVisible: (index: number) => void;
}

const FamiliesDetailsContainer: React.FC<FamiliesDetailsContainerProps> = ({ handleFamilyVisible }) => {
    return (
        <div className='col-9 ps-2 mb-6 h-100' style={{ height: '98%' }}>
            <h5 className="text-start mt-4 fs-21">Families in {families.place}</h5>
            <div className='w-100 h-100 mb-6' style={{ overflow: 'auto' }}>
                <div className='row mb-6' style={{ marginBottom: '5rem' }}>
                    {families.family.map((data, index) => (
                        <div className='col-4 family-card-container px-0 cursor-pointer'>
                            <div className="card m-2" onClick={() => handleFamilyVisible(index)}>
                                <img className="" style={{ width: '100%', height: '60%', objectFit: 'cover' }} src={data.properties.image} alt="Family image" />
                                <div className="card-body text-start">
                                    <h5 className="card-title text-left fs-18">{data.properties.familyName}</h5>
                                    <p className="card-text text-left fs-14 my-2">{data.properties.district}, {data.properties.state}, {data.properties.country}</p>
                                    {(data.properties.familyDetails) &&
                                        <div>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text'>{data.properties.familyDetails.familyMembers}</span> Family Members</p>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text  color-green'>{data.properties.familyDetails.householdSpend}</span> Household Spend</p>
                                            <p className='mx-0 mb-1 fs-11'><span className='fs-14 me-1 bold-text'>{data.properties.familyDetails.householdIncome}</span> Household Income</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FamiliesDetailsContainer;
