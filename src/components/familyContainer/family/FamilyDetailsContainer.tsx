import React from 'react';

interface FamilyDetailsContainerProps {
    selectedData: any; // Update with appropriate type
}

const FamilyDetailsContainer: React.FC<FamilyDetailsContainerProps> = ({ selectedData }) => {
    return (
        <div className='col-6 py-2 my-3' style={{ height: '98%', overflow: 'auto' }}>
            <div className="card fam-details-card white-bg mb-3 OneFamilySidePanelWidth py-3">
                <div className='d-flex flex-row mx-2 px-2 pb-1'>
                    <h5 className="card-title fs-18">{selectedData.properties.familyName}</h5>
                    <h6 className="card-title text-muted mx-2 my-1 fs-14">{selectedData.properties.district}, {selectedData.properties.state}, {selectedData.properties.country}</h6>
                </div>
                <div className="container mx-2">
                    <div className="row">
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
                </div>
                <div className="card-body">
                    <img src={selectedData.properties.image} alt="" width="100%" height="auto" className='imgBorderRadious' />
                    <p className="card-text OneFamilyCardText p-1 my-2 text-start fs-12">{selectedData.properties.familyDetails.detail1}</p>
                    <div className='d-flex flex-row justify-content-around'>
                        <img src={selectedData.properties.image} alt="" width="50%" height="auto" className='imgBorderRadious me-1' />
                        <img src={selectedData.properties.image} alt="" width="50%" height="auto" className='imgBorderRadious' />
                    </div>
                    <p className="card-text OneFamilyCardText p-1 my-2 fs-12 text-start">{selectedData.properties.familyDetails.detail2}</p>
                </div>
            </div>
        </div>
    );
};

export default FamilyDetailsContainer;
