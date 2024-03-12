import { BiRightArrowAlt } from "react-icons/bi";
// CSS
import '../../styles/main.css';
import { useMapHelpers } from '../../helpers';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { useState } from 'react';
import { Button, ButtonSize, ButtonTheme, ButtonVariant } from '../ui/button/Button';


interface HoverPopupProps {
    properties: any;
}

const HoverPopup: React.FC<HoverPopupProps> = ({ properties }) => {
    const { getCurrencyWithSymbol } = useMapHelpers();
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseEvent = (flag: boolean) => {
        setIsFocused(flag);
    }

    return (
        <div className="rounded row h-auto hover-popup-container pb-2" onMouseOver={() => handleMouseEvent(true)} onMouseOut={() => handleMouseEvent(false)}>
            <div className="d-flex m-0 p-0 col-12 flex-row align-items-center row">
                <Heading
                    title={properties?.Name}
                    // colour={isFocused ? TypographyColor.purple : TypographyColor.gray}
                    colour={TypographyColor.gray}
                    type={TypographyType.h5}
                    classname='m-0 p-0 text-start'
                />
                {/* <BiRightArrowAlt className={`col-2 p-0 m-0 text-end cursor-pointer rounded-circle ${isFocused ? 'bg-purple text-white' : ''}`} size={20} /> */}
            </div>
            <div className="d-flex flex-column p-0 m-0">
                <div className="d-flex m-0 p-0 col-12 flex-row align-items-center row">
                    <Heading
                        title='Number of EHs: '
                        colour={TypographyColor.gray}
                        type={TypographyType.h7}
                        classname='m-0 text-start col-7 p-0'
                    />
                    <Body
                        type={BodyType.p4}
                        color={BodyColor.secondary}
                        classname='text-end col-5 p-0 m-0'
                    >
                        {properties?.ehPopulation}
                    </Body>
                </div>
                <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-start align-items-center">
                    <Heading
                        title='Total CTV: '
                        colour={TypographyColor.gray}
                        type={TypographyType.h7}
                        classname='m-0 text-start col-5 p-0'
                    />
                    <Body
                        type={BodyType.p4}
                        color={BodyColor.secondary}
                        classname='text-end col-7 p-0 m-0'
                    >
                        {getCurrencyWithSymbol(properties?.TAM, properties?.tamUOM)}
                    </Body>
                </div>
                <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-start align-items-center">
                    <Heading
                        title='Total PoIs: '
                        colour={TypographyColor.gray}
                        type={TypographyType.h7}
                        classname='m-0 text-start col-7 p-0'
                    />
                    <Body
                        type={BodyType.p4}
                        color={BodyColor.secondary}
                        classname='text-end col-5 p-0 m-0'
                    >
                        {properties?.pointsOfInterest}
                    </Body>
                </div>
                <div className="d-flex cursor-pointer justify-content-start align-items-center m-0 p-0">
                    <Heading
                        title='Explore'
                        colour={TypographyColor.purple}
                        type={TypographyType.h7}
                        classname='m-0 text-start p-0'
                    />
                    <BiRightArrowAlt className='color-purple' />
                </div>
            </div>

        </div>
    );
};

export default HoverPopup;
