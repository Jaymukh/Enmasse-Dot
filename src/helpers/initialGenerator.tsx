const initialGenerator = (value) => {
    if(value) {
        let initaial = value.split(' ');
        return initaial[0];
    } else {
        return '';
    }
}

export { initialGenerator };