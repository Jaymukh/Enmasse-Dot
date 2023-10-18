import React, { useState } from 'react';
import FamilyHeader from './FamilyHeader';
import Families from './families/Families';
import Family from './family/Family';
import '../../App.css';
// import { families } from '../../utils/constants/Constants';
import { useStoriesService } from '../../services';
import { storiesState, spinnerState } from "../../states";
import { useRecoilState, useSetRecoilState } from "recoil";

function FamilyContainer() {
    const [selectedFamily, setSelectedFamily] = useState<number>(0);
    const [selectedData, setSelectedData] = useState<any | null>(null);
    //function to get all the stories
    const storiesService = useStoriesService();
    const [stories] = useRecoilState(storiesState);

    const handleFamilyVisible = (data: any, index: number) => {
        setSelectedFamily(index);
        setSelectedData(data);        
    };

    const handleBackClick = () => {
        setSelectedData(null);
    };

    const handleCarouselSlide = (selectedFamily: number) => {
        setSelectedFamily(selectedFamily);
        const data = stories?.family[selectedFamily];
        setSelectedData(data);
    };

    return (
        <div className="w-100 z-index-0  header2" style={{ height: '91.75vh', position: 'inherit' }}>
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
