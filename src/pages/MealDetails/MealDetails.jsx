import React, { useState } from "react";
import { motion } from "framer-motion";
import ReviewDetails from "./ReviewDetails";
import OrderPage from "../Order/OrderPage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import { FaUserAlt, FaMapMarkerAlt, FaClock, FaStar, FaLeaf } from "react-icons/fa";

export default function MealDetails() {
  const { user, loading: authLoading } = useAuth();
  const [openOrder, setOpenOrder] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mealId } = useParams();

  const {
    data: meal,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["mealDetails", mealId],
    queryFn: async () => {
      if (!mealId) throw new Error("Meal ID is missing");
      const res = await axiosSecure.get(`/meals/${mealId}`);
      return res.data;
    },
    enabled: !!mealId,
    retry: 3,
    retryDelay: 1000,
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
  });

  const { data: customer, isLoading: customerLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // All loading states
  if (authLoading || isLoading || customerLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-[#628141] mb-4"></span>
        <p className="text-gray-500 font-medium animate-pulse">Fetching delicious details...</p>
      </div>
    );
  }

  // Error State
  if (isError || !meal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops! Meal Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
            {error?.message || "We couldn't load the meal details. It might have been removed or you're offline."}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => refetch()}
              className="w-full py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#4f6b32] transition-colors shadow-lg shadow-green-900/20"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = "/meals"}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{meal?.foodName || "Meal"} | LocalChefBazaar</title>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
        
        {/* Hero Image Section */}
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
            >
                <img
                    src={meal?.foodImage || "/placeholder.jpg"}
                    alt={meal?.foodName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-gray-900" />
            </motion.div>
        </div>

        {/* Content Container - Floating Up */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 z-10">
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700"
            >
                {/* Header: Title & Price */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                <FaStar /> {meal?.rating || "N/A"} Rating
                            </span>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-[#628141] text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                <FaLeaf /> Fresh
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-[#628141] berkshire-swash-regular leading-tight">
                            {meal?.foodName}
                        </h1>
                    </div>
                    <div className="bg-[#ff8400]/10 px-6 py-3 rounded-2xl">
                        <span className="text-3xl md:text-4xl font-extrabold text-[#ff8400] oswald tracking-wide">
                            ৳{meal?.price}
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Chef & Delivery Info */}
                    <div className="space-y-6">
                        
                        {/* Chef Card */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-600">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center text-xl shadow-sm text-[#628141]">
                                    <FaUserAlt />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Prepared By</p>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{meal?.chefName || "Unknown Chef"}</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-white dark:bg-gray-600 px-3 py-2 rounded-lg">
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">Experience</p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{meal?.chefExperience || "N/A"}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-600 px-3 py-2 rounded-lg">
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">Chef ID</p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate" title={meal?.chefId}>{meal?.chefId || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-600">
                             <div className="flex items-center gap-3 mb-4">
                                <span className="text-[#ff8400] text-lg"><FaMapMarkerAlt /></span>
                                <h3 className="font-bold text-gray-800 dark:text-white">Delivery Details</h3>
                             </div>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600 border-dashed">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">Area</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{meal?.deliveryArea || "Dhaka"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1"><FaClock className="text-xs"/> Est. Time</span>
                                    <span className="font-bold text-[#628141]">{meal?.estimatedDeliveryTime || "30-45 min"}</span>
                                </div>
                             </div>
                        </div>

                    </div>

                    {/* Right Column: Ingredients & Order Button */}
                    <div className="flex flex-col h-full">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-green-500">🥦</span> Ingredients
                            </h3>
                            {meal?.ingredients?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {meal.ingredients.map((item, index) => (
                                        <span 
                                            key={index} 
                                            className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-[#628141] dark:text-green-400 text-sm font-medium rounded-full border border-green-100 dark:border-green-800"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 italic text-sm">Ingredients list not available.</p>
                            )}
                        </div>

                        {/* Order Button */}
                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <motion.button
                                disabled={customer?.userStatus === "fraud"}
                                onClick={() => setOpenOrder(meal)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full py-4 rounded-xl text-xl font-bold text-white shadow-xl transition-all
                                    ${customer?.userStatus === "fraud" 
                                        ? "bg-gray-400 cursor-not-allowed" 
                                        : "bg-[#628141] hover:bg-[#4f6b32] shadow-green-900/20"
                                    }
                                `}
                            >
                                {customer?.userStatus === "fraud" ? "Account Restricted" : "Order Now"}
                            </motion.button>
                            <p className="text-center text-xs text-gray-400 mt-3">
                                100% Homemade • Hygienic Packaging
                            </p>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>

        {/* Review Section */}
        <div className="mt-16">
             <ReviewDetails mealId={mealId} user={user} mealName={meal?.foodName} data={meal} />
        </div>

        {/* Order Modal */}
        {openOrder && (
            <OrderPage
                meal={openOrder}
                onClose={() => setOpenOrder(null)}
                refetch={refetch}
            />
        )}
      </div>
    </>
  );
}