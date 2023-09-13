const initialGenerator = (value: string) => {
    if(value) {
        let initaial = value.split(' ');
        return initaial[0];
    } else {
        return '';
    }
}

export { initialGenerator };