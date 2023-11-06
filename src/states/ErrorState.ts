import { atom } from 'recoil';

export interface ErrorStateProps {
    type: 'error' | 'success' | 'warning';
    message: string;
}

const errorState = atom({
    key: 'error',
    default: {} as ErrorStateProps,
});

export { errorState };