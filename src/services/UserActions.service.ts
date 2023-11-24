import { useSetRecoilState, useRecoilState } from 'recoil';
import { generateHSL, initialGenerator, useFetchWrapper } from '../helpers';
import { authState, loggedUserState, usersState, spinnerState, overlayState, errorState } from '../states';
import { useNavigate, useLocation } from 'react-router-dom';
import { APIS, RouteConstants } from '../constants';

const useUserService = () => {
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authState);
    const setOverlay = useSetRecoilState(overlayState);
    const setLoggedUser = useSetRecoilState(loggedUserState);
    const setUsers = useSetRecoilState(usersState);
    const setSpinner = useSetRecoilState(spinnerState);
    const setError = useSetRecoilState(errorState);
    const navigate = useNavigate();
    const location = useLocation();

    const login = (data: any) => {
        setSpinner(true);
        return fetchWrapper.post(APIS.USERS.LOGIN, data)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);
                setSpinner(false);
                getUserDetails();
                // get return url from location state or default to home page
                const from = (!location.pathname || location.pathname === '/login') ? RouteConstants.explore : location.pathname;
                if (user.is_first_login) {
                    setOverlay(true);
                    acceptAgreement();                    
                }
                navigate({
                    pathname: from,
                    search: from === RouteConstants.root ? '?country=1' : '',
                });
            })
            .catch(error => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
            });

    }

    const logout = () => {
        setSpinner(true);
        const refresh = auth?.tokens?.refresh;
        return fetchWrapper.post(APIS.USERS.LOGOUT, { refresh })
            .then(response => {
                // remove user from local storage, set auth state to null and redirect to login page
                localStorage.removeItem('user');
                setAuth({});
                setSpinner(false);
                navigate(RouteConstants.login);
            })
            .catch(error => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
            });

    }

    const getAll = () => {
        return fetchWrapper.get(APIS.USERS.GET_ALL_USERS).then(response => {
			setUsers(response);
			setSpinner(false);
		}).catch(error => {
			setSpinner(false);
			const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
			setError({ type: 'Error', message: errorMsg });
		})
    };

    const getUserDetails = () => {
        // setSpinner(true);
        return fetchWrapper.get(APIS.USERS.GET_LOGGED_USER).then(data => {
            const initial = initialGenerator(data.name);
            const userHSL = generateHSL(data.name);
            setLoggedUser({ ...data, initial: initial, userHSL: userHSL });
            // setSpinner(false);
        })
            .catch(error => {
                // setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
            });
    };
    
    const updateUserDetails = (updatedData: any) => {
        return fetchWrapper.put(APIS.USERS.UPDATE_LOGGED_USER, updatedData);
    }

    const updateUserImage = (image: any) => {
        return fetchWrapper.put(APIS.USERS.UPDATE_IMAGE, image);
    }

    const setNewPassword = (data: any) => {
        return fetchWrapper.post(APIS.USERS.SET_NEW_PASSWORD, data);
    }

    const changePassword = (data: any) => {
        return fetchWrapper.put(APIS.USERS.CHANGE_PASSWORD, data);
    }

    const forgotPassword = (data: any) => {
        return fetchWrapper.post(APIS.USERS.FORGOT_PASSWORD, data);
    }

    const inviteNew = (newUser: any) => {
        return fetchWrapper.post(APIS.USERS.INVITE_NEW, newUser)
    }

    const editInvite = (updatedUser: any) => {
        return fetchWrapper.post(APIS.USERS.REINVITE, updatedUser)
    }

    const acceptAgreement = () => {
        return fetchWrapper.get(APIS.USERS.ACCEPT_AGREEMENT);
    }

    const deleteInvite = (user_id: string) => {
        const URL = APIS.USERS.DELETE_INVITE + user_id + '/delete/';
        return fetchWrapper.delete(URL);
    }

    return {
        login,
        logout,
        getAll,
        getUserDetails,
        updateUserDetails,
        updateUserImage,
        changePassword,
        forgotPassword,
        setNewPassword,
        inviteNew,
        editInvite,
        acceptAgreement,
        deleteInvite,
    }
}

export { useUserService };