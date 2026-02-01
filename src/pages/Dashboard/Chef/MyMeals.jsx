import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import MealsUpdateModal from "./MealsUpdateModal";

const MyMeals = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: meals, isLoading, refetch } = useQuery({
    queryKey: ["meals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?email=${user?.email}`)
      return res.data.meals
    }
  })

  const handleDeleteMeal = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Cancel করলে এখানেই return
    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/meals/${id}`);

      if (res.data.deletedCount > 0 || res.data.success) {
        toast.success("Meal deleted successfully 🍽️");
        refetch(); // UI instant update
      }

    } catch (error) {
      toast.error("Failed to delete meal ❌");
    }
  };


  if (loading || isLoading) {
    return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
  }

  return (
    <div>
      <title>My Meals | LocalChefBazaar</title>
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-[#628141]"
      >
        My Meals
      </motion.h1>
      <p className="font-semibold mb-4 text-xl">Total Meals : {meals.length}</p>

      {/* Meals Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-primary shadow-xl rounded-2xl overflow-hidden border border-gray-500 hover:shadow-2xl transition-all group"
          >
            {/* Image */}
            <div className="w-full h-60 overflow-hidden">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 ">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {meal.foodName}
              </h2>

              {/* Price + Rating */}
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-white">
                <p>৳{meal.price}</p>
                <p className="text-yellow-500">⭐ {meal.rating}</p>
              </div>

              {/* Ingredients */}
              <div>
                <p className="text-xs text-gray-500 mb-1 dark:text-white">Ingredients:</p>
                <p className="text-sm text-gray-700 truncate dark:text-white">
                  {meal.ingredients.join(", ")}
                </p>
              </div>

              {/* Delivery time */}
              <p className="text-sm text-gray-700 dark:text-white">
                Delivery:{" "}
                <span className="font-semibold">
                  {meal.estimatedDeliveryTime}
                </span>
              </p>

              {/* Chef information */}
              <div className="text-xs text-gray-500 dark:text-white">
                <p>
                  Chef : <span className="font-semibold dark:text-white">{meal.chefName}</span>
                </p>
                <p>
                  ID : <span className="font-semibold dark:text-white">{meal.chefId}</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button onClick={() => handleDeleteMeal(meal._id)} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-info-content px-4 py-2 rounded-lg text-sm shadow-md transition cursor-pointer">
                  <FaTrash /> Delete
                </button>

                <button
                onClick={() => setSelectedMeal(meal)}
                className="flex items-center gap-2 bg-primary dark:bg-[#628141] text-info-content px-4 py-2 rounded-lg text-sm shadow-md transition cursor-pointer">
                  <FaEdit /> Update
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedMeal && (
        <MealsUpdateModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
}
export default MyMeals