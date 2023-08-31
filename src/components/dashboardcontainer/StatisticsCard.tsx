import '../../App.css';

const StatisticsCard = ({ data, index }) => {
    return (
        <div className={`d-flex flex-column dashboard-col align-items-start justify-content-center ps-2 py-2 my-1 ${index < 4 ? 'white-bg' : 'bg-green-card'}`}>
            <h6 className={`fs-14 m-0 pb-1 ${index < 2 ? 'black-text' : index >= 4 ? 'white-text' : 'green-text'}`}>{data.value}</h6>
            <p className={`fs-11 m-0 text-start ${index < 4 ? 'grey-para' : 'white-text'}`}>{data.title}</p>
        </div>
    )
}

export default StatisticsCard;