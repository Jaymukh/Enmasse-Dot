import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

const AccountHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="col-12 w-100 bg-white mx-0 ps-6 border-bottom z-index-0" style={{ height: '6vh' }}>
            <Button
                theme={ButtonTheme.secondary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={() => navigate(-1)}
                classname='d-flex justify-content-start align-items-center m-0'
            >
                <ArrowBackIcon className='me-2 mb-1 text-dark' />
                Back
            </Button>
        </div>
    );
}

export default AccountHeader;
