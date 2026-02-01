import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const { login, setSubmissionLoader } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleLogin = async (data) => {
        const { email, password } = data;
        try {
            setSubmissionLoader(true)
            await login(email, password)
            navigate("/")
            toast.success("Login successful")
            setSubmissionLoader(false)
        } catch (err) {
            setSubmissionLoader(false)
            if (err?.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Email or password is invalid")
            }
        }
    }

    // Role-based login handlers (unchanged logic)
    const handleAdmin = async () => {
        try {
            setSubmissionLoader(true)
            await login('admin@gmail.com', 'Admin@1234')
            navigate("/")
            toast.success("Login successful")
            setSubmissionLoader(false)
        } catch (err) {
            setSubmissionLoader(false)
            if (err?.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Email or password is invalid")
            }
        }
    }

    const handleChef = async () => {
        try {
            setSubmissionLoader(true)
            await login('chef1@gmail.com', 'Chef@1234')
            navigate("/")
            toast.success("Login successful")
            setSubmissionLoader(false)
        } catch (err) {
            setSubmissionLoader(false)
            if (err?.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Email or password is invalid")
            }
        }
    }

    const handleCustomer = async () => {
        try {
            setSubmissionLoader(true)
            await login('user@gmail.com', 'User@1234')
            navigate("/")
            toast.success("Login successful")
            setSubmissionLoader(false)
        } catch (err) {
            setSubmissionLoader(false)
            if (err?.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Email or password is invalid")
            }
        }
    }

    return (
        <>
            <title>Login | LocalChefBazaar</title>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                
                <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100 dark:border-gray-700">
                    
                    {/* Left Side - Visual */}
                    <div className="w-full md:w-1/2 relative hidden md:block">
                        <img 
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200" 
                            alt="Delicious Food" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#628141]/90 to-[#628141]/40 flex flex-col justify-end p-12 text-white">
                            <h1 className="text-5xl font-bold mb-4 berkshire-swash-regular drop-shadow-md">
                                Welcome Back!
                            </h1>
                            <p className="text-lg oswald font-light opacity-90 leading-relaxed">
                                Log in to discover the best homemade meals in your area. Your favorite flavors are just a click away.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        
                        <div className="text-center md:text-left mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#628141] mb-2 berkshire-swash-regular">
                                Login to Account
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Please enter your details to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                            
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FaEnvelope />
                                    </div>
                                    <input 
                                        type="email"
                                        placeholder="example@mail.com"
                                        className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all shadow-sm"
                                        {...register('email', {
                                            required: "Email is required", 
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email format"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                        Password
                                    </label>
                                    <button type="button" className="text-xs text-[#ff8400] hover:underline font-medium">
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FaLock />
                                    </div>
                                    <input 
                                        type={showPass ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all shadow-sm"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                                    >
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-red-500 text-xs ml-1">{errors.password.message}</span>}
                            </div>

                            {/* Main Login Button */}
                            <button 
                                type="submit"
                                className="w-full py-4 bg-[#628141] hover:bg-[#4f6b32] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                Login
                            </button>

                            {/* Divider */}
                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold tracking-widest">Quick Access</span>
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            </div>

                            {/* Quick Login Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                <button 
                                    type="button"
                                    onClick={handleAdmin}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <FaUserShield className="text-2xl text-gray-400 group-hover:text-[#628141] mb-1 transition-colors" />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Admin</span>
                                </button>

                                <button 
                                    type="button"
                                    onClick={handleChef}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <FaUserTie className="text-2xl text-gray-400 group-hover:text-[#628141] mb-1 transition-colors" />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Chef</span>
                                </button>

                                <button 
                                    type="button"
                                    onClick={handleCustomer}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <FaUser className="text-2xl text-gray-400 group-hover:text-[#628141] mb-1 transition-colors" />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">User</span>
                                </button>
                            </div>

                        </form>

                        <p className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <a href="/register" className="text-[#ff8400] font-bold hover:underline transition-colors">
                                Register Now
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;