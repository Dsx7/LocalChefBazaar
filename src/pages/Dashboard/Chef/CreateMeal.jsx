import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imgUploader } from "../../../utils";

const CreateMeal = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const { data: customer, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setError("foodImg", { message: "Food image is required" });
            return;
        }

        setImagePreview(URL.createObjectURL(file));
        setValue("foodImg", file);
        clearErrors("foodImg");
    };


    const mutation = useMutation({
        mutationFn: async (mealsInfo) => {
            const res = await axiosSecure.post("/meals", mealsInfo);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Meal created successfully 🍽️");
            reset();
            setImagePreview(null);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Failed to create meal ❌"
            );
        },
    });

    const handleMeal = async (data) => {
        const { foodName, chefName, price, rating, foodMetarials, estimatedDeliveryTime, chefExperience, chefId, userEmail, foodImg, deliveryArea } = data;
        if (!foodImg) {
            setError("foodImg", { message: "Food image is required" });
            return;
        }
        const ingredients = foodMetarials.split(",").map(item => item.trim());
        const foodImage = await imgUploader(foodImg)
        const mealsData = {
            foodName,
            chefName,
            foodImage,
            price,
            rating,
            ingredients,
            estimatedDeliveryTime,
            chefExperience,
            chefId,
            userEmail,
            deliveryArea
        }
        mutation.mutate(mealsData)
    }

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div>
            <title>Create Meal | LocalChefBazaar</title>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-primary dark:text-[#628141] text-center mb-10"
            >
                Create a New Meal
            </motion.h1>

            <div className="max-w-4xl mx-auto p-8 rounded-3xl shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit(handleMeal)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Food Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="e.g. Grilled Chicken Salad"
                            {...register("foodName", {
                                required: "Food name is required",
                            })}
                        />
                        {errors.foodName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.foodName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Chef Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="e.g. Chef Rahim"
                            {...register("chefName", {
                                required: "Chef name is required",
                            })}
                        />
                        {errors.chefName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.chefName.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Upload Food Image
                        </label>

                        <div className="flex flex-col md:flex-row items-center gap-5">
                            <label className="w-full md:w-1/3 h-40 border-2 border-dashed border-primary rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary/5 transition">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <div className="flex flex-col items-center text-primary">
                                    <FiUpload size={30} />
                                    <p className="text-sm mt-1 dark:text-primary">Upload Image</p>
                                </div>
                            </label>

                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-40 h-40 rounded-xl object-cover shadow-md border"
                                />
                            )}
                        </div>
                        {errors.foodImg && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.foodImg.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Price (৳)
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="e.g. 250"
                            {...register("price", {
                                required: "Price is required",
                            })}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Rating
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="e.g. 4.5"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            {...register("rating", {
                                required: "Rating is required",
                                min: { value: 0, message: "Rating cannot be negative" },
                                max: { value: 5, message: "Rating cannot exceed 5" },
                            })}
                        />
                        {errors.rating && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.rating.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Estimated Delivery Time
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. 30 minutes"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            {...register("estimatedDeliveryTime", {
                                required: "Delivery time is required",
                            })}
                        />
                        {errors.estimatedDeliveryTime && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.estimatedDeliveryTime.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Chef Experience
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. 5 years experience"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            {...register("chefExperience", {
                                required: "Chef experience is required",
                            })}
                        />
                        {errors.chefExperience && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.chefExperience.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Delivery Area
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="e.g. Savar"
                            {...register("deliveryArea", {
                                required: "Delivery Area is required",
                            })}
                        />
                        {errors.chefName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.chefName.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Ingredients
                        </label>
                        <textarea
                            rows={4}
                            placeholder="List ingredients separated by commas"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            {...register("foodMetarials", {
                                required: "Ingredients are required",
                            })}
                        ></textarea>
                        {errors.foodMetarials && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.foodMetarials.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            Chef ID
                        </label>
                        <input
                            type="text"
                            readOnly
                            value={customer?.chefId}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 outline-none dark:text-primary"
                            {...register("chefId")}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1 dark:text-primary">
                            User Email
                        </label>
                        <input
                            type="email"
                            readOnly
                            value={user?.email}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 outline-none dark:text-primary"
                            {...register("userEmail")}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <motion.button
                            disabled={customer.userStatus === "fraud"}
                            whileTap={{ scale: 0.96 }}
                            className={`w-full py-4 rounded-xl text-lg font-semibold shadow-md
                            ${mutation.isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : " text-white"
                                } ${customer.userStatus === "fraud" ? "bg-gray-300 text-gray-600 cursor-no-drop" : "bg-primary text-white cursor-pointer bg-primary hover:bg-primary/90"}`}
                        >
                            {mutation.isLoading ? "Submitting..." : "Submit Meal"}
                        </motion.button>

                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreateMeal;