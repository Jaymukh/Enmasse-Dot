import { useRecoilValue } from 'recoil';
import { AllSettingsState } from '../states';
import { useSearchParams } from 'react-router-dom';

const useMapHelpers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
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
        return '--';
    };

    const getSelectedObject = () => {
        const params: any = {};
        searchParams?.toString().split('&').forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = Number(value);
        });
        return params;
    }

    return {
        getCurrencyWithSymbol,
        getSelectedObject,
    };
};

export { useMapHelpers };