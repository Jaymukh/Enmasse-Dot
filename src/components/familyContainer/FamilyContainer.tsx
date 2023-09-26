import React, { useState } from 'react';
import FamilyHeader from './FamilyHeader';
import Families from './families/Families';
import Family from './family/Family';
import '../../App.css';
import { families } from '../../utils/constants/Constants';

function FamilyContainer() {
    const [selectedFamily, setSelectedFamily] = useState<number>(0);
    const [selectedData, setSelectedData] = useState<any | null>(null);

    const handleFamilyVisible = (index: number) => {
        if (families && index >= 0) {
            setSelectedFamily(index);
            const data = families.family[index];
            setSelectedData(data);
        }
    };

    const handleBackClick = () => {
        setSelectedData(null);
    };

    const handleCarouselSlide = (selectedFamily: number) => {
        setSelectedFamily(selectedFamily);
        const data = families.family[selectedFamily];
        setSelectedData(data);
    };

    return (
        <div className="w-100 fixed-bottom m-0 border-top z-index-0" style={{ height: '88.5vh', position: 'inherit' }}>
            <FamilyHeader
                selectedData={selectedData}
                handleBackClick={handleBackClick} />
            {selectedData && Object.keys(selectedData).length > 0 ?
                <Family
                    selectedFamily={selectedFamily}
                    selectedData={selectedData}
                    handleCarouselSlide={handleCarouselSlide}
                    handleBackClick={handleBackClick}
                />
                : <Families
                    handleFamilyVisible={handleFamilyVisible}
                />}
        </div>
    );
}

export default FamilyContainer;
