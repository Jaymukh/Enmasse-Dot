/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';

// Components
import BarGraphContainer from './BarGraphContainer';
import BubbleGraph from './BubbleGraph';
import FamilyDetails from './FamilyDetails';
import LineGraph from './LineGraph';
import OverViewMap from './OverViewMap';
import ScatterGraph from './ScatterGraph';
import TableView from './TableView';
import { cifState, mapFeatureState, CoreSolutionByEH } from '../../states';

// Utilities
import { useCIFService, useMapsService, useStoriesService } from '../../services';
import { TABLE_HEADERS } from '../../constants';


const DashBoard = () => {
    const cifService = useCIFService();
    const mapService = useMapsService();
    const storiesService = useStoriesService();
    const [searchParams] = useSearchParams();
    const cifData = useRecoilValue(cifState);
    const mapFeatures = useRecoilValue(mapFeatureState);
    const geoCode = searchParams.get('geo_code');

    const [selected, setSelected] = useState<CoreSolutionByEH | undefined>(cifData?.coreSolutionsData?.coreSolutionsByEH![0] || []);

    const handleTabClick = (item: CoreSolutionByEH) => {
        setSelected(item);
    }

    useEffect(() => {
        if (cifData?.coreSolutionsData?.coreSolutionsByEH?.length > 0) {
            setSelected(cifData?.coreSolutionsData.coreSolutionsByEH[0]);
        }

    }, [cifData?.coreSolutionsData?.coreSolutionsByEH]);

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
        <div className='row w-100 primary-bg m-0 px-4 pb-5 mb-5' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0 my-2'>
                <FamilyDetails />
            </div>
            <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12 p-0 my-2'>
                <OverViewMap />
            </div>
            <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 p-0 my-2 d-flex flex-column justify-content-between'>
                <LineGraph classname='mb-3' category='EH Growth' graphData={cifData?.ehGrowthGraphData?.ehGrowth?.data} infobutton={cifData?.ehGrowthGraphData?.ehGrowth?.infobutton} />
                <LineGraph category='Average EH Transactional Value' graphData={cifData?.ehGrowthGraphData?.averageEhTransactionalValue?.data} infobutton={cifData?.ehGrowthGraphData?.averageEhTransactionalValue?.infobutton} />
            </div>
            <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12 p-0 my-2'>
                <BubbleGraph handleTabClick={handleTabClick}/>
            </div>
            <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 p-0 my-2'>
                <BarGraphContainer selected={selected} handleTabClick={handleTabClick} />
            </div>
            {(mapFeatures?.cifData?.properties?.geo_name !== 'district') &&
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0 my-2'>
                    <TableView headerData={TABLE_HEADERS.GEO_INFO_TABLE} data={cifData?.geoInfo?.data} infoButton={cifData?.geoInfo?.infoButton} breakdownType={cifData?.geoInfo?.breakdownType} classname='summary-breakdown-table-container' />
                </div>}
            <div className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0 my-2 ${(mapFeatures?.cifData?.properties?.geo_name === 'district' ? 'mb-5' : '')}`}>
                <ScatterGraph geoName={mapFeatures?.cifData?.properties?.geo_name} />
            </div>
            {(mapFeatures?.cifData?.properties?.geo_name !== 'district') &&
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0 my-2 mb-5 pb-5'>
                    <TableView headerData={TABLE_HEADERS.METRIC_BREAKDOWN_TABLE} data={cifData?.metricBreakdownInfo?.data} infoButton={cifData?.metricBreakdownInfo?.infoButton} breakdownType={cifData?.metricBreakdownInfo?.breakdownType} classname='dashboard-table-container' />
                </div>}
        </div>
    )
}

export default DashBoard;