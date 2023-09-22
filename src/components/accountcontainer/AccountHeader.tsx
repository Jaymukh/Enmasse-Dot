import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

const AccountHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="col-12 d-flex align-items-center w-100 bg-white mx-0 ps-6 border-bottom z-index-0" style={{ height: '6vh' }}>
            <Button
                theme={ButtonTheme.secondary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={() => navigate(-1)}
                classname='m-0 h-auto'
            >
                <BiArrowBack className='me-2 mb-1 text-dark' />
                Back
            </Button>
        </div>
    );
}

export default AccountHeader;
