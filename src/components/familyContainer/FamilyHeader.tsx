import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface FamilyHeaderProps {
    handleBackClick: () => void;
    selectedData: any; // Update the type based on your data structure
}

function FamilyHeader({ handleBackClick, selectedData }: FamilyHeaderProps) {
    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="w-100 d-flex align-items-center bg-white mx-0 ps-6 border-bottom z-index-0" style={{ height: '5.5vh' }}>
            <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={selectedData ? handleBackClick : onNavigateBack}
                classname='h-auto'
            >
                <BiArrowBack className='me-2 h-auto' fontSize={22} />
                Back
            </Button>
        </div>
    );
}

export default FamilyHeader;
