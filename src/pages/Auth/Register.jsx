import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { imgUploader } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
            // console.log(err)
            toast.error(err?.message)

        }
    }

    return (
        <>
        <title>Register | LocalChefBazaar</title>
            <div className="w-full min-h-screen bg-[#FCFCFC] dark:bg-[#1C1C1C]">

                {/* Top Banner */}
                <div className="w-full h-64 md:h-80 relative">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg berkshire-swash-regular">
                            Create Your Account
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto mt-[-80px] bg-white dark:bg-[#2A2A2A] rounded-xl shadow-xl p-8 md:p-10 relative z-10" data-aos="fade-up">

                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10">

                        {/* AMAR KITCHEN FORM SECTION */}
                        <div>
                            <h2 className="text-2xl font-semibold text-primary dark:text-gray-100 mb-4">
                                Registration Form
                            </h2>

                            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-300">Full Name
                                        <input type="text"
                                            placeholder="Your Name"
                                            className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                  bg-gray-50 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 focus:ring-2 
                                  focus:ring-[#FF6F61] outline-none"
                                            {...register('name', {
                                                required: "Name is required"
                                            })}
                                        />
                                    </label>
                                    {
                                        errors.name && <p className="text-red-500 text-red-500 text-xs mt-2">{errors.name.message}</p>
                                    }
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-300">
                                        Email
                                        <input
                                            type="email"
                                            placeholder="example@mail.com"
                                            className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                  bg-gray-50 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 focus:ring-2 
                                  focus:ring-[#FF6F61] outline-none"
                                            {...register("email", {
                                                required: "Email is required", pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Please enter a valid email address"
                                                }
                                            })}
                                        />
                                    </label>
                                    {
                                        errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
                                    }
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-300">Address
                                        <input
                                            type="text"
                                            placeholder="House/Road/City"
                                            className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                  bg-gray-50 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 focus:ring-2 
                                  focus:ring-[#FF6F61] outline-none"
                                            {...register('address', {
                                                required: "Address is required"
                                            })}
                                        />
                                    </label>
                                    {
                                        errors.address && <p className="text-red-500 text-xs mt-2">{errors.address.message}</p>
                                    }
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-300">
                                        Profile Image
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setPreview(URL.createObjectURL(file));
                                                    setValue("userPhoto", file);
                                                }
                                            }}
                                            className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                      bg-gray-50 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 focus:ring-2 
                                      focus:ring-[#FF6F61] outline-none"
                                        />
                                    </label>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-300">Password
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                      bg-gray-50 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 focus:ring-2 
                                      focus:ring-[#FF6F61] outline-none"
                                                {...register("password", {
                                                    required: "You need a strong password", minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters"
                                                    }
                                                })}
                                            />
                                            <span
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-300 cursor-pointer"
                                            >
                                                {showPass ? "Hide" : "Show"}
                                            </span>
                                        </div>
                                    </label>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Confirm */}
                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-300">Confirm Password
                                        <div className="relative">
                                            <input
                                                type={showConfirmPass ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                      bg-gray-50 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 focus:ring-2 
                                      focus:ring-[#FF6F61] outline-none"
                                                {...register("confirmPassword", {
                                                    required: "Please confirm your password",
                                                    validate: (value) =>
                                                        value === watch("password") || "Passwords do not match"
                                                })}
                                            />
                                            <span
                                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-300 cursor-pointer"
                                            >
                                                {showConfirmPass ? "Hide" : "Show"}
                                            </span>
                                        </div>
                                    </label>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-2">{errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <button className="w-full btn shadow-none border-none bg-primary text-white rounded-lg text-lg font-semibold transition">
                                    Register
                                </button>

                            </form>
                            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
                                Already have an account?
                                <Link to="/login" className="text-primary font-medium ml-1 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>

                        {/* MY PROFILE PREVIEW SECTION */}
                        <div className="flex flex-col items-center justify-center border border-accent-content rounded-xl p-4 bg-gray-50 dark:bg-[#1F1F1F]">
                            <h2 className="text-xl font-semibold text-primary dark:text-gray-100 mb-4">
                                Profile Preview
                            </h2>

                            {preview ? (
                                <img
                                    src={preview}
                                    className="w-40 h-40 object-cover rounded-full border-4 border-[#FF6F61]"
                                />
                            ) : (
                                <div className="w-40 h-40 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200">
                                    No Image
                                </div>
                            )}

                            <p className="mt-3 text-accent-content dark:text-gray-300 text-sm">
                                Upload a photo to see live preview
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Register;
