import React from 'react';
import FamilySidePanel from './FamilySidePanel';
import FamilyDetailsContainer from './FamilyDetailsContainer';
// import FamilyDetailsEmptyContainer from './FamilyDetailsEmptyContainer';
import DistrictSidebar from './DistrictSidebar';
import '../../../App.css';

interface FamilyProps {
    selectedFamily: number;
    handleCarouselSlide: (selectedFamily: number) => void;
    selectedData: any;
    handleBackClick: () => void;
    iterator: number;
}

function Family({ selectedFamily, selectedData, handleCarouselSlide, handleBackClick, iterator }: FamilyProps) {
    return (
        <div style={{ height: '86.25vh' }} className='row w-100 m-0'>
            <FamilySidePanel selectedFamily={selectedFamily} selectedData={selectedData} handleCarouselSlide={handleCarouselSlide} iterator={iterator} />
            <FamilyDetailsContainer selectedData={selectedData} />
            <div className='col-3 p-0 bg-white h-100'>
                <DistrictSidebar />
            </div>
        </div>
    );
}

export default Family;
