import '../../styles/main.css';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';

interface StatisticsCardProps {
    data: {
        value: string;
        title: string;
    };
    index: number;
}

const StatisticsCard = ({ data, index }: StatisticsCardProps) => {

    return (
        <div className={`d-flex flex-column align-items-start justify-content-center px-2 py-2 my-1 ${index < 4 ? 'white-bg dashboard-col' : 'bg-green dashboard-col-green'}`}>
            <Heading
                title={data.value}
                colour={index === 4 ? TypographyColor.secondary : TypographyColor.dark}
                type={TypographyType.h5}
                classname='pb-1 m-0 text-start'
            />
            <Body
                type={BodyType.p3}
                color={index === 4 ? BodyColor.white : BodyColor.muted}
                classname='m-0 text-start'>
                {data.title}
            </Body>
        </div>
    )
}

export default StatisticsCard;