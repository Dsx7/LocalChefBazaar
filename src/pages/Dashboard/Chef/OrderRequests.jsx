import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaTruck } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const OrderRequests = () => {
  const axiosSecure = useAxiosSecure()
  const { userData, userLoading } = useUser()
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["chefOrders", userData?.chefId],
    enabled: !!userData?.chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/chef?chefId=${userData?.chefId}`);
      return res.data;
    }
  });

  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/orders/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order status updated ✅");
      queryClient.invalidateQueries(["chefOrders"]);
    },
    onError: () => {
      toast.error("Failed to update order ❌");
    }
  });

  const handleCancel = (id) => {
    statusMutation.mutate({ id, status: "cancelled" });
    refetch()
  };

  const handleAccept = (id) => {
    statusMutation.mutate({ id, status: "accepted" });
    refetch()
  };

  const handleDeliver = (id) => {
    statusMutation.mutate({ id, status: "delivered" });
    refetch()
  };


  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <title>Order Requests | LocalChefBazaar</title>
      <div className="min-h-screen bg-gradient-to-b from-accent to-gray-100 px-4 md:px-6 py-12 inter dark:to-[#363636]">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
        >
          Order Requests
        </motion.h1>

        {/* Order Cards */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
          {orders
            .map((order) => {
              const isCancelled = order.orderStatus === "cancelled";
              const isAccepted = order.orderStatus === "accepted";
              const isDelivered = order.orderStatus === "delivered";
              const isPending = order.orderStatus === "pending";

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-500 shadow-lg rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all dark:bg-primary"
                >
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {order.mealName}
                    </h2>
                    <span className="text-lg font-bold text-primary dark:text-[#628141]">
                      ৳{order.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-white">
                    Quantity:{" "}
                    <span className="font-semibold">{order.quantity}</span>
                  </p>

                  <p className="text-sm dark:text-white">
                    Status:{" "}
                    <span
                      className={`font-semibold ${isCancelled
                        ? "text-red-600"
                        : isDelivered
                          ? "text-green-700"
                          : isAccepted
                            ? "text-indigo-600"
                            : "text-yellow-600"
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>

                  <p className="text-sm">
                    Payment:{" "}
                    <span
                      className={`font-semibold ${order.paymentStatus === "paid"
                        ? "text-green-700"
                        : "text-red-500"
                        }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p className="text-sm text-gray-700 break-all dark:text-white">
                    User Email : <span className="font-semibold">{order.userEmail}</span>
                  </p>

                  <p className="text-sm text-gray-700 dark:text-white">
                    Address :{" "}
                    <span className="font-semibold">{order.userAddress}</span>
                  </p>

                  <p className="text-xs text-gray-500 dark:text-white">
                    Ordered At : {order.orderTime}
                  </p>

                  <div className="flex gap-3 mt-3">
                   
                    <button
                      disabled={!isPending}
                      onClick={() => handleCancel(order._id)}
                      className={`
                      flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg text-sm font-medium shadow-md transition border border-primary
                      ${!isPending
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                        }`}
                    >
                      <FaTimes /> Cancel
                    </button>

                    <button
                      disabled={!isPending}
                      onClick={() => handleAccept(order._id)}
                      className={`
                      flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg text-sm font-medium shadow-md transition border border-primary
                      ${!isPending
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        }`}
                    >
                      <FaCheck /> Accept
                    </button>

                    <button
                      disabled={!isAccepted}
                      onClick={() => handleDeliver(order._id)}
                      className={`
                      flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg text-sm font-medium shadow-md transition border border-primary
                      ${!isAccepted
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-primary hover:bg-[#4f6a32] text-white cursor-pointer"
                        }`}
                    >
                      <FaTruck /> Deliver
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default OrderRequests;