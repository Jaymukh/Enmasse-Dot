import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { storiesState, spinnerState } from "../states";
import {useSetRecoilState} from 'recoil';
// import { useRecoilState, useSetRecoilState } from "recoil";

const useStoriesService = () => {
    const setSpinner = useSetRecoilState(spinnerState);
    const setStories = useSetRecoilState(storiesState);
    const fetchWrapper = useFetchWrapper();

    // ?geo_code=11&page_no=1&storiespp=15
    //http://34.74.103.54/story/viewstory?geo-code=1&page-no=1&storiespp=10&sort-by=geo_value
    function getAllStories(paginationData: any) {
        return fetchWrapper.get(`${APIS.STORIES.GET_ALL_STORIES}?geo-code=${paginationData.geoCode}&page-no=${paginationData.pageNumber}&storiespp=${paginationData.storiesPerPage}&sort-by=geo_value` )
        .then((response: any) => {  
            if (response) {
                setStories(response);
                setSpinner(false);
            }           
        });
    }

    return {
        getAllStories
    }
}
export { useStoriesService };
