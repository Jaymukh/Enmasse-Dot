/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, {useEffect}  from 'react';
import { useRecoilValue } from "recoil";

// Components
import Profile from './profile/Profile';
import Settings from './settings/Settings';
import Invite from './invite/Invite';
import { visiblePanelState } from '../../../../states';

// Utilities
import { useUserService } from '../../../../services';


const DetailsContainer = () => {
    const visiblePanel = useRecoilValue(visiblePanelState);
    const userService = useUserService();

	// useEffect(() => {
	// 	userService.getUserDetails();
	// }, []);

    return (
        <div className='col-9 h-100 z-index-0 pe-5'>
            {visiblePanel === '/profile' ? <Profile /> : visiblePanel === '/settings' ? <Settings /> : <Invite />}
        </div>
    );
}

export default DetailsContainer;
