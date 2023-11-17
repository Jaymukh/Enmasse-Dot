import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { storiesState, spinnerState } from "../states";
import { useSetRecoilState } from 'recoil';
// import { useRecoilState, useSetRecoilState } from "recoil";

const useStoriesService = () => {
    const setSpinner = useSetRecoilState(spinnerState);
    const setStories = useSetRecoilState(storiesState);
    const fetchWrapper = useFetchWrapper();

    // ?geo_code=11&page_no=1&storiespp=15
    //http://34.74.103.54/story/viewstory?geo-code=1&page-no=1&storiespp=10&sort-by=geo_value
    //'http://34.74.103.54/story/viewstory?geo-code=1&page-no=1&storiespp=10&sort-by=no_of_members&reverse=True'
    function getAllStories(paginationData: { geo_code: number, page_no: number, storiespp: number, sort_by?: string, reverse?: string }) {
        setSpinner(true);
        const queryString = Object.entries(paginationData)
            .map(([key, value]) => `${key.replaceAll('_', '-')}=${value}`)
            .join('&');
        const url = `${APIS.STORIES.GET_ALL_STORIES}?${queryString}`;
        return fetchWrapper.get(url)
            .then((response: any) => {
                if (response) {
                    setStories(response);
                    setSpinner(false);
                }
            });
    }

    return {
        getAllStories,
    }
}
export { useStoriesService };
