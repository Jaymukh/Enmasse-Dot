import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { storiesState } from "../states";
import {useSetRecoilState} from 'recoil';

const useStoriesService = () => {
    const setStories = useSetRecoilState(storiesState);
    const fetchWrapper = useFetchWrapper();

    // ?geo_code=11&page_no=1&storiespp=15
    function getAllStories(paginationData: any) {
        return fetchWrapper.get(`${APIS.STORIES.GET_ALL_STORIES}?geo_code=${paginationData.geoCode}&page_no=${paginationData.pageNumber}&storiespp=${paginationData.storiesPerPage}` )
        .then((response: any) => {  
            if (response) {
                setStories(response);
            }
        });
    }

    return {
        getAllStories
    }
}
export { useStoriesService };
