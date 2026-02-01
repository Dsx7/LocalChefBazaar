import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaUserTie, FaUserEdit, FaEdit } from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import InfoCard from "../../../components/shared/InfoCard";
import EditProfileModal from "../../../modals/EditProfileModal";

const AdminProfile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { userData: user, refetch } = useUser();
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="w-full mx-auto bg-white rounded-3xl shadow-xl border border-gray-500 p-8 oswald dark:bg-[#363636]"
            >
                {/* Header */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <img
                        src={user.userPhoto}
                        alt={user.userName}
                        className="w-24 h-24 rounded-2xl shadow-md object-cover"
                    />

                    <div className="flex justify-between w-full items-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-[#628141]">
                                {user.userName}
                            </h1>
                            <p className="text-[#ff8400]">{user.userEmail}</p>
                        </div>
                        <FaEdit className="text-2xl mr-5 cursor-pointer" onClick={() => setIsEditModalOpen(true)} />

                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <InfoCard label="Address" value={user.userAddress} />
                    <InfoCard label="Role" value={user.userRole.toUpperCase()} />

                    <InfoCard
                        label="Status"
                        value={
                            <span
                                className={`font-semibold ${user.userStatus === "active"
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {user.userStatus}
                            </span>
                        }
                    />

                    {user.role === "chef" && (
                        <InfoCard label="Chef ID" value={user.chefId} />
                    )}
                </div>
            </motion.div>

            {isEditModalOpen && (
                <EditProfileModal
                    onClose={() => setIsEditModalOpen(false)}
                    address={user.userAddress}
                    refetchProfile={refetch} // যদি তোমার প্রোফাইল ডেটা refetch করতে চাও
                />
            )}
        </div>
    );
}

// function InfoCard({ label, value }) {
//     return (
//         <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm">
//             <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
//             <p className="text-[15px] font-medium text-gray-800">{value}</p>
//         </div>
//     );
// }
export default AdminProfile;