import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';

const useMapsService = () => {
    const fetchWrapper = useFetchWrapper();

    const getDropdownList = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_DROPDOWN}?geo-code=${geoCode}`);
    }

    const getMaps = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_MAPS}?geo_code=${geoCode}`);
    }

    return {
        getDropdownList,
        getMaps,
    }
}

export { useMapsService };