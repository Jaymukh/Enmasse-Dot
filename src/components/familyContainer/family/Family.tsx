import React from 'react';
import FamilySidePanel from './FamilySidePanel';
import FamilyDetailsContainer from './FamilyDetailsContainer';
import FamilyDetailsEmptyContainer from './FamilyDetailsEmptyContainer';
import DistrictSidebar from './DistrictSidebar';
import '../../../App.css';

interface FamilyProps {
    selectedFamily: number;
    handleCarouselSlide: (selectedFamily: number) => void;
    selectedData: any;
    handleBackClick: () => void;
}

function Family({ selectedFamily, selectedData, handleCarouselSlide, handleBackClick }: FamilyProps) {
    return (
        <div style={{ height: '82.5vh' }} className='row w-100'>
            <FamilySidePanel selectedFamily={selectedFamily} handleCarouselSlide={handleCarouselSlide} />

            {selectedData.properties.familyDetails.familyMembers ?
                <FamilyDetailsContainer selectedData={selectedData} /> :
                <FamilyDetailsEmptyContainer selectedData={selectedData} handleBackClick={handleBackClick} />
            }

            <div className='col-3 py-4 bg-white' style={{ height: '100%', overflow: 'auto' }}>
                <DistrictSidebar  />
            </div>
        </div>
    );
}

export default Family;
