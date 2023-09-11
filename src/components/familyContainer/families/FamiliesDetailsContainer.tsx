import React from 'react';
import { families } from '../../../utils/constants/Constants';

interface FamiliesDetailsContainerProps {
    handleFamilyVisible: (index: number) => void;
}

const FamiliesDetailsContainer: React.FC<FamiliesDetailsContainerProps> = ({ handleFamilyVisible }) => {
    return (
        <div className='col-9 ps-2 mb-6 h-100' style={{ height: '98%' }}>
            <h5 className="text-start mt-4">Families in {families.place}</h5>
            <div className='w-100 h-100 mb-6' style={{ overflow: 'auto' }}>
                <div className='row mb-6' style={{ marginBottom: '5rem' }}>
                    {families.family.map((data, index) => (
                        <div className='col-4 family-card-container px-0' key={index}>
                            <div className="card m-2" onClick={() => handleFamilyVisible(index)}>
                                <img className="" style={{ width: '100% !important', height: '60% !important' }} src={data.properties.image} alt="Family image" />
                                <div className="card-body text-start">
                                    <h5 className="card-title text-left fs-18">{data.properties.familyName}</h5>
                                    <p className="card-text text-left fs-14">{data.properties.district}, {data.properties.state}, {data.properties.country}</p>
                                    {(data.properties.familyDetails) && <p className="card-text text-left">
                                        <b>{data.properties.familyDetails.familyMembers}</b> Family Members <br />
                                        <b className='text-success'>{data.properties.familyDetails.householdSpend} </b> Household Spend<br />
                                        <b>{data.properties.familyDetails.householdIncome}</b> Household Income
                                    </p>}
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
