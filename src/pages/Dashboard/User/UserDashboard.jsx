import React, { useState } from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink, Outlet } from 'react-router';
import {
    FaHome,
    FaUsers,
    FaShoppingCart,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaBell,
    FaSearch,
    FaBars,
    FaTimes,
    FaAngleLeft,
    FaAngleRight,
    FaClipboardList,
    FaRegUser,
    FaUser,
    FaStar,
    FaHeart
} from 'react-icons/fa';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import Switch from '../../../components/theme-change-btn/Switch';

function UserDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const { logOut } = useAuth()

    const menuItems = [
        { icon: FaHome, name: "Home", active: true, route: "/" },
        { icon: FaUser, name: "My Profile", active: true, route: "/dashboard" },
        { icon: FaShoppingCart, name: "My Orders", route: "my-orders" },
        { icon: FaStar, name: "My Reviews", route: "my-reviews" },
        { icon: FaHeart, name: "Favorite Meal", route: "favorite-meals" }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex h-screen bg-gray-100">

                {/* Sidebar */}
                <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} 
          w-64 bg-gradient-to-b from-primary to-accent-content
          fixed inset-y-0 left-0 z-50 transition-all duration-300 
          lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        `}>

                    {/* Logo + Toggle Button */}
                    <div className="h-16 flex items-center justify-between px-5 bg-primary bg-opacity-20">
                        <div className={`flex items-center text-white ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
                            {!sidebarCollapsed && <span className="ml-3 text-xl font-bold">
                                <Logo logoSize="w-[50px]" mainTextSize="text-lg" subTextSize="text-xs" />
                            </span>}
                        </div>

                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="hidden lg:block text-white hover:bg-[#546640]  hover:bg-opacity-20 p-2 rounded cursor-pointer"
                        >
                            {sidebarCollapsed ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
                        </button>

                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white cursor-pointer">
                            <FaTimes size={26} />
                        </button>
                    </div>

                    <nav className="flex-1 mt-8 px-3">
                        {menuItems.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.route}
                                end={item.route === "/dashboard"}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center px-3 py-3 my-1 rounded-lg text-[#442a00] dark:text-[#628141] hover:bg-primary hover:bg-opacity-20 transition-all border-2 border-transparent`}
                            >
                                <item.icon size={22} />
                                <span className={`ml-4 font-medium ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                                    {item.name}
                                </span>

                                {sidebarCollapsed && (
                                    <span className="ml-4 hidden group-hover:inline-block absolute left-20 bg-gray-800 text-white text-sm px-3 py-1 rounded">
                                        {item.name}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white border-opacity-20">
                        <button onClick={logOut} className="flex items-center text-[#442a00] dark:text-[#628141] hover:text-red-500 duration-300 group cursor-pointer">
                            <FaSignOutAlt size={22} />
                            <span className={`ml-4 font-medium ${sidebarCollapsed ? 'lg:hidden' : ''}`}>Logout</span>
                            {sidebarCollapsed && (
                                <span className="ml-4 hidden group-hover:inline-block absolute left-20 bg-gray-800 text-white text-sm px-3 py-1 rounded">
                                    Logout
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex-col overflow-hidden">

                    <header className="bg-primary shadow-sm h-16 flex items-center justify-between px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-600 lg:hidden cursor-pointer"
                        >
                            <FaBars size={26} />
                        </button>

                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                                <FaSearch className="text-gray-500" />
                                <input type="text" placeholder="Search..." className="bg-transparent outline-none ml-2 w-48 dark:text-gray-700" />
                            </div>
                            <Switch />
                            <button className="relative">
                                <FaBell size={24} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                A
                            </div>
                        </div>
                    </header>

                    <main className="h-[calc(100vh-theme('spacing.16'))] flex-1 overflow-y-auto bg-gradient-to-b from-accent to-gray-100 dark:to-[#363636]">
                        <div className="p-4 md:p-6">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;