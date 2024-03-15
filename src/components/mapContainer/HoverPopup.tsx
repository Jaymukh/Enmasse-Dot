/* eslint-disable @typescript-eslint/no-unused-vars */
import { BiRightArrowAlt } from "react-icons/bi";
// CSS
import '../../styles/main.css';
import { useMapHelpers } from '../../helpers';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface HoverPopupProps {
    properties: any;
    onClickMapFeature: any;
}

const HoverPopup: React.FC<HoverPopupProps> = ({ properties, onClickMapFeature }) => {
    const { getCurrencyWithSymbol } = useMapHelpers();
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseEvent = (flag: boolean) => {
        setIsFocused(flag);
    }

    return (
        <div className="rounded row h-auto hover-popup-container" onMouseOver={() => handleMouseEvent(true)} onMouseOut={() => handleMouseEvent(false)}>
            <div className="d-flex m-0 p-0 col-12 flex-row align-items-center row">
                <Heading
                    title={properties?.Name}
                    // colour={isFocused ? TypographyColor.purple : TypographyColor.gray}
                    colour={TypographyColor.gray}
                    type={TypographyType.h6}
                    classname='m-0 p-0 text-start'
                />
                {/* <BiRightArrowAlt className={`col-2 p-0 m-0 text-end cursor-pointer rounded-circle ${isFocused ? 'bg-purple text-white' : ''}`} size={20} /> */}
            </div>
            <div className="d-flex flex-column p-0 m-0">
                <div className="d-flex m-0 p-0 col-12 flex-row align-items-center row">
                    <Heading
                        title='No. of EHs: '
                        colour={TypographyColor.gray}
                        type={TypographyType.h7}
                        classname='m-0 text-start col-6 p-0'
                    />
                    <Body
                        type={BodyType.p4}
                        color={BodyColor.secondary}
                        classname='text-end col-6 p-0 m-0'
                    >
                        {properties?.ehPopulation}
                    </Body>
                </div>
                <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-start align-items-center">
                    <Heading
                        title='CTV: '
                        colour={TypographyColor.gray}
                        type={TypographyType.h7}
                        classname='m-0 text-start col-3 p-0'
                    />
                    <Body
                        type={BodyType.p4}
                        color={BodyColor.secondary}
                        classname='text-end col-9 p-0 m-0'
                    >
                        {getCurrencyWithSymbol(properties?.TAM, properties?.tamUOM)}
                    </Body>
                </div>
                <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-start align-items-center">
                    <Heading
                        title='POIs: '
                        colour={TypographyColor.gray}
                        type={TypographyType.h7}
                        classname='m-0 text-start col-3 p-0'
                    />
                    <Body
                        type={BodyType.p4}
                        color={BodyColor.secondary}
                        classname='text-end col-9 p-0 m-0'
                    >
                        {properties?.pointsOfInterest}
                    </Body>
                </div>
                {/* <div className="d-flex cursor-pointer justify-content-start align-items-center" onClick={() => onClickMapFeature(properties)}>
                    <Heading
                        title='Explore'
                        colour={TypographyColor.purple}
                        type={TypographyType.h7}
                        classname='m-0 text-start p-0'
                    />
                    <BiRightArrowAlt className='color-purple' />
                </div> */}
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    onClick={() => onClickMapFeature(properties)}
                    classname='h-auto padding-left-0'
                >
                    Explore
                    <FiArrowRight className="margin-left-1" />
                </Button>
            </div>

        </div>
    );
};

export default HoverPopup;
