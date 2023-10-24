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

    const getFeaturedStories = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.STORIES.GET_FEATURED_STORIES}?geo-code=${geoCode}`)
    }

    const getCoreSolutions = () => {
        return fetchWrapper.get(APIS.MAPS.GET_CORE_SOLUTIONS);
    }

    return {
        getDropdownList,
        getMaps,
        getCircle,
        getCifData,
        getExploreNow,
        getFeaturedStories,
        getCoreSolutions,
    }
}

export { useMapsService };