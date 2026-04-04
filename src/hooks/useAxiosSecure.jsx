import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const axiosSecure = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "https://local-chef-bazaar-server-beta.vercel.app",
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error?.response?.status;
                const originalRequest = error?.config;

                if (status === 401 && user && !originalRequest?._retry) {
                    originalRequest._retry = true;
                    try {
                        const freshToken = await user.getIdToken(true);
                        if (freshToken) {
                            originalRequest.headers.Authorization = `Bearer ${freshToken}`;
                            return axiosSecure(originalRequest);
                        }
                    } catch {
                        // fall through to logout below
                    }
                }

                if ((status === 401 || status === 403) && user) {
                    try {
                        await logOut();
                    } catch {
                        // ignore logout errors
                    }
                    toast.error("Session expired. Please log in again.");
                    navigate("/login", { replace: true });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
