import React from 'react';
import Dashboard from './Dashboard';
import AdminDashboard from './Admin/AdminDashboard';
import ChefDashboard from './Chef/ChefDashboard';
import UserDashboard from './User/UserDashboard';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
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

    if (admin === userRole) {
        return (
            <>
            <title>Admin | LocalChefBazaar</title>
                <AdminDashboard />
                <Toaster />
            </>
        )
    }
    if (chef === userRole) {
        return (
            <>
            <title>Chef | LocalChefBazaar</title>
                <ChefDashboard />
                <Toaster />
            </>
        )
    }
    if (normal === userRole) {
        return (
            <>
            <title>User | LocalChefBazaar</title>
                <UserDashboard />
                <Toaster />
            </>
        )
    }
};

export default DashboardLayout;