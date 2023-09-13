import { useRecoilState } from 'recoil';
import { authState } from '../states';
import { APIS } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authState);

    // Create an Axios instance with common headers
    const axiosInstance = axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Interceptor for adding authorization headers
    axiosInstance.interceptors.request.use(
        (config) => {
            // Add Bearer token if user is logged in and token is not expired
            //const token = auth?.tokens?.access;
            const token = JSON.parse(localStorage.getItem('user'))?.tokens?.access;
            const isLoggedIn = !!token;
            const isTokenExpired = checkTokenExpired(token);
            if (isLoggedIn && !isTokenExpired) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } if (isLoggedIn && isTokenExpired) {
                try {
                    getRefreshToken().then(data => {
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
                        config.headers['Authorization'] =`Bearer ${newAccessToken}`;
                    });

                } catch (error) {
                    toast.error(error);
                    console.error('Error refreshing access token:', error);
                    // You can choose to log the user out or handle this error differently
                    return {};
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return {
        get: (url, params) => axiosInstance.get(url, { params }).then(handleResponse),
        post: (url, data) => axiosInstance.post(url, data).then(handleResponse),
        put: (url, data) => axiosInstance.put(url, data).then(handleResponse),
        delete: (url) => axiosInstance.delete(url).then(handleResponse),
    };

    function handleResponse(response) {
        if (response.statusText !== 'OK') {
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

    function checkTokenExpired(accessToken) {
        if (!accessToken) {
            // Token is missing; consider it expired.
            return true;
        }

        try {
            const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
            const expirationTime = tokenData.exp * 1000;
            const currentTime = Date.now();
            return currentTime >= expirationTime;
        } catch (error) {
            // Error parsing the token; consider it expired.
            return true;
        }
    }

    async function getRefreshToken() {
        const refresh = auth?.tokens?.refresh;
        const requestOptions = {
            'Content-Type': 'application/json',
            refresh
        };
        const response = await axios.post(APIS.USERS.GET_REFRESH_TOKEN, requestOptions);
        return handleResponse(response);
    }
}

export { useFetchWrapper };

