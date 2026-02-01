import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://local-chef-bazaar-server-beta.vercel.app/',
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
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