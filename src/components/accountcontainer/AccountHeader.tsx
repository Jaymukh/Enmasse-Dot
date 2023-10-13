import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { RouteConstants } from '../../constants';

const AccountHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-100 d-flex align-items-center bg-white mx-0 ps-6 border-bottom z-index-0" style={{ height: '5.5vh' }}>
            <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={() => navigate(RouteConstants.root)}
                classname='m-0 h-auto'
            >
                <BiArrowBack className='me-2 mb-1' fontSize={22} />
                Back
            </Button>
        </div>
    );
}

export default AccountHeader;
