// import React from "react";
// import { motion } from "framer-motion";
// import ReviewDetails from "./ReviewDetails";
// import OrderPage from "../Order/OrderPage";
// import { useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";




// export default function MealDetails() {
//     const { user, loading } = useAuth();
//     const [openOrder, setOpenOrder] = useState(false);
//     const axiosSecure = useAxiosSecure();
//     const { mealId } = useParams();
//     // const { data, isLoading, refetch } = useQuery({
//     //     queryKey: ["meal", mealId],
//     //     queryFn: async () => {
//     //         const res = await axiosSecure.get(`/meals/${mealId}`);
//     //         return res.data;
//     //     }
//     // })

//     const { data, isLoading, error } = useQuery({
//         queryKey: ["meal", mealId],          // 🔥 mealId দিয়ে unique key
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/meals/${mealId}`);
//             return res.data;
//         },
//         enabled: !!mealId,                   // mealId না থাকলে query চলবে না
//         retry: 1,                            // ফেইল হলে ১ বার retry
//         staleTime: 5 * 60 * 1000,           // ৫ মিনিট ক্যাশে রাখবে (অপশনাল)
//     });

//     const { data: customer, isLoading: customerLoading } = useQuery({
//         queryKey: ['user', user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/${user?.email}`);
//             return res.data;
//         }
//     })

//     if (loading || isLoading || customerLoading) {
//         return (
//             <div className="min-h-screen flex justify-center items-center">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     return (
//         <>
//             <title>Meal's Details | LocalChefBazaar</title>
//             <div className="min-h-screen bg-gray-50 pb-16 dark:bg-[#1d232a]">

//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="w-full h-80 md:h-[420px] overflow-hidden rounded-b-3xl"
//                 >
//                     <img
//                         src={data?.foodImage}
//                         alt={data?.foodName}
//                         className="w-full h-full object-cover rounded-b-3xl shadow-lg"
//                     />
//                 </motion.div>


//                 <div className="max-w-4xl mx-auto px-5 mt-8">


//                     <div className="flex justify-between items-center">
//                         <h1 className="text-3xl md:text-4xl font-bold text-[#628141] berkshire-swash-regular">
//                             {data?.foodName}
//                         </h1>
//                         <span className="text-2xl font-semibold text-[#ff8400]">
//                             ৳{data?.price}
//                         </span>
//                     </div>


//                     <div className="flex items-center gap-2 mt-2">
//                         <span className="text-yellow-500 text-xl">★</span>
//                         <p className="text-gray-700 text-sm font-medium dark:text-white">
//                             {data?.rating} / 5
//                         </p>
//                     </div>


//                     <div className="mt-6 bg-white p-5 rounded-2xl shadow-md border border-gray-500 dark:bg-primary">
//                         <h2 className="text-lg font-semibold mb-2 dark:text-white">Prepared by</h2>
//                         <p className="text-xl font-bold text-gray-800 dark:text-white">{data?.chefName}</p>

//                         <p className="mt-1 text-gray-600 text-sm dark:text-white">
//                             Experience :{" "}
//                             <span className="font-semibold dark:text-white">{data?.chefExperience}</span>
//                         </p>

//                         <p className="text-gray-600 text-sm dark:text-white">
//                             Chef ID : <span className="font-semibold">{data?.chefId}</span>
//                         </p>
//                     </div>

//                     <div className="mt-6 bg-white p-5 rounded-2xl shadow-md border border-gray-500 dark:bg-primary">
//                         <h2 className="text-lg font-semibold mb-3">Ingredients</h2>

//                         <ul className="list-disc list-inside text-gray-700 space-y-1">
//                             {data?.ingredients.map((item, index) => (
//                                 <li key={index} className="text-sm text-[#628141]">
//                                     {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div className="mt-6 bg-white p-5 rounded-2xl shadow-md border border-gray-100 dark:bg-primary">
//                         <h2 className="text-lg font-semibold mb-3">Delivery Information</h2>

//                         <p className="text-gray-700 text-sm dark:text-white">
//                             Delivery Area :{" "}
//                             <span className="font-semibold dark:text-white">
//                                 {data?.deliveryArea}
//                             </span>
//                         </p>

//                         <p className="text-gray-700 text-sm mt-1 dark:text-white">
//                             Estimated Delivery Time:{" "}
//                             <span className="font-semibold text-[#628141]">
//                                 {data?.estimatedDeliveryTime}
//                             </span>
//                         </p>
//                     </div>

//                     <div className="mt-10">
//                         <motion.button
//                             disabled={customer?.userStatus === "fraud"}
//                             onClick={() => setOpenOrder(data)}
//                             whileTap={{ scale: 0.95 }}
//                             className={`w-full py-5 rounded-xl text-lg font-semibold text-white ${customer?.userStatus === "fraud" ? "bg-gray-300 text-gray-600 cursor-no-drop" : "bg-[#628141] text-white cursor-pointer"}`}
//                         >
//                             Order Now
//                         </motion.button>
//                     </div>
//                 </div>
//             </div>
//             {/* Review Section */}
//             <ReviewDetails mealId={mealId} user={user} mealName={data?.foodName} data={data} />

