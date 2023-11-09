/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import BarGraphContainer from './BarGraphContainer';
import BubbleGraph from './BubbleGraph';
import FamilyDetails from './FamilyDetails';
import LineGraph from './LineGraph';
import OverViewMap from './OverViewMap';
import ScatterGraph from './ScatterGraph';
import TableView from './TableView';
import { useSearchParams } from 'react-router-dom';
import { cifState } from '../../states';
import { useRecoilValue } from 'recoil';
import { useCIFService, useMapsService, useStoriesService } from '../../services';
import { TABLE_HEADERS } from '../../constants';


const DashBoard = () => {
    const cifService = useCIFService();
    const mapService = useMapsService();
    const storiesService = useStoriesService();
    const [searchParams] = useSearchParams();
    const cifData = useRecoilValue(cifState);
    const geoCode = searchParams.get('geo_code');

    useEffect(() => {
        if (geoCode) {
            cifService.getEHGrowthData(Number(geoCode));
            cifService.getGeoSpecificData(Number(geoCode));
            cifService.getInOutFlowData(Number(geoCode));
            cifService.getMetricBreakdownData(Number(geoCode));
            cifService.getCoreSolutionsGraphData(Number(geoCode));
            mapService.getCifData(Number(geoCode));
            storiesService.getAllStories({
                geo_code: Number(geoCode),
                page_no: 1,
                storiespp: 1
            });
        }
    }, [geoCode]);

    return (
        <div className='row w-100 primary-bg m-0 px-4 pb-5 mb-5' style={{ height: '100vh', overflow: 'auto' }}>
            <div className='col-12 p-0 my-2'>
                <FamilyDetails />
            </div>
            <div className='col-5 p-0 my-2'>
                <OverViewMap />
            </div>
            <div className='col-7 p-0 my-2 d-flex flex-column justify-content-between'>
                <LineGraph classname='mb-3' category='EH Growth' graphData={cifData?.ehGrowthGraphData?.ehGrowth} />
                <LineGraph category='Average EH Transactional Value' graphData={cifData?.ehGrowthGraphData?.averageEhTransactionalValue} />
            </div>
            <div className='col-5 p-0 my-2'>
                <BubbleGraph />
            </div>
            <div className='col-7 p-0 my-2'>
                <BarGraphContainer />
            </div>
            <div className='col-12 p-0 my-2'>
                <TableView headerData={TABLE_HEADERS.GEO_INFO_TABLE} data={cifData?.geoInfo} />
            </div>
            <div className='col-12 p-0 my-2'>
                <ScatterGraph />
            </div>
            <div className='col-12 p-0 my-2 mb-5 pb-5'>
                <TableView headerData={TABLE_HEADERS.METRIC_BREAKDOWN_TABLE} data={cifData?.metricBreakdownInfo} />
            </div>
        </div>
    )
}

export default DashBoard;