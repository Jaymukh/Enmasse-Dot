import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { getCurrencyWithSymbol } from '../../helpers';

interface MapPopupProps {
    properties: any;
    handleFocused: (index: number) => void;
    index: number;
}

const MapPopup: React.FC<MapPopupProps> = ({ properties, handleFocused, index }) => {
    const navigate = useNavigate();
    const handlePopupClick = (geo_id: number) => {
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo_code=${geo_id}&page_no=1&storiespp=2`,
        });
    };

    return (
        <div className="map-popup-grey-text rounded row h-100 w-100 d-flex justify-content-between p-1" onClick={() => handleFocused(index)}>
            <div className="col-4 px-0 d-flex justify-content-start">
                <img className="map-popup-story-img rounded" src={properties.image} alt={properties.familyName} />
            </div>
            <div className="col-8 px-0 d-flex flex-column justify-content-start">
                <p className="map-popup-description text-start my-0">
                    <span className="pe-1">{properties.familyDetails.familyMembers} </span>
                    Family members
                </p>
                <p className="map-popup-description text-start my-0">
                    <span className="green-text pe-1">{getCurrencyWithSymbol(properties.familyDetails.spendOnEducation, properties.familyDetails.spendOnEducationUOM)} </span>
                    Annual household spend on Education
                </p>
                <Button
                    theme={ButtonTheme.success}
                    size={ButtonSize.xsmall}
                    variant={ButtonVariant.transparent}
                    // onClick={() => handlePopupClick(properties.parentID)}
                    onClick={() => handlePopupClick(properties.parentId)}
                    classname='h-auto ps-0'
                >
                    Read more
                    <FiArrowRight className="ms-1" />
                </Button>
            </div>
        </div>
    );
};

export default MapPopup;
