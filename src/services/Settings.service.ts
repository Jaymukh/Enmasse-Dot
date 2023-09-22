import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { AllSettingsState } from "../states";
import {useSetRecoilState} from 'recoil';

const useSettingsService = () => {
    // all settings's data
    const setSettings = useSetRecoilState(AllSettingsState);
    const fetchWrapper = useFetchWrapper();

    function getAllSettings() {
        return fetchWrapper.get(APIS.SETTINGS.GET_ALL_SETTINGS)
        .then((response) => {
            if (response) {
                setSettings(response);
            }
        });
    }
    function getUserSettings() {
        return fetchWrapper.get(APIS.SETTINGS.GET_USER_SETTINGS);
    }

    return {
        getAllSettings,
        getUserSettings

    }
}

export { useSettingsService };