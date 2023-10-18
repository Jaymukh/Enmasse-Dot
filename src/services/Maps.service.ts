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

    return {
        getDropdownList,
        getMaps,
        getCircle,
    }
}

export { useMapsService };