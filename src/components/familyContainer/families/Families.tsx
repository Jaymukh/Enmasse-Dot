import React from 'react';
import FamiliesSidePanel from './FamiliesSidePanel';
import FamiliesDetailsContainer from './FamiliesDetailsContainer';

interface FamiliesProps {
    handleFamilyVisible: (index: number) => void;
}

const Families: React.FC<FamiliesProps> = ({ handleFamilyVisible }) => {
    return (
        <>
            <FamiliesSidePanel />
            <FamiliesDetailsContainer handleFamilyVisible={handleFamilyVisible} />
        </>
    );
}

export default Families;
