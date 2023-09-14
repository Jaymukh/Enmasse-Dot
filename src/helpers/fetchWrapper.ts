import { useRecoilState } from 'recoil';
import { authState } from '../states';
import { APIS } from '../constants';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// interface ResponseData {
//     message?: any;
//     data?: any;
//     access?: string;
// }

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authState);

    // Create an Axios instance with common headers
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Interceptor for adding authorization headers
    axiosInstance.interceptors.request.use(
        (config: any) => {
            // Add Bearer token if user is logged in and token is not expired
            //const token = auth?.tokens?.access;
            const user = localStorage.getItem('user');
            if (user != null) {
                const token = JSON.parse(user)?.tokens?.access;
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
                            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        });

                    } catch (error) {
                        toast.error(error as string);
                        // You can choose to log the user out or handle this error differently

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

    function checkTokenExpired(accessToken: any) {
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

