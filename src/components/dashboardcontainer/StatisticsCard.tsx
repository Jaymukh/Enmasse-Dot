import '../../App.css';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
interface StatisticsCardProps {
    data: {
        value: string;
        title: string;
    };
    index: number;
}

const StatisticsCard = ({ data, index }: StatisticsCardProps) => {

    return (
        <div className={`d-flex flex-column dashboard-col align-items-start justify-content-center ps-2 py-2 my-1 ${index < 4 ? 'white-bg' : 'bg-green-card'}`}>
            <Heading
                title={data.value}
                colour={index === 4 ? TypographyColor.secondary : TypographyColor.dark}
                type={TypographyType.h5}
                classname='pb-1 m-0'
            />
            <p className={`fs-11 m-0 text-start ${index === 4 ? 'white-text' : 'grey-para'}`}>{data.title}</p>
        </div>
    )
}

export default StatisticsCard;