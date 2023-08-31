import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
        <div className="row w-100 bg-white mx-0 mb-2 ps-6" >
            <button className='btn btn-white m-0 d-flex justify-content-start align-items-center border-0' onClick={selectedData ? handleBackClick : onNavigateBack}><ArrowBackIcon className='me-2 mb-1 color-black' />
                Back
            </button>
        </div>
    );
}

export default FamilyHeader;
