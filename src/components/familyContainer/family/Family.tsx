import React from 'react';
import FamilySidePanel from './FamilySidePanel';
import FamilyDetailsContainer from './FamilyDetailsContainer';
import FamilyDetailsEmptyContainer from './FamilyDetailsEmptyContainer';
import DistrictSidebar from './DistrictSidebar';
import '../../../App.css';

interface FamilyProps {
    selectedFamily: number; // Update with appropriate type
    handleCarouselSlide: (selectedFamily: number) => void; // Update with appropriate type
    selectedData: any; // Update with appropriate type
}

function Family({ selectedFamily, handleCarouselSlide, selectedData }: FamilyProps) {
    return (
        <>
            <FamilySidePanel selectedFamily={selectedFamily} handleCarouselSlide={handleCarouselSlide} />

            {selectedData.properties.familyDetails ?
                <FamilyDetailsContainer selectedData={selectedData} /> :
                <FamilyDetailsEmptyContainer selectedData={selectedData}  />
            }

            <DistrictSidebar selectedData={selectedData} />
        </>
    );
}

export default Family;
