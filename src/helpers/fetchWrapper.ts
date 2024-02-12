// External libraries
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

// Components
import { authState, errorState } from '../states';

// Utilities
import { APIS, RouteConstants } from '../constants';


function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();

    // Create an Axios instance with common headers
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Interceptor for adding authorization headers
    axiosInstance.interceptors.request.use(
        async (config: any) => {
            if (config.url.includes(APIS.USERS.SET_NEW_PASSWORD)) {
                config.headers['Authorization'] = '';
                return config;
            }
            const user = localStorage.getItem('user');
            if (user != null) {
                const token = JSON.parse(user)?.tokens?.access;
                const isTokenExpired = checkTokenExpiry(token);
                if (!isTokenExpired) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                } else {
                    try {
                        const data = await getRefreshToken();
                        const newAccessToken = data.access;
                        const updatedAuth = {
                            ...auth,
                            tokens: {
                                ...auth.tokens,
                                access: newAccessToken
                            }
                        };
                        setAuth(updatedAuth);
                        localStorage.setItem('user', JSON.stringify(updatedAuth));
                        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    } catch (error: any) {
                        localStorage.removeItem('user');
                        setAuth({});
                        navigate(RouteConstants.login);
                        throw error;
                    }
                }
                return config;
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    return {
        get: (url: string, params?: any) => axiosInstance.get(url, { params }).then(handleResponse),
        post: (url: string, data?: any) => axiosInstance.post(url, data).then(handleResponse),
        put: (url: string, data?: any) => axiosInstance.put(url, data).then(handleResponse),
        delete: (url: string) => axiosInstance.delete(url).then(handleResponse),
    };

    function handleResponse(response: AxiosResponse) {
        if (response.status !== 200) {
            if ([401, 403].includes(response.status) && auth?.token) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                localStorage.removeItem('user');
                setAuth(null);
            }
            const error = (response?.data?.message) || response?.statusText;
            return Promise.reject(error);
        }
        return response.data;
    };

    async function getRefreshToken() {
        const refresh = auth?.tokens?.refresh;
        const access = auth?.tokens?.access;
        const expiryDuration = 600000;
        const isExpired = checkTokenExpiry(refresh);
        if (isExpired) {
            localStorage.removeItem('user');
            setAuth(null);
            const error = { response: { data: { detail: 'Invalid refresh token' } } }
            throw error;
        } else {
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            };
            const response = await axios.post(APIS.USERS.GET_NEW_ACCESS_TOKEN, { refresh }, { headers });
            return handleResponse(response);
        }

    }

    function checkTokenExpiry(token: any) {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = tokenData.exp * 1000;
        const currentTime = Date.now();
        return currentTime >= expiryTime;
    }
}

export { useFetchWrapper };

