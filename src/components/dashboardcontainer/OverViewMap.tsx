import StatisticsCard from "./StatisticsCard";
import { dashboardCardInfo } from '../../utils/constants/Constants';
import StaticMap from "../StaticMap";

const OverViewMap = () => {
    return (
        <div className="white-bg dashboard-col mx-4 p-3 h-100">
            <h5 className="pb-2 text-start fs-14">Overall Information</h5>
            <div className='row d-flex justify-content-between'>
                <div className="col-7 d-flex align-items-center justify-content-center static-map">
                    <StaticMap />
                </div>
                <div className='col-4 d-flex flex-column'>
                    {dashboardCardInfo.map((item, index) => <StatisticsCard data={item} index={index} />)}
                </div>
            </div>
        </div>
    )
}

export default OverViewMap;