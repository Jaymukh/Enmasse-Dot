const getCurrencyWithSymbol = (value: null | number | string, currency?: string | null) => {
    if (value) {
        if (currency) {
            const curr = [{ currency: 'USD', symbol: '$' }, { currency: 'INR', symbol: '₹' }];
            const selCurr = curr.find((item: any) => {
                return (item.currency === currency);
            });
            return selCurr?.symbol! + value.toString();
        }
        return value;
    }
    return '__';

}

export { getCurrencyWithSymbol }