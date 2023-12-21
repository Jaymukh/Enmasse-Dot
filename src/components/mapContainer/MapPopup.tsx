// External libraries
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';

// Utilities
import { RouteConstants } from '../../constants';
import { useMapHelpers } from '../../helpers';
import familySkeleton from '../../utils/images/family-skeleton.png';


interface MapPopupProps {
    properties: any;
    handleFocused: (index: number) => void;
    index: number;
}

const MapPopup: React.FC<MapPopupProps> = ({ properties, handleFocused, index }) => {
    const navigate = useNavigate();
    const { getCoreSolutions } = useMapHelpers();

    const handlePopupClick = (geoIdArray: any[], geoHierarchyLevel: number) => {
        let geo_id = geoHierarchyLevel === 1 ? geoIdArray[1] : geoIdArray[0];
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo_code=${geo_id}&page_no=1&storiespp=2`,
        });
    };

    return (
        <div className="map-popup-grey-text rounded row h-100 w-100" onClick={() => handleFocused(index)}>
            <div className="col-4 px-0 img-box position-relative">
            <div className="image-placeholder w-100 h-100 position-absolute"></div>
                <img className="map-popup-story-img rounded" src={properties.image && properties.image.length > 0 ? properties.image : familySkeleton} alt={properties.familyName} />
            </div>
            <div className="col-8 px-0 d-flex flex-column justify-content-start ps-1">
                <Body
                    type={BodyType.p4}
                    color={BodyColor.secondary}
                    classname='map-popup-description text-start my-0'
                >
                    <span className="">{properties.familyDetails.familyMembers} </span>
                    Family members
                </Body>
                <Body
                    type={BodyType.p4}
                    color={BodyColor.secondary}
                    classname='map-popup-description text-start my-0'
                >
                    <span className="color-green">{getCoreSolutions(properties.familyDetails)?.value} </span>
                    Annual household spend on {getCoreSolutions(properties.familyDetails)?.name}
                </Body>
                <Button
                    theme={ButtonTheme.success}
                    size={ButtonSize.xsmall}
                    variant={ButtonVariant.transparent}
                    // onClick={() => handlePopupClick(properties.parentID)}
                    onClick={() => handlePopupClick(properties.parent_id, properties.geoHierarchyLevel)}
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