//             {/* Order Modal */}
//             {openOrder && (<OrderPage meal={openOrder}
//                 onClose={() => setOpenOrder(null)}
//                 refetch={refetch} />)}
//         </>
//     );
// }




import React, { useState } from "react";
import { motion } from "framer-motion";
import ReviewDetails from "./ReviewDetails";
import OrderPage from "../Order/OrderPage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import Logo from "../../components/Logo/Logo";

export default function MealDetails() {
  const { user, loading: authLoading } = useAuth();
  const [openOrder, setOpenOrder] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mealId } = useParams();

  console.log(mealId);
  

  const {
    data: meal,
    isLoading,
    isError,
    error,
    refetch, // refetch ফাংশন
  } = useQuery({
    queryKey: ["mealDetails", mealId],
    queryFn: async () => {
      if (!mealId) throw new Error("Meal ID is missing");
      const res = await axiosSecure.get(`/meals/${mealId}`);
      return res.data;
    },
    enabled: !!mealId, // id না থাকলে চলবে না
    retry: 3, // ৩ বার retry (network flake এর জন্য)
    retryDelay: 1000, // ১ সেকেন্ড পর পর retry
    staleTime: 0, // প্রতিবার ফ্রেশ ডেটা চেক করবে (রিফ্রেশে নিশ্চিত লোড)
    gcTime: 1000 * 60 * 10, // ১০ মিনিট ক্যাশে রাখবে
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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-gray-600 dark:text-gray-400">Loading meal details...</p>
      </div>
    );
  }

  console.log(meal);
  

  // Error or No Data (এটা প্রথমবারও দেখাবে যদি লোড ফেইল করে)
  if (isError || !meal) {
    console.error("Meal Load Error:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Failed to Load Meal</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error?.message || "This meal could not be loaded. It might have been removed or there is a connection issue."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => refetch()} // আবার চেষ্টা করো
              className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = "/meals"}
              className="px-8 py-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
            >
              Back to Meals
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Content (ডেটা থাকলে)
  return (
    <>
      <title>{meal?.foodName || "Meal"} | LocalChefBazaar</title>

      <div className="min-h-screen bg-gray-50 pb-16 dark:bg-[#1d232a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-80 md:h-[420px] overflow-hidden rounded-b-3xl"
        >
          <img
            src={meal?.foodImage || "/placeholder.jpg"} // fallback image
            alt={meal?.foodName}
            className="w-full h-full object-cover rounded-b-3xl shadow-lg"
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-5 mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#628141] berkshire-swash-regular">
              {meal?.foodName || "Meal Name"}
            </h1>
            <span className="text-2xl font-semibold text-[#ff8400]">
              ৳{meal?.price || "0"}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500 text-xl">★</span>
            <p className="text-gray-700 text-sm font-medium dark:text-white">
              {meal?.rating || "No rating"} / 5
            </p>
          </div>

          {/* Prepared by */}
          <div className="mt-6 bg-white p-5 rounded-2xl shadow-md border border-gray-500 dark:bg-primary">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Prepared by</h2>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {meal?.chefName || "N/A"}
            </p>
            <p className="mt-1 text-gray-600 text-sm dark:text-white">
              Experience: <span className="font-semibold">{meal?.chefExperience || "N/A"}</span>
            </p>
            <p className="text-gray-600 text-sm dark:text-white">
              Chef ID: <span className="font-semibold">{meal?.chefId || "N/A"}</span>
            </p>
          </div>

          {/* Ingredients */}
          <div className="mt-6 bg-white p-5 rounded-2xl shadow-md border border-gray-500 dark:bg-primary">
            <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 dark:text-gray-300">
              {meal?.ingredients?.length > 0 ? (
                meal.ingredients.map((item, index) => (
                  <li key={index} className="text-sm text-[#628141]">
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">No ingredients available</li>
              )}
            </ul>
          </div>

          {/* Delivery Information */}
          <div className="mt-6 bg-white p-5 rounded-2xl shadow-md border border-gray-100 dark:bg-primary">
            <h2 className="text-lg font-semibold mb-3">Delivery Information</h2>
            <p className="text-gray-700 text-sm dark:text-white">
              Delivery Area: <span className="font-semibold dark:text-white">{meal?.deliveryArea || "N/A"}</span>
            </p>
            <p className="text-gray-700 text-sm mt-1 dark:text-white">
              Estimated Delivery Time: <span className="font-semibold text-[#628141]">{meal?.estimatedDeliveryTime || "N/A"}</span>
            </p>
          </div>

          <div className="mt-10">
            <motion.button
              disabled={customer?.userStatus === "fraud"}
              onClick={() => setOpenOrder(meal)}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-5 rounded-xl text-lg font-semibold text-white ${
                customer?.userStatus === "fraud"
                  ? "bg-gray-300 text-gray-600 cursor-no-drop"
                  : "bg-[#628141] text-white cursor-pointer"
              }`}
            >
              Order Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewDetails mealId={mealId} user={user} mealName={meal?.foodName} data={meal} />

      {/* Order Modal */}
      {openOrder && (
        <OrderPage
          meal={openOrder}
          onClose={() => setOpenOrder(null)}
          refetch={refetch}
        />
      )}
    </>
  );
}