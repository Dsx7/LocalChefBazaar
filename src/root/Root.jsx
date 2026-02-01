import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Footer from '../components/Footer/Footer';

const Root = () => {
    const { submissionLoader } = useAuth();
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    if (submissionLoader) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='overflow-x-hidden'>
                <main>
                    <Outlet />
                </main>
                <Footer />
                <Toaster />
            </div>
        </>
    );
};

export default Root;