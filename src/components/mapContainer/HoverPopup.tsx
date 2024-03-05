// CSS
import '../../styles/main.css';
import { useMapHelpers } from '../../helpers';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';


interface HoverPopupProps {
    properties: any;
}

const HoverPopup: React.FC<HoverPopupProps> = ({ properties }) => {
    const { getCurrencyWithSymbol } = useMapHelpers();

    return (
        <div className="rounded row h-auto hover-popup-container pb-2" >
            <Heading
                title={properties?.Name}
                colour={TypographyColor.dark}
                type={TypographyType.h5}
                classname='m-0 p-0 col-12 text-start'
            />
            <div className="hover-popup-table d-flex flex-column p-0">
                <div className="d-flex m-0 p-0 col-12 flex-row px-1 pt-1 popup-border-bottom align-items-center row">
                    <Heading
                        title='Number of EHs '
                        colour={TypographyColor.dark}
                        type={TypographyType.h6}
                        classname='m-0 text-start col-7 p-0'
                    />
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='text-start col-5 p-0 m-0'
                    >
                        {properties?.ehPopulation}
                    </Body>
                </div>
                <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-start px-1 pt-1 popup-border-bottom align-items-center">
                    <Heading
                        title='Total CTV '
                        colour={TypographyColor.dark}
                        type={TypographyType.h6}
                        classname='m-0 text-start col-7 p-0'
                    />
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='text-start col-5 p-0 m-0'
                    >
                        {getCurrencyWithSymbol(properties?.TAM, properties?.tamUOM)}
                    </Body>
                </div>
                <div className="d-flex m-0 p-0 w-auto col-12 flex-row justify-content-start px-1 pt-1 align-items-center">
                    <Heading
                        title='Total PoIs '
                        colour={TypographyColor.dark}
                        type={TypographyType.h6}
                        classname='m-0 text-start col-7 p-0'
                    />
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='text-start col-5 p-0 m-0'
                    >
                        {properties?.pointsOfInterest}
                    </Body>
                </div>
            </div>

        </div>
    );
};

export default HoverPopup;
