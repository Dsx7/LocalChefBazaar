import React from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManageRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests, isLoading } = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/requests")
            return res.data
        }
    })

    const queryClient = useQueryClient();

    const acceptMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/requests/accept/${id}`),
        onSuccess: () => {
            toast.success("Request approved");
            queryClient.invalidateQueries(["requests"]);
        },
    });

    const rejectMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/requests/reject/${id}`),
        onSuccess: () => {
            toast.error("Request rejected");
            queryClient.invalidateQueries(["requests"]);
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
        <div>
            <title>Manage Request | LocalChefBazaar</title>
            <div className="w-full px-4 md:px-6 pt-12 pb-24 md:pb-12 mx-auto">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl md:text-4xl font-bold mb-8 text-center md:text-left text-[#628141]"
                >
                    Manage Requests
                </motion.h1>

                {/* Table Card */}
                <div className="bg-white shadow-xl rounded-2xl border border-gray-500 p-6 overflow-hidden dark:bg-primary">

                    {/* Desktop Header */}
                    <div className="hidden md:grid grid-cols-6 bg-gray-100 dark:bg-primary dark:text-[#628141] text-xl py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-center">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Type</p>
                        <p>Status</p>
                        <p>Time</p>
                        <p className="text-center">Actions</p>
                    </div>

                    <div className="overflow-y-auto">
                        <div className="divide-y divide-gray-200">

                            {requests.map((req) => {
                                const isDisabled = req.requestStatus !== "pending";

                                return (
                                    <div
                                        key={req.id}
                                        className="grid grid-cols-1 md:grid-cols-6 gap-6 py-6 px-6 hover:bg-gray-500 transition-all group"
                                    >
                                        {/* User */}
                                        <div className="md:hidden">
                                            <p className="text-xs font-semibold text-gray-500">Name</p>
                                            <p className="font-medium text-gray-900 mt-1 dark:text-white">{req.userName}</p>
                                        </div>
                                        <p className="hidden md:block font-medium text-gray-900 text-center dark:text-white group-hover:text-white">{req.userName}</p>

                                        {/* Email */}
                                        <div className="md:hidden">
                                            <p className="text-xs font-semibold text-gray-500">Email</p>
                                            <p className="text-gray-600 break-all text-sm mt-1 dark:text-white">{req.userEmail}</p>
                                        </div>
                                        <p className="hidden md:block text-gray-600 break-all text-center dark:text-white group-hover:text-white">{req.userEmail}</p>

                                        {/* Type */}
                                        <div className="md:hidden">
                                            <p className="text-xs font-semibold text-gray-500">Type</p>
                                            <p className={`capitalize font-bold mt-1 ${req.requestType === "chef" ? "text-green-600" : "text-indigo-600"}`}>
                                                {req.requestType}
                                            </p>
                                        </div>
                                        <p className={`hidden md:block capitalize font-bold ${req.requestType === "chef" ? "text-green-600" : "text-indigo-600"} text-center dark:text-white`}>
                                            {req.requestType}
                                        </p>

                                        {/* Status */}
                                        <div className="md:hidden">
                                            <p className="text-xs font-semibold text-gray-500">Status</p>
                                            <p className={`capitalize font-bold mt-1 ${req.requestStatus === "pending" ? "text-yellow-600" :
                                                req.requestStatus === "approved" ? "text-green-600" : "text-red-600"
                                                } `}>
                                                {req.requestStatus}
                                            </p>
                                        </div>
                                        <p className={`hidden md:block capitalize font-bold ${req.requestStatus === "pending" ? "text-yellow-600" :
                                            req.requestStatus === "approved" ? "text-green-600" : "text-red-600"
                                            } text-center`}>
                                            {req.requestStatus}
                                        </p>

                                        {/* Time */}
                                        <div className="md:hidden">
                                            <p className="text-xs font-semibold text-gray-500">Time</p>
                                            <p className="text-gray-500 text-sm mt-1 dark:text-white">{new Date(req.requestTime).toDateString()}</p>
                                        </div>
                                        <p className="hidden md:block text-gray-500 text-center dark:text-white group-hover:text-white">{new Date(req.requestTime).toDateString()}</p>

                                        {/* Actions */}
                                        <div className="flex gap-3 md:justify-center mt-4 md:mt-0">
                                            <button
                                                disabled={isDisabled}
                                                onClick={() => acceptMutation.mutate(req._id)}
                                                className={` px-6 py-2.5 rounded-lg font-medium text-sm shadow transition w-full md:w-auto ${isDisabled
                                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                    : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                                                    }`}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                disabled={isDisabled}
                                                onClick={() => rejectMutation.mutate(req._id)}
                                                className={` px-6 py-2.5 rounded-lg font-medium text-sm shadow transition w-full md:w-auto ${isDisabled
                                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                    : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                                    }`}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default ManageRequests;