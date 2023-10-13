import React from 'react';
import SideBar from './SideBar';
import DetailsContainer from './detailscontainer/DetailsContainer';


const Account = () => {
    return (
        <div className='row' style={{height: '86.25vh'}}>
            <SideBar />
            <DetailsContainer  />
        </div >
    );
}

export default Account;
