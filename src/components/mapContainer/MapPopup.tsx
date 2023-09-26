import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface MapPopupProps {
    properties: {
        image: string;
        family: string;
        annualSpend: number;
    };
    handleFocused: (index: number) => void;
    index: number;
}

const MapPopup: React.FC<MapPopupProps> = ({ properties, handleFocused, index }) => {
    const navigate = useNavigate();

    const handlePopupClick = () => {
        navigate(RouteConstants.stories);
    };

    return (
        <div className="map-popup map-popup-grey-text rounded row h-100" onClick={() => handleFocused(index)}>
            <div className="col-5 px-0">
                <img className="map-popup-story-img rounded" src={properties.image} alt="Story" />
            </div>
            <div className="col-7 px-0 d-flex flex-column justify-content-start">
                <p className="map-popup-description text-start my-0">{properties.family}</p>
                <p className="map-popup-description text-start my-0">
                    <span className="green-text pe-1">{properties.annualSpend} </span>
                    Annual Spend on Core Solutions
                </p>
                <Button
                    theme={ButtonTheme.success}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    onClick={handlePopupClick}
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
