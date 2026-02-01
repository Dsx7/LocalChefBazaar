import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaTruck, FaMoneyBill } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`)
            return res.data
        }
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "text-yellow-600 bg-yellow-100";
            case "preparing":
                return "text-blue-600 bg-blue-100";
            case "delivered":
                return "text-green-600 bg-green-100";
            default:
                return "";
        }
    };

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const handlePayment = async (order) => {
        const paymentInfo = {
            mealId: order._id,
            mealName: order.mealName,
            quantity: Number(order.quantity),
            chefName: order.chefName,
            chefId: order.chefId,
            price: order.price,
            customer: {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL
            }
        }
        const {data} = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.assign(data.url)
    }


    return (
        <div>
            <title>My Orders | LocalChefBazaar</title>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-[#628141] mb-8"
            >
                My Orders
            </motion.h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => (
                    <motion.div
                        key={order?._id}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition dark:bg-primary"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                            {order?.mealName}
                        </h2>

                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    order?.orderStatus
                                )}`}
                            >
                                {order?.orderStatus}
                            </span>


                        </div>

                        <div className="space-y-2 text-sm text-gray-700 dark:text-white">
                            <p>
                                <strong>Price:</strong> ৳{order?.price}
                            </p>
                            <p>
                                <strong>Quantity:</strong> {order?.quantity}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaClock className="text-[#628141]" />{" "}
                                <span>
                                    <strong>Delivery Time:</strong> {order?.orderTime}
                                </span>
                            </p>
                            <p>
                                <strong>Chef Name:</strong> {order?.chefName}
                            </p>
                            <p>
                                <strong>Chef ID:</strong> {order?.chefId}
                            </p>
                        </div>

                        {order.orderStatus === "accepted" &&
                            order.paymentStatus === "pending" && (
                                <button
                                    onClick={() => handlePayment(order)}
                                    className="w-full bg-primary hover:bg-green-700 text-white py-3 rounded-xl mt-6 flex items-center justify-center gap-2 font-semibold transition cursor-pointer"
                                >
                                    <FaMoneyBill /> Pay Now
                                </button>
                            )}

                        {order.paymentStatus === "paid" && (
                            <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <FaCheckCircle /> Payment Completed
                            </div>
                        )}

                        {order.orderStatus === "pending" && (
                            <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <FaCheckCircle /> Payment unlocks after order acceptance
                            </div>
                        )}
                        {order.orderStatus === "cancelled" && (
                            <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <FaCheckCircle /> This order was cancelled by the chef
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
export default MyOrders;