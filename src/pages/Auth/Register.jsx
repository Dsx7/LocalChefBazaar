import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { imgUploader } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaImage, FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";

const Register = () => {
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm();
    const [preview, setPreview] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state || '/'

    const { createUser, updateUserProfile, setSubmissionLoader } = useAuth()

    const handleRegister = async (data) => {
        setSubmissionLoader(true)
        const { name, email, password, userPhoto, address } = data;
        const profileImg = userPhoto

        try {
            // This image uploader comes from utils js file
            if (profileImg) {
                const profileURL = await imgUploader(profileImg)
                const updatedData = {
                    displayName: name,
                    photoURL: profileURL
                }

                // Create User
                await createUser(email, password)

                // update user
                await updateUserProfile(updatedData)

                const usersCollection = {
                    userName: name,
                    userEmail: email,
                    userPhoto: profileURL,
                    userAddress: address
                }

                //Post user data in mongodb database
                const res = await axiosSecure.post("/users", usersCollection)
                if (res.data.insertedId) {
                    navigate(from, { replace: true })
                    toast.success('Signup Successful')
                    setSubmissionLoader(false)
                    return
                }
            }

            const updatedData = {
                displayName: name
            }

            // Create User
            await createUser(email, password)

            // update user
            await updateUserProfile(updatedData)

            const usersCollection = {
                userName: name,
                userEmail: email,
                userPhoto: "",
                userAddress: address
            }

            //Post user data in mongodb database
            const res = await axiosSecure.post("/users", usersCollection)
            if (res.data.insertedId) {
                navigate(from, { replace: true })
                toast.success('Signup Successful')
                setSubmissionLoader(false)
            }

        } catch (err) {
            setSubmissionLoader(false)
            toast.error(err?.message)
        }
    }

    return (
        <>
            <title>Register | LocalChefBazaar</title>
            <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

                {/* Top Banner */}
                <div className="w-full h-72 md:h-96 relative">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#628141]/90 to-black/30 flex items-center justify-center">
                        <div className="text-center px-4">
                            <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-md berkshire-swash-regular mb-2">
                                Join Our Community
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl oswald font-light tracking-wide">
                                Start your culinary journey with us today.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-20 md:-mt-24 pb-20 relative z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
                        
                        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                            {/* LEFT: Registration Form */}
                            <div className="lg:col-span-2 order-2 lg:order-1">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-[#628141] mb-2 berkshire-swash-regular">
                                        Create Account
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        Please fill in your details to register.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                                    
                                    {/* Name & Email Row */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide ml-1">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <FaUser />
                                                </div>
                                                <input 
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                                                    {...register('name', { required: "Name is required" })}
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                                        </div>

                                        {/* Email */}
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
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                                                    {...register('email', {
                                                        required: "Email is required", 
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide ml-1">
                                            Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="House no, Road no, Area, City"
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                                                {...register('address', { required: "Address is required" })}
                                            />
                                        </div>
                                        {errors.address && <p className="text-red-500 text-xs ml-1">{errors.address.message}</p>}
                                    </div>

                                    {/* Image Upload Input (Hidden visually, triggered via label or separate button if needed, but kept here for logic) */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide ml-1">
                                            Profile Photo
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <FaImage />
                                            </div>
                                            <input
                                                type="file"
                                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#628141]/10 file:text-[#628141] hover:file:bg-[#628141]/20 transition-all cursor-pointer"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setPreview(URL.createObjectURL(file));
                                                        setValue("userPhoto", file);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Passwords Row */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Password */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide ml-1">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <FaLock />
                                                </div>
                                                <input
                                                    type={showPass ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                                                    {...register("password", {
                                                        required: "Password is required",
                                                        minLength: { value: 8, message: "Min 8 characters required" }
                                                    })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPass(!showPass)}
                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide ml-1">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <FaLock />
                                                </div>
                                                <input
                                                    type={showConfirmPass ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#628141] focus:border-transparent transition-all"
                                                    {...register("confirmPassword", {
                                                        required: "Please confirm password",
                                                        validate: (val) => val === watch("password") || "Passwords do not match"
                                                    })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && <p className="text-red-500 text-xs ml-1">{errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>

                                    <button 
                                        className="w-full py-4 bg-[#628141] hover:bg-[#4f6b32] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 active:scale-95 mt-4"
                                    >
                                        Create Account
                                    </button>

                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-[#ff8400] font-bold hover:underline transition-colors">
                                            Login here
                                        </Link>
                                    </p>
                                </form>
                            </div>

                            {/* RIGHT: Profile Preview */}
                            <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
                                <div className="relative group">
                                    {/* Abstract Circle Background */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#628141] to-[#ff8400] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    
                                    <div className="relative w-48 h-48 rounded-full border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <FaCamera className="text-4xl mx-auto mb-2 opacity-50" />
                                                <span className="text-xs font-bold uppercase tracking-wide">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    <div className="absolute bottom-2 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md border border-gray-100 dark:border-gray-600 flex items-center gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${preview ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                                            {preview ? "Ready" : "Waiting"}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Profile Preview</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                                        Upload your photo to see how it will look on your profile dashboard.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;