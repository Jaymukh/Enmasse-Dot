import '../../App.css';
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
            <h6 className={`fs-14 m-0 pb-1 ${index === 4 ? 'white-text' : 'black-text'}`}>{data.value}</h6>
            <p className={`fs-11 m-0 text-start ${index === 4 ? 'white-text' : 'grey-para'}`}>{data.title}</p>
        </div>
    )
}

export default StatisticsCard;