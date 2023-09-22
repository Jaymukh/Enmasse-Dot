import React from 'react';
import SideBar from './SideBar';
import DetailsContainer from './detailscontainer/DetailsContainer';

interface AccountProps {
    handleVisiblePanel: (index: number) => void;
}

const Account: React.FC<AccountProps> = ({ handleVisiblePanel }) => {
    return (
        <div className='row' style={{height: '82.5vh'}}>
            <SideBar handleVisiblePanel={handleVisiblePanel} />
            <DetailsContainer  />
        </div >
    );
}

export default Account;
