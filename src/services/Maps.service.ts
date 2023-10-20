import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';

const useMapsService = () => {
    const fetchWrapper = useFetchWrapper();

    const getDropdownList = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_DROPDOWN}?geo-code=${geoCode}`);
    }

    const getMaps = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_MAPS}?geo-code=${geoCode}`);
    }

    const getCircle = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_CIRCLE}?geo-code=${geoCode}`);
    }

    const getCifData = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_CIF_DATA}?geo-code=${geoCode}`);
    }

    const getExploreNow = () => {
        return fetchWrapper.get(APIS.MAPS.GET_EXPLORE_NOW);
    }

    return {
        getDropdownList,
        getMaps,
        getCircle,
        getCifData,
        getExploreNow,
    }
}

export { useMapsService };