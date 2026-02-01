import React from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  // all users data
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  })

  const queryClient = useQueryClient();

  const fraudMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/fraud/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User marked as Fraud ❌");
      queryClient.invalidateQueries(["users"]); // instant UI update
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Action failed");
    },
  });

  const handleMakeFraud = (id) => {
    fraudMutation.mutate(id);
    refetch()
  };


  if (isLoading) {
    return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
  }

  return (
    <div>
      <title>Manage Users | LocalChefBazaar</title>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#628141]">Manage Users</h1>
        <p className="text-gray-500 mt-1">
          View and manage all registered users on the platform.
        </p>
      </div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-2xl shadow-lg border border-gray-500 p-6 dark:bg-primary"
      >
        <div className="overflow-x-auto">
          <table className="table w-full dark:bg-primary">
            <thead className="bg-gray-100 text-gray-700 dark:bg-primary dark:text-[#628141] text-xl">
              <tr className="text-center">
                <th>Serial</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">

              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-500 dark:text-white text-center">

                  {/* Serial */}
                  <td className="py-4 font-medium">{index + 1}</td>

                  {/* Name */}
                  <td className="py-4 font-medium">{user.userName}</td>

                  {/* Email */}
                  <td>{user.userEmail}</td>

                  {/* Role Badge */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${user.userRole === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "chef"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {user.userRole}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${user.userStatus === "fraud"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                        }`}
                    >
                      {user.userStatus}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <button
                        disabled
                        className="btn btn-sm opacity-40 cursor-not-allowed"
                      >
                        Make Fraud
                      </button>
                    ) : user.status === "fraud" ? (
                      <button
                        disabled
                        className="btn btn-sm bg-red-500/20 text-red-500 border-none cursor-not-allowed"
                      >
                        Already Fraud
                      </button>
                    ) : (
                      user.userRole !== "admin" && <button
                        disabled={user.userStatus === "fraud"}
                        onClick={() => handleMakeFraud(user._id)}
                        className={`px-6 py-2.5 rounded-lg font-medium text-sm shadow transition w-full md:w-auto ${user.userStatus === "fraud"
                          ? "bg-gray-300 text-gray-600 cursor-no-drop"
                          : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                          }`}
                      >
                        Make Fraud
                      </button>
                    )}
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
export default ManageUsers;