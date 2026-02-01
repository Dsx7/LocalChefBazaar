import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth';
import demoProfile from '../../assets/profile.png';
import {
    FaBars,
    FaTimes,
    FaAngleLeft,
    FaAngleRight,
    FaSignOutAlt,
} from 'react-icons/fa';
import Switch from '../theme-change-btn/Switch';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const { user, logOut, setThemeController } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    onClick={() => setSidebarOpen(false)}
                    className="border-2 border-transparent hover:border-[#442a00] dark:text-[#628141] duration-200 oswald"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/meals"
                    onClick={() => setSidebarOpen(false)}
                    className="border-2 border-transparent hover:border-2 hover:border-[#442a00] dark:text-[#628141] duration-200 oswald"
                >
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    onClick={() => setSidebarOpen(false)}
                    className="border-2 border-transparent hover:border-2 hover:border-[#442a00] dark:text-[#628141] duration-200 oswald"
                >
                    About Us
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    onClick={() => setSidebarOpen(false)}
                    className="border-2 border-transparent hover:border-2 hover:border-[#442a00] dark:text-[#628141] duration-200 oswald"
                >
                    Contact
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        onClick={() => setSidebarOpen(false)}
                        className="border-2 border-transparent hover:border-2 hover:border-[#442a00] dark:text-[#628141] duration-200 oswald"
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <header className="bg-primary sticky top-0 z-30 shadow-lg py-2">
                <div className="container mx-auto">
                    <div className="flex h-16 items-center justify-between px-4">

                        {/* Left: Logo + Hamburger (Mobile) */}
                        <div className="w-full lg:w-fit flex items-center gap-4 justify-between">

                            <Link to="/">
                                <Logo logoSize="w-[50px] lg:w-[70px]" mainTextSize="text-xl lg:text-2xl" subTextSize="text-sm lg:text-base" />
                            </Link>

                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-[#ff8400] lg:hidden cursor-pointer"
                            >
                                <FaBars size={26} />
                            </button>
                        </div>

                        {/* Center: Nav Links (Desktop only) */}
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 text-base xl:text-lg font-semibold space-x-10 text-[#442a00] oswald">
                                {navLinks}
                            </ul>
                        </div>

                        {/* Right: Profile / Login */}
                        <div className="flex items-center gap-4">
                            {user ? (
                                <div className="dropdown dropdown-end ml-2 navbar-end space-x-2 hidden md:flex">
                                    <div onClick={() => setIsOpen(false)} className="drop-menu dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost w-14 h-14 btn-circle avatar">
                                            <div className="bg-red-400 rounded-full">
                                                <img
                                                    alt="profile photo"
                                                    src={user.photoURL ? user?.photoURL : demoProfile}
                                                />
                                            </div>
                                        </div>
                                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-2 ">
                                            <div className='p-2 text-secondary'>
                                                <p className="font-semibold text-base dark:text-white">{user.displayName}</p>
                                                <p className=" text-sm dark:text-white">{user.email}</p>
                                            </div>
                                            <NavLink to="/dashboard" onClick={() => setOpen(false)} className=" border border-accent-content w-full flex justify-center items-center text-secondary text-left px-4 py-2 space-x-2 dark:text-white"> <FiUser className="text-lg text-primary dark:text-white" /> <span>My Profile</span></NavLink>
                                            <Switch />
                                            <button className='bg-orange-500 w-full cursor-pointer text-white text-sm px-5 py-2 rounded-full hover:bg-primary transition' onClick={logOut}>
                                                Log out
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                /* Added flex, items-center and gap to align Switch and Login button */
                                <div className="hidden lg:flex items-center gap-3 navbar-end">
                                    {/* Added Day/Night Toggle here */}
                                    <Switch />
                                    <Link className="btn shadow-none text-lg bg-[#ff8400] border-accent-content" to="/login" >Login</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header >

            {/* Sidebar */}
            < div
                className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64 bg-gradient-to-b from-primary to-accent-content
          fixed inset-y-0 left-0 z-50 transition-all duration-300
          lg:translate-x-0 lg:static lg:inset-auto flex flex-col lg:hidden
        `}
            >
                {/* Sidebar Header */}
                < div className="h-16 flex items-center justify-between px-5 bg-primary bg-opacity-20" >
                    <div className={`flex items-center text-white ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
                        {!sidebarCollapsed && user ? (
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL || demoProfile} alt="Profile" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium">{user.displayName || 'User'}</p>
                                    <p className="text-xs opacity-80">{user.email}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="lg:block">
                                <Link onClick={() => setSidebarOpen(false)} className="btn shadow-none text-lg bg-accent-content border-accent-content" to="/login" >Login</Link>
                            </div>
                        )}
                    </div>

                    {/* Collapse Button (Desktop) */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:block text-white hover:bg-white hover:bg-opacity-20 p-2 rounded"
                    >
                        {sidebarCollapsed ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
                    </button>

                    {/* Close Button (Mobile) */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-[#ff8400] cursor-pointer"
                    >
                        <FaTimes size={26} />
                    </button>
                </div >

                {/* Sidebar Menu */}
                < nav className="flex-1 mt-8 px-4 overflow-y-auto" >
                    <ul className="space-y-2 mt-2">
                        {navLinks}
                    </ul>
                    <div className='mt-4'>
                        <Switch />
                    </div>
                </nav >

                {/* Logout */}
                {
                    user && (
                        <div className="p-4 border-t border-white border-opacity-20">
                            <button
                                onClick={logOut}
                                className="flex items-center w-full text-[#442a00] hover:text-red-500 transition group"
                            >
                                <FaSignOutAlt size={22} />
                                <span className={`ml-4 font-medium ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                                    Logout
                                </span>
                                {sidebarCollapsed && (
                                    <span className="ml-4 hidden group-hover:inline-block absolute left-20 bg-gray-800 text-white text-sm px-3 py-1 rounded">
                                        Logout
                                    </span>
                                )}
                            </button>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default Navbar;