import React from "react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FavoriteMeal = () => {
  const { user } = useUser();
  const axiosSecure = useAxiosSecure();
  const { data: favorites = [], isLoading, refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user?.email}`);
      return res.data;
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Removed from favorites ❌");
      refetch();
    },
  });


  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
    <title>Favorite Meals | LocalChefBazaar</title>
      <div className="min-h-screen bg-gradient-to-b from-accent to-gray-100 px-4 md:px-8 py-12 inter dark:to-[#363636]">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-[#628141]"
      >
        Favorite Meals
      </motion.h1>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-500 overflow-x-auto dark:bg-primary">

        <div className="hidden md:grid grid-cols-5 bg-gray-100 py-4 px-6 text-xl font-semibold text-[#628141] dark:bg-primary">
          <p>Meal Name</p>
          <p>Chef Name</p>
          <p>Price</p>
          <p>Date Added</p>
          <p className="text-center">Actions</p>
        </div>

        <div className="divide-y divide-gray-100">
          {favorites.map((fav) => (
            <motion.div
              key={fav.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 py-6 px-6 text-sm md:items-center hover:bg-gray-500 transition group"
            >
              <div className="md:hidden">
                <p className="text-xs text-gray-500">Meal Name</p>
                <p className="font-semibold text-gray-900">{fav.mealName}</p>
              </div>
              <p className="hidden md:block font-semibold text-gray-900 dark:text-white group-hover:text-white">{fav.mealName}</p>

              <div className="md:hidden">
                <p className="text-xs text-gray-500">Chef</p>
                <p className="text-gray-700">{fav.chefName}</p>
              </div>
              <p className="hidden md:block text-gray-700 dark:text-white group-hover:text-white">{fav.chefName}</p>

              <div className="md:hidden">
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-medium text-gray-800">৳{fav.price}</p>
              </div>
              <p className="hidden md:block font-medium text-gray-800 dark:text-white group-hover:text-white">৳{fav.price}</p>

              <div className="md:hidden">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-gray-600">{new Date(fav.createdAt).toDateString()}</p>
              </div>
              <p className="hidden md:block text-gray-600 dark:text-white group-hover:text-white">{new Date(fav.createdAt).toDateString()}</p>

              <div className="flex md:justify-center">
                <button
                  onClick={() => deleteFavoriteMutation.mutate(fav._id)}
                  className="
                    flex items-center gap-2 
                    bg-red-100 text-red-600 
                    px-4 py-2 rounded-lg text-sm 
                    hover:bg-red-200 
                    transition shadow-sm
                    cursor-pointer
                    border border-red-600
                  "
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
export default FavoriteMeal;