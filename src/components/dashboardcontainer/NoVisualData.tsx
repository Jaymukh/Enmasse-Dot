// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';

// Utilities
import WIPImage from '../../utils/images/WIP-FINAL.svg';

interface NoVisualDataProps {
    displayImage?: boolean;
    size?: string;
}

const NoVisualData: React.FC<NoVisualDataProps> = ({ displayImage, size }) => {
    return (
        <div className='h-100 w-100 d-flex justify-content-center'>
            <div className={`h-auto d-flex flex-column justify-content-center align-items-center py-3 ${size === 'large' ? 'w-100' : 'w-50'}`} style={{ minHeight: '9rem' }}>
                {displayImage && <img src={WIPImage} className="wip-img mb-3" alt="Work in progress" width="50%" />}
                <Heading
                    title='Work in progress.'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                />
                <Body
                    type={BodyType.p3}
                    color={BodyColor.muted}
                    classname='p-0 pt-2 m-0'>
                    Our team is actively developing these features for the upcoming updates.
                </Body>
                <Body
                    type={BodyType.p3}
                    color={BodyColor.muted}
                    classname='p-0 m-0'>
                    Keep an eye out for more information.
                </Body>
            </div>
        </div>
    )
}

export default NoVisualData;