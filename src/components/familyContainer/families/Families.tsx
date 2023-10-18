import React from 'react';
import FamiliesSidePanel from './FamiliesSidePanel';
import FamiliesDetailsContainer from './FamiliesDetailsContainer';

interface FamiliesProps {
    handleFamilyVisible: (data: any, index: number) => void;
}

const Families: React.FC<FamiliesProps> = ({ handleFamilyVisible }) => {
    return (
        <div className='row w-100' style={{ height: '86.25vh' }}>
            <FamiliesSidePanel />
            <FamiliesDetailsContainer handleFamilyVisible={handleFamilyVisible} />
        </div>
    );
}

export default Families;
