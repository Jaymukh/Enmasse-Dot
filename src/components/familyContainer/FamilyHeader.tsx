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
        <div className="row w-100 bg-white mx-0 ps-6 border-bottom" >
            {/* <button className='btn btn-white m-0 d-flex justify-content-start align-items-center border-0 story-header-btn' onClick={selectedData ? handleBackClick : onNavigateBack}>
                <BiArrowBack className='me-2 mb-1 color-black' fontSize={22} />
                Back
            </button> */}
            <Button
                theme={ButtonTheme.secondary}
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
