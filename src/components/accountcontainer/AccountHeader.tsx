import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const AccountHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="col-12 w-100 bg-white mx-0 ps-6 border-bottom z-index-0" style={{height: '6vh'}}>
            <button className='btn btn-white m-0 d-flex justify-content-start align-items-center border-0' onClick={() => navigate(-1)}>
                <BiArrowBack className='me-2 mb-1 text-dark' fontSize={20} />
                Back
            </button>
        </div>
    );
}

export default AccountHeader;
