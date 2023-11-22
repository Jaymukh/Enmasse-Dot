import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';
import { AllSettingsState, UserSettingsState, spinnerState } from "../states";
import {useSetRecoilState} from 'recoil';

const useSettingsService = () => {
    // all settings's data
    const setSettings = useSetRecoilState(AllSettingsState);
    const setUserSettings = useSetRecoilState(UserSettingsState);
    const setSpinner = useSetRecoilState(spinnerState);
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
        return fetchWrapper.get(APIS.SETTINGS.GET_USER_SETTINGS).then((response) => {
            if (response) {
                setUserSettings(response);
                // setSpinner(false);
            }
        }).catch(error => {
            // setSpinner(false);
        });
    }

    return {
        getAllSettings,
        getUserSettings
    }
}

export { useSettingsService };