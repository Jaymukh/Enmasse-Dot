import { atom } from 'recoil';

export interface LoggedUser {
    email_id: string;
    user_id: string;
    name: string;
    company: string;
    designation: string;
    country: string;
    company_type: string;
    phone_number: number;
    role: string;
    status: string;
}
export const usersState = atom({
    key: 'users',
    default: [] as LoggedUser[],
});

export const loggedUserState = atom({
    key: 'loggedUser',
    default: {} as LoggedUser
});