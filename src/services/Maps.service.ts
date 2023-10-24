import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { mapFeatureState }  from "../states";
import {useSetRecoilState} from 'recoil';



const useMapsService = () => {
    const fetchWrapper = useFetchWrapper();
    const setCifData = useSetRecoilState(mapFeatureState);

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
        return fetchWrapper.get(`${APIS.MAPS.GET_CIF_DATA}?geo-code=${geoCode}`)
        .then((response) => {
            if (response) {
                setCifData(response);
            }
        });
    }

    const getExploreNow = () => {
        return fetchWrapper.get(APIS.MAPS.GET_EXPLORE_NOW);
    }
    const getFeaturedStories = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.STORIES.GET_FEATURED_STORIES}?geo-code=${geoCode}`)
    }

    return {
        getDropdownList,
        getMaps,
        getCircle,
        getCifData,
        getExploreNow,
        getFeaturedStories,
    }
}

export { useMapsService };