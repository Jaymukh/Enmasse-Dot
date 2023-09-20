import React, {useEffect} from 'react';
import AccountHeader from './AccountHeader';
import Account from './account/Account';
import { useUserService } from '../../services';

interface AccountContainerProps {
    handleVisiblePanel: (index: number) => void;
}

const AccountContainer: React.FC<AccountContainerProps> = ({ handleVisiblePanel }) => {
    const userService = useUserService();
	useEffect(() => {
		userService.getUserDetails();
	}, []);
    return (
        <div className="row w-100 h-90 fixed-bottom m-0 border-top" style={{ height: '90vh' }}>
            <AccountHeader />
            <Account handleVisiblePanel={handleVisiblePanel} />
        </div>
    );
}

export default AccountContainer;
