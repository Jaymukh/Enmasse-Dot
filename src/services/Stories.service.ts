// External libraries
import { useSetRecoilState } from 'recoil';
// import { useRecoilState, useSetRecoilState } from "recoil";

// Components
import { storiesState, errorState } from "../states";

// Utilities
import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';


const useStoriesService = () => {
    const setStories = useSetRecoilState(storiesState);
    const setError = useSetRecoilState(errorState);
    const fetchWrapper = useFetchWrapper();

    function getAllStories(paginationData: { geo_code: number, page_no: number, storiespp: number, sort_by?: string, reverse?: string }) {
        const queryString = Object.entries(paginationData)
            .map(([key, value]) => `${key.replaceAll('_', '-')}=${value}`)
            .join('&');
        const currency = localStorage.getItem('currency');
        const url = `${APIS.STORIES.GET_ALL_STORIES}?${queryString}&currency=${currency}`;
        return fetchWrapper.get(url)
            .then((response: any) => {
                if (response) {
                    setStories(response);
                }
            }).catch(error => {
                const errorMsg = error?.response?.data?.detail || "Something went wrong. Please try again.";
                setError({ type: 'Error', message: errorMsg });
            });
    }

    return {
        getAllStories,
    }
}
export { useStoriesService };
