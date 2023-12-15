// Utilities
import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';

const useSettingsService = () => {
    const fetchWrapper = useFetchWrapper();

    const getAllSettings = () => {
        return fetchWrapper.get(APIS.SETTINGS.GET_ALL_SETTINGS);
    }

    const getUserSettings = () => {
        return fetchWrapper.get(APIS.SETTINGS.GET_USER_SETTINGS);
    }

    return {
        getAllSettings,
        getUserSettings,
    }
}

export { useSettingsService };