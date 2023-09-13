import { atom } from  'recoil';

const apiErrorState = atom({
    key: "apiError",
    default: "",
});

export { apiErrorState };
