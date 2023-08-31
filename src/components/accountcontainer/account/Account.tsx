import React from 'react';
import SideBar from './SideBar';
import DetailsContainer from './detailscontainer/DetailsContainer';

interface AccountProps {
    handleVisiblePanel: (index: number) => void;
    visiblePanel: number;
}

const Account: React.FC<AccountProps> = ({ handleVisiblePanel, visiblePanel }) => {
    return (
        <>
            <SideBar handleVisiblePanel={handleVisiblePanel} visiblePanel={visiblePanel} />
            <DetailsContainer visiblePanel={visiblePanel}/>
        </>
    );
}

export default Account;
