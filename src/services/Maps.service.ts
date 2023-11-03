import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { mapFeatureState, spinnerState } from "../states";
import { useRecoilState, useSetRecoilState } from 'recoil';



const useMapsService = () => {
    const fetchWrapper = useFetchWrapper();
    const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);
    const setSpinner = useSetRecoilState(spinnerState);

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
        setSpinner(true);
        return fetchWrapper.get(`${APIS.MAPS.GET_CIF_DATA}?geo-code=${geoCode}`)
            .then((response) => {
                setSpinner(false);
                if (response) {
                    setMapFeatures(prevMapFeatures => ({ ...prevMapFeatures, cifData: response }));
                }
            }).catch(error => {
                setSpinner(false);
            });
    }

    const getExploreNow = () => {
        return fetchWrapper.get(`${APIS.MAPS.GET_EXPLORE_NOW}?geo-code=1`);
    }

    const getFeaturedStories = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.STORIES.GET_FEATURED_STORIES}?geo-code=${geoCode}`)
    }

    const getCoreSolutions = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_CORE_SOLUTIONS}?geo-code=${geoCode}`);
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