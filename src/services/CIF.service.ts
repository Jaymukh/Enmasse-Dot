import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { cifState } from "../states";
import { useSetRecoilState } from 'recoil';



const useCIFService = () => {
    const fetchWrapper = useFetchWrapper();
    const setDashboardData = useSetRecoilState(cifState);

    const getInOutFlowData = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.CIF.GET_INOUTFLOW_DATA}?geo-code=${geoCode}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                inOutFlowData: data
            }));
        }).catch(error => {
            console.log(error);
        });
    }

    const getEHGrowthData = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.CIF.GET_EH_GROWTH_DATA}?geo-code=${geoCode}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                ehGrowthGraphData: data
            }));
        }).catch(error => {
            console.log(error);
        });
    }

    const getMetricBreakdownData = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.CIF.GET_METRIC_BREAKDOWN}?geo-code=${geoCode}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                metricBreakdownInfo: data
            }));
        }).catch(error => {
            console.log(error);
        });
    }

    const getGeoSpecificData = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.CIF.GET_GEO_SPECIFIC_DATA}?geo-code=${geoCode}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                geoInfo: data
            }));
        }).catch(error => {
            console.log(error);
        });
    }

    const getCoreSolutionsGraphData = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.CIF.GET_CORE_SOLUTIONS_DATA}?geo-code=${geoCode}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                coreSolutionsData: data
            }));
        }).catch(error => {
            console.log(error);
        });
    }

    return {
        getInOutFlowData,
        getEHGrowthData,
        getMetricBreakdownData,
        getGeoSpecificData,
        getCoreSolutionsGraphData
    }
}

export { useCIFService };