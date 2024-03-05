// CSS
import '../../styles/main.css';
import { useMapHelpers } from '../../helpers';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';


interface HoverPopupProps {
    properties: any;
}

const HoverPopup: React.FC<HoverPopupProps> = ({ properties }) => {
    const { getCoreSolutions, getNumberWithZero } = useMapHelpers();


    return (
        <div className="rounded row h-auto hover-popup-container" >
            <Heading
                title={properties?.Name}
                colour={TypographyColor.dark}
                type={TypographyType.h5}
                classname='m-0 p-0 pb-1 col-12'
            />
            <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-center">
                <Heading
                    title='TAM: '
                    colour={TypographyColor.dark}
                    type={TypographyType.h6}
                    classname='me-2 mb-0 text-start'
                />
                <Body
                    type={BodyType.p3}
                    color={BodyColor.dark}
                    classname='text-start'
                >
                    {properties?.TAM}
                </Body>
            </div>
            <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-center">
                <Heading
                    title='EH Population: '
                    colour={TypographyColor.dark}
                    type={TypographyType.h6}
                    classname='me-2 mb-0 text-start'
                />
                <Body
                    type={BodyType.p3}
                    color={BodyColor.dark}
                    classname='text-start'
                >
                    {properties?.ehPopulation}
                </Body>
            </div>
            <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-center">
                <Heading
                    title='POI: '
                    colour={TypographyColor.dark}
                    type={TypographyType.h6}
                    classname='me-2 mb-0 text-start'
                />
                <Body
                    type={BodyType.p3}
                    color={BodyColor.dark}
                    classname='text-start'
                >
                    {properties?.pointsOfInterest}
                </Body>
            </div>
        </div>
    );
};

export default HoverPopup;
