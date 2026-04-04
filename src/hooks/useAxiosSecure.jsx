import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const { user } = useAuth();

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


        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;
