// import axios from 'axios';
// import React, { useEffect } from 'react';
// import useAuth from '../hooks/useAuth'

// const axiosSecure = axios.create({
//     baseURL: 'https://ghorerchef-server-api.vercel.app'
//     // baseURL: 'http://localhost:3000/'
// })

// const useAxiosSecure = () => {

//     const { user } = useAuth();
//     useEffect(() => {
//         axiosSecure.interceptors.request.use(config => {
//             config.headers.Authorization = `Bearer ${user?.accessToken}`
//             return config
//         })
//     }, [user])

//     return axiosSecure;
// };

// export default useAxiosSecure;

import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

// axios instance একবারই তৈরি হবে (outside hook)
const axiosSecure = axios.create({
   //  baseURL: 'https://ghorerchef-server-api.vercel.app',
    baseURL: 'http://localhost:3000/',
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        // প্রতিবার user চেঞ্জ হলে ইন্টারসেপ্টর আপডেট করো
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Cleanup: পুরানো ইন্টারসেপ্টর রিমুভ করো (duplicate প্রিভেন্ট)
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
        };
    }, [user]); // শুধু user চেঞ্জ হলে রান হবে

    return axiosSecure;
};

export default useAxiosSecure;