import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaUserTie, FaUserEdit, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import InfoCard from "../../../components/shared/InfoCard";
import EditProfileModal from "../../../modals/EditProfileModal";

const ChefProfile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth();

    const adminRequestMutation = useMutation({
        mutationFn: async (requestType) => {
            const res = await axiosSecure.post("/requests", requestType);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Request sent successfully ✅");
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Request already pending ❌"
            );
        },
    });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    const handleAdminRequest = () => {
        adminRequestMutation.mutate({
            userName: user.displayName,
            userEmail: user.email,
            requestType: "admin",
        });
    }

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-accent to-gray-100 dark:from-primary dark:to-[#363636] py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="w-full mx-auto bg-white rounded-3xl shadow-xl border border-gray-500 p-8 dark:bg-[#363636]"
            >
                {/* Header */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <img
                        src={data.userPhoto}
                        alt={data.userName}
                        className="w-24 h-24 rounded-2xl shadow-md object-cover"
                    />

                    {/* <div>
                        <h1 className="text-2xl font-semibold text-[#628141]">
                            {data.userName}
                        </h1>
                        <p className="text-[#ff8400]">{data.userEmail}</p>
                    </div> */}

                    <div className="flex justify-between w-full items-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-[#628141]">
                                {data.userName}
                            </h1>
                            <p className="text-[#ff8400]">{data.userName}</p>
                        </div>
                        <FaEdit className="text-2xl mr-5 cursor-pointer" onClick={() => setIsEditModalOpen(true)} />

                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <InfoCard label="Address" value={data.userAddress} />
                    <InfoCard label="Role" value={data.userRole.toUpperCase()} />

                    <InfoCard
                        label="Status"
                        value={
                            <span
                                className={`font-semibold ${data.userStatus === "active"
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {data.userStatus}
                            </span>
                        }
                    />

                    {data.userRole === "chef" && (
                        <InfoCard label="Chef ID" value={data.chefId} />
                    )}
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <motion.button
                        onClick={handleAdminRequest}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl shadow-md cursor-pointer"
                    >
                        <FaUserShield />
                        Be an Admin
                    </motion.button>
                </div>
            </motion.div>

            {isEditModalOpen && (
                <EditProfileModal
                    onClose={() => setIsEditModalOpen(false)}
                    address={data.userAddress}
                refetchProfile={refetch} // যদি তোমার প্রোফাইল ডেটা refetch করতে চাও
                />
            )}
        </div>
    );
}

// function InfoCard({ label, value }) {
//     return (
//         <div className="bg-gray-50 p-5 rounded-2xl border border-gray-500 shadow-sm dark:bg-primary">
//             <p className="text-xs font-semibold text-gray-500 mb-1 dark:text-white">{label}</p>
//             <p className="text-[15px] font-medium text-gray-800 dark:text-white">{value}</p>
//         </div>
//     );
// }
export default ChefProfile;