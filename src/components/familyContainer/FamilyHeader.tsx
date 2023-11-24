import React from 'react';
import '../../styles/main.css';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { RouteConstants } from '../../constants';

function FamilyHeader() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const onNavigateBack = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        navigate({
            pathname: RouteConstants.stories,
            search: `?${currentParams.toString()}`,
        });
    }

    return (
        <div className="w-100 d-flex align-items-center bg-white mx-0 ps-6 border-bottom z-index-0" style={{ height: '5.5vh' }}>
            <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={onNavigateBack}
                classname='h-auto'
            >
                <BiArrowBack className='me-2 h-auto' fontSize={22} />
                Back
            </Button>
        </div>
    );
}

export default FamilyHeader;
