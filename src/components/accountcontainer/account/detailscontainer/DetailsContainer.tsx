import React, {useEffect}  from 'react';
import Profile from './profile/Profile';
import Settings from './settings/Settings';
import Invite from './invite/Invite';
import { useUserService } from '../../../../services';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { visiblePanelState } from '../../../../states';

const DetailsContainer = () => {
    const visiblePanel = useRecoilValue(visiblePanelState);
    const userService = useUserService();
	useEffect(() => {
		userService.getUserDetails();
	}, []);
    return (
        <div className='col-9 h-100 z-index-0'>
            {visiblePanel === 0 ? <Profile /> : visiblePanel === 1 ? <Settings /> : <Invite />}
        </div>
    );
}

export default DetailsContainer;
