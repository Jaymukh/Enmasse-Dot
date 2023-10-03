import React from 'react';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';

interface FamilyDetailsContainerProps {
    selectedData: any; // Update with appropriate type
}

const FamilyDetailsContainer: React.FC<FamilyDetailsContainerProps> = ({ selectedData }) => {
    return (
        <div className='col-6 py-2 my-3' style={{ height: '98%', overflow: 'auto' }}>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='mb-5 mt-1 p-3'>
                <div className='d-flex flex-row pb-1'>
                    <Heading
                        title={selectedData.properties.familyName}
                        type={TypographyType.h3}
                        colour={TypographyColor.dark}
                    />
                    <h6 className="text-muted mx-2 my-1 fs-14">{selectedData.properties.district}, {selectedData.properties.state}, {selectedData.properties.country}</h6>
                </div>
                <div className="row my-2">
                    <div className="col-3 d-flex flex-row">
                        <b className="fs-14 me-1">{selectedData.properties.familyDetails.familyMembers}</b>
                        <p className="card-title text-muted mx-1 fs-12">Family members</p>
                    </div>
                    <div className="col-4 d-flex flex-row">
                        <b className="color-green fs-14 me-1">{selectedData.properties.familyDetails.householdSpend}</b>
                        <p className="card-title text-muted mx-1 fs-12">Household Spend</p>
                    </div>
                    <div className="col-4 d-flex flex-row">
                        <b className="fs-14 me-1">{selectedData.properties.familyDetails.householdIncome}</b>
                        <p className="card-title text-muted mx-1 fs-12">Household Income</p>
                    </div>
                </div>
                <div className="card-body">
                    <img src={selectedData.properties.image} alt="" width="100%" height="auto" className='imgBorderRadious my-2' />
                    <p className="my-2 text-start fs-12">{selectedData.properties.familyDetails.detail1}</p>
                    <div className='d-flex flex-row justify-content-around my-2'>
                        <img src={selectedData.properties.image} alt="" width="50%" height="auto" className='imgBorderRadious me-1' />
                        <img src={selectedData.properties.image} alt="" width="50%" height="auto" className='imgBorderRadious' />
                    </div>
                    <p className="my-2 fs-12 text-start">{selectedData.properties.familyDetails.detail2}</p>
                </div>
            </Card>
        </div>
    );
};

export default FamilyDetailsContainer;
