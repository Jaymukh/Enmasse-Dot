import { useRecoilValue } from 'recoil';
import { AllSettingsState } from '../states';

const useMapHelpers = () => {
    const settings = useRecoilValue(AllSettingsState);
    const currencies = settings.currencies;

    const getCurrencyWithSymbol = (value: null | number | string, currency?: string | null) => {
        if (value !== undefined && value !== null) {
            if (currency) {
                const selectedCurrency = currencies?.find(item => item.code === currency);
                return selectedCurrency?.symbol! + value.toString();
            }
            return value;
        }
        return '__';
    };

    return { getCurrencyWithSymbol };
};

export { useMapHelpers };