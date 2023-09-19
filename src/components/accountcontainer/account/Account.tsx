import React from 'react';
import SideBar from './SideBar';
import DetailsContainer from './detailscontainer/DetailsContainer';

interface AccountProps {
    handleVisiblePanel: (index: number) => void;
}

const Account: React.FC<AccountProps> = ({ handleVisiblePanel }) => {
    return (
        <>
            <SideBar handleVisiblePanel={handleVisiblePanel} />
            <DetailsContainer/>
        </>
    );
}

export default Account;
