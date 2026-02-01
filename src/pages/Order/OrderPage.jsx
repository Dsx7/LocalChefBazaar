import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const OrderPage = ({ onClose, meal }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            mealName: meal?.foodName,
            foodPrice: meal?.price,
            chefId: meal?.chefId,
            userEmail: user?.email,
            orderStatus: "pending",
            orderTime: new Date().toLocaleString(),
        },
    })

    const orderMutation = useMutation({
        mutationFn: async (orderData) => {
            const res = await axiosSecure.post("/orders", orderData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Order placed successfully 🍽️");
            reset();
            onClose();
        },
        onError: () => {
            toast.error("Failed to place order ❌. Please Log in");
        },
    });

    const onSubmit = (data) => {
        const orderInfo = {
            ...data,
            foodId: meal._id,
            paymentStatus: "pending",
            chefName: meal.chefName
        };

        const totalPrice = Number(data.foodPrice * data.quantity)

        Swal.fire({
            title: `Your total price is ${totalPrice}`,
            text: `Do you want to confirm the order?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                orderMutation.mutate(orderInfo);
            }
        });

    };

    return (
        <div className="fixed inset-0 backdrop-blur-xl bg-white/60  flex justify-center items-center z-50 px-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl w-full max-w-lg shadow-xl dark:bg-primary"
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-[#628141]">Confirm Your Order</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto px-6 py-4"> 
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-8">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Food Name
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                                readOnly
                                {...register("mealName")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Price
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                                readOnly
                                {...register("foodPrice")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Quantity
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                                type="number"
                                min="1"
                                placeholder="Enter quantity"
                                {...register("quantity", {
                                    required: "Quantity is required",
                                    min: { value: 1, message: "Minimum 1 item required" },
                                })}
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Chef ID
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                                readOnly
                                {...register("chefId")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Your Email
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                                readOnly
                                {...register("userEmail")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Delivery Address
                            </label>
                            <textarea
                                className="w-full border rounded-lg px-4 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                                placeholder="Enter your delivery address"
                                rows="3"
                                {...register("userAddress", {
                                    required: "Address is required",
                                })}
                            ></textarea>
                            {errors.userAddress && (
                                <p className="text-red-500 text-sm mt-1">{errors.userAddress.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Order Status
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 bg-gray-500"
                                readOnly
                                {...register("orderStatus")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Order Time
                            </label>
                            <input
                                className="w-full border rounded-lg px-4 py-2 bg-gray-500"
                                readOnly
                                {...register("orderTime")}
                            />
                        </div>

                    </form>
                </div>

                <div className="p-6 border-t bg-white dark:bg-primary">
                    <button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="w-full py-3 rounded-lg text-white font-semibold text-lg hover:opacity-90 cursor-pointer"
                        style={{ backgroundColor: "#ff8400" }}
                    >
                        Confirm Order
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderPage;
