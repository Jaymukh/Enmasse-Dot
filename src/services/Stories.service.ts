import { useFetchWrapper } from '../helpers';
import { APIS, rollbar } from '../constants';
import { storiesState, errorState } from "../states";
import { useSetRecoilState } from 'recoil';
// import { useRecoilState, useSetRecoilState } from "recoil";

const useStoriesService = () => {
    const setStories = useSetRecoilState(storiesState);
    const setError = useSetRecoilState(errorState);
    const fetchWrapper = useFetchWrapper();

    // ?geo_code=11&page_no=1&storiespp=15
    //http://34.74.103.54/story/viewstory?geo-code=1&page-no=1&storiespp=10&sort-by=geo_value
    //'http://34.74.103.54/story/viewstory?geo-code=1&page-no=1&storiespp=10&sort-by=no_of_members&reverse=True'
    function getAllStories(paginationData: { geo_code: number, page_no: number, storiespp: number, sort_by?: string, reverse?: string }) {
        const queryString = Object.entries(paginationData)
            .map(([key, value]) => `${key.replaceAll('_', '-')}=${value}`)
            .join('&');
        const url = `${APIS.STORIES.GET_ALL_STORIES}?${queryString}`;
        return fetchWrapper.get(url)
            .then((response: any) => {
                if (response) {
                    setStories(response);
                }
            }).catch(error => {
                const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
                setError({ type: 'Error', message: errorMsg });
                rollbar.error(error);
            });
    }

    return {
        getAllStories,
    }
}
export { useStoriesService };
