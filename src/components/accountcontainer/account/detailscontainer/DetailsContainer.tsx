import React, {useEffect}  from 'react';
import Profile from './profile/Profile';
import Settings from './settings/Settings';
import Invite from './invite/Invite';
import { useUserService } from '../../../../services';

interface DetailsContainerProps {
    visiblePanel: number;
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ visiblePanel }) => {
    const userService = useUserService();
	useEffect(() => {
		userService.getUserDetails();
	}, []);
    return (
        <div className='col-9 h-100'>
            {visiblePanel === 0 ? <Profile /> : visiblePanel === 1 ? <Settings /> : <Invite />}
        </div>
    );
}

export default DetailsContainer;
