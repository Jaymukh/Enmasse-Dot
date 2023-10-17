import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../utils/lotties/lotties.json';

interface FamilyDetailsEmptyContainerProps {
    selectedData: any;
    handleBackClick: () => void;
}

const FamilyDetailsEmptyContainer: React.FC<FamilyDetailsEmptyContainerProps> = ({ selectedData, handleBackClick }) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div className='col-6 py-2' style={{ height: '98%', overflow: 'auto' }}>
            <div className='card fam-details-card white-bg mb-3 OneFamilySidePanelWidth my-4'>
                <div className='d-flex flex-row mx-2 p-3'>
                    <h5 className="card-title">{selectedData.properties.familyName}</h5>
                    <h6 className="card-title text-muted mx-2 my-1">{selectedData.address}</h6>
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center pt-0">
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                    <p className=" card-text OneFamilyCardText p-1 my-2 fs-20">Building conversations, capturing stories</p>
                    <button className='family-empty-btn fs-14' onClick={handleBackClick}>View all families</button>
                </div>
            </div>
        </div >
    )
}

export default FamilyDetailsEmptyContainer;
