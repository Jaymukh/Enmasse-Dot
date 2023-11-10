import React from 'react';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import useMapHelpers from '../../../helpers/MapHelpers';

interface FamilyDetailsContainerProps {
    selectedData: any; // Update with appropriate type
}

const FamilyDetailsContainer: React.FC<FamilyDetailsContainerProps> = ({ selectedData }) => {
    const { getCurrencyWithSymbol } = useMapHelpers();
    return (
        <div className='col-6 py-2 my-3 no-scrollbar' style={{ height: '98%', overflow: 'auto' }}>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='mb-5 mt-1 p-3'>
                <div className='d-flex flex-row justify-content-between pb-1'>
                    <div className="d-flex flex-column justify-content-start text-start">
                        <Heading
                            title={selectedData.familyName}
                            type={TypographyType.h3}
                            colour={TypographyColor.dark}
                        />
                        <p className="card-text text-left fs-12">{selectedData.district}, {selectedData.state}, {selectedData.country}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-end text-end">
                        <span className='fs-14 me-1 bold-text color-green-0'>{getCurrencyWithSymbol(selectedData.familyDetails.householdSpend, selectedData.familyDetails.spendUOM)}</span>
                        <p className='mx-0 fs-10'>Annual Household Spend on Education</p>
                    </div> 
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                    {
                        selectedData.familyDetails.familyMembers &&
                        <div className="d-flex flex-row align-items-center">
                            <b className="fs-14 me-1">{selectedData.familyDetails.familyMembers}</b>
                            <p className="card-title text-muted fs-10">Family members</p>
                        </div>
                    } 
                    {
                        selectedData.familyDetails.householdSpend &&
                        <div className="d-flex flex-row align-items-center">
                            <b className="fs-14 me-1">{getCurrencyWithSymbol(selectedData.familyDetails.householdSpend, selectedData.familyDetails.spendUOM)}</b>
                            <p className="card-title text-muted fs-10">Household Spend</p>
                        </div>
                    }
                    {
                        selectedData.familyDetails.householdBorrowing &&
                        <div className="d-flex flex-row align-items-center">
                            <b className="fs-14 me-1">{getCurrencyWithSymbol(selectedData.familyDetails.householdBorrowing, selectedData.familyDetails.borrowUOM)}</b>
                            <p className="card-title text-muted fs-10">Household Borrowing</p>
                        </div>
                    }
                    {
                        selectedData.familyDetails.householdIncome &&
                        <div className="d-flex flex-row align-items-center">
                            <b className="fs-14 me-1">{getCurrencyWithSymbol(selectedData.familyDetails.householdIncome, selectedData.familyDetails.incomeUOM)}</b>
                            <p className="card-title text-muted fs-10">Household Income</p>
                        </div>
                    }
                </div>
                <div className="card-body">
                    {selectedData.image &&
                        <img src={selectedData.image} alt="Family" width="100%" height="auto" className='imgBorderRadious my-2' />
                    }
                    <p className="text-start fs-12">{selectedData.description}</p>
                    <div className='d-flex flex-row justify-content-around my-2'>
                        {selectedData.image &&
                            <img src={selectedData.image} alt="Family" width="50%" height="auto" className='imgBorderRadious me-1' />
                        }
                        {selectedData.image &&
                            <img src={selectedData.image} alt="Family" width="50%" height="auto" className='imgBorderRadious' />
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FamilyDetailsContainer;
