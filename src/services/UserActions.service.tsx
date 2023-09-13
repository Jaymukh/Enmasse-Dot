import { useSetRecoilState, useRecoilState } from 'recoil';
import { useFetchWrapper } from '../helpers';
import { authState, loggedUserState } from '../states';
import { useNavigate, useLocation } from 'react-router-dom';
import { APIS, RouteConstants } from '../constants';
import { toast } from "react-toastify";

const useUserService = () => {
    // const baseUrl = `${process.env.REACT_APP_BASE_API_URL}`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authState);
    const setLoggedUser = useSetRecoilState(loggedUserState);
    const navigate = useNavigate();
    const location = useLocation();

    const login = (data) => {
        return fetchWrapper.post(APIS.USERS.LOGIN, data)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);
                getUserDetails();
                // get return url from location state or default to home page
                const from = (!location.pathname || location.pathname === '/login') ? RouteConstants.root : location.pathname;
                if (user.is_first_login) {
                    acceptAgreement();
                    navigate(RouteConstants.update_password);
                } else {
                    navigate(from);
                }
            })
            .catch(error => toast.error(error));
    }

    const logout = () => {
        const refresh = auth?.tokens?.refresh;
        return fetchWrapper.post(APIS.USERS.LOGOUT, { refresh })
            .then(response => {
                // remove user from local storage, set auth state to null and redirect to login page
                localStorage.removeItem('user');
                setAuth({});
                navigate(RouteConstants.login);
            })
            .catch(error => toast.error(error));

    }

    const getAll = () => {
        return fetchWrapper.get(APIS.USERS.GET_ALL_USERS);
    };

    const getUserDetails = () => {
        return fetchWrapper.get(APIS.USERS.GET_LOGGED_USER).then(data => {
            setLoggedUser(data);
        })
        .catch(error => {
            console.log(error);
        });
    };
    const updateUserDetails = (updatedData) => {
        return fetchWrapper.put(APIS.USERS.UPDATE_LOGGED_USER, updatedData);
    }

    const setNewPassword = () => {
        return fetchWrapper.post(APIS.USERS.SET_NEW_PASSWORD);
    }

    const changePassword = (data) => {
        return fetchWrapper.put(APIS.USERS.CHANGE_PASSWORD, data);
    }

    const inviteNew = (newUser) => {
        return fetchWrapper.post(APIS.USERS.INVITE_NEW, newUser)
    }

    const editInvite = (updatedUser) => {
        return fetchWrapper.post(APIS.USERS.REINVITE, updatedUser)
    }

    const acceptAgreement = () => {
        return fetchWrapper.get(APIS.USERS.ACCEPT_AGREEMENT);
    }
    
    const deleteInvite = (user_id) => {
        const URL = APIS.USERS.DELETE_INVITE + user_id + '/delete/';
        return fetchWrapper.delete(URL);
    }

    return {
        login,
        logout,
        getAll,
        getUserDetails,
        updateUserDetails,
        changePassword,
        setNewPassword,
        inviteNew,
        editInvite,
        acceptAgreement,
        deleteInvite
    }
}

export { useUserService };