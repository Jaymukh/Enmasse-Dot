import React, { useEffect, useState } from 'react';
import FamilyHeader from './FamilyHeader';
import Families from './families/Families';
import Family from './family/Family';
import '../../styles/main.css';
import { storiesState } from "../../states";
import { useRecoilState } from "recoil";
import { useMapsService } from '../../services';

function FamilyContainer() {
    const mapServices = useMapsService();
    const [selectedFamily, setSelectedFamily] = useState<number>(0);
    const [selectedData, setSelectedData] = useState<any | null>(null);
    const [stories] = useRecoilState(storiesState);
    const [iterator, setIterator] = useState(1);

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
        if(iterator < stories?.family.length) {
            setIterator(iterator + 1);
        }
        if(selectedData == stories?.family[0]) {
            setIterator(1);
        }
    };

    useEffect(() => {
        if (selectedData?.geo_id) {
            mapServices?.getCifData(selectedData.geo_id);
        }
    }, [selectedData?.geo_id])

    return (
        <div className="w-100 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
            {/* <FamilyHeader
                selectedData={selectedData}
                handleBackClick={handleBackClick} />
            {selectedData && Object.keys(selectedData).length > 0 ?
                <Family
                    selectedFamily={selectedFamily}
                    selectedData={selectedData}
                    handleCarouselSlide={handleCarouselSlide}
                    handleBackClick={handleBackClick}
                    iterator={iterator}
                />
                : <Families
                    handleFamilyVisible={handleFamilyVisible}
                />} */}
        </div>
    );
}

export default FamilyContainer;
