import React from 'react';
import AdminProfile from './Admin/AdminProfile';
import ChefProfile from './Chef/ChefProfile';
import UserProfile from './User/UserProfile';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const FindProfile = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }



    const admin = 'admin';
    const chef = 'chef';
    const normal = 'user';
    const userRole = data?.userRole;

    if (userRole === admin) {
        return (
            <>
            <title>My Profile | LocalChefBazaar</title>
                <AdminProfile />
            </>
        )
    }
    if (userRole === chef) {
        return (
            <>
            <title>My Profile | LocalChefBazaar</title>
                <ChefProfile />
            </>
            
        )
    }
    if (userRole === normal) {
        return (
            <>
            <title>My Profile | LocalChefBazaar</title>
                <UserProfile />
            </>
            
        )
    }
};

export default FindProfile;