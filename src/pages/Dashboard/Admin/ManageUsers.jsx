import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    userName: "",
    userAddress: "",
    userPhoto: "",
  });
  const [editLoading, setEditLoading] = useState(false);
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

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter, sortBy, sortDir]);

  const usersData = users || [];
  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    const filtered = usersData.filter((user) => {
      const matchesSearch =
        !searchValue ||
        [user.userName, user.userEmail, user.userRole, user.userStatus, user.chefId]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchValue));

      const matchesRole =
        roleFilter === "all" || user.userRole === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.userStatus === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      let valA = "";
      let valB = "";

      switch (sortBy) {
        case "name":
          valA = a.userName || "";
          valB = b.userName || "";
          break;
        case "email":
          valA = a.userEmail || "";
          valB = b.userEmail || "";
          break;
        case "role":
          valA = a.userRole || "";
          valB = b.userRole || "";
          break;
        case "status":
          valA = a.userStatus || "";
          valB = b.userStatus || "";
          break;
        case "createdAt":
        default:
          valA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          valB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          break;
      }

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [usersData, search, roleFilter, statusFilter, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditForm({
      userName: user.userName || "",
      userAddress: user.userAddress || "",
      userPhoto: user.userPhoto || "",
    });
  };

  const handleEditSave = async () => {
    if (!editUser?.userEmail) return;
    setEditLoading(true);
    try {
      const res = await axiosSecure.patch(`/users/${editUser.userEmail}`, {
        userName: editForm.userName,
        userPhoto: editForm.userPhoto,
        userAddress: editForm.userAddress,
      });
      if (res?.data?.success) {
        toast.success("User updated successfully");
        setEditUser(null);
        queryClient.invalidateQueries(["users"]);
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setEditLoading(false);
    }
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
        {/* Table Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, role, status, chef ID"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#628141] focus:border-[#628141] outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="chef">Chef</option>
            <option value="user">User</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="fraud">Fraud</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200"
          >
            <option value="createdAt">Sort: Newest</option>
            <option value="name">Sort: Name</option>
            <option value="email">Sort: Email</option>
            <option value="role">Sort: Role</option>
            <option value="status">Sort: Status</option>
          </select>
          <button
            onClick={() => setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
          >
            {sortDir === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>

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

              {paginatedUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-500 dark:text-white text-center">

                  {/* Serial */}
                  <td className="py-4 font-medium">
                    {(page - 1) * pageSize + index + 1}
                  </td>

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
                          : user.userRole === "chef"
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
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                      <button
                        onClick={() => setViewUser(user)}
                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditOpen(user)}
                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      {user.userRole === "admin" ? (
                        <button
                          disabled
                          className="px-3 py-2 rounded-lg text-xs font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
                        >
                          Make Fraud
                        </button>
                      ) : user.userStatus === "fraud" ? (
                        <button
                          disabled
                          className="px-3 py-2 rounded-lg text-xs font-semibold bg-red-100 text-red-400 cursor-not-allowed"
                        >
                          Fraud
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeFraud(user._id)}
                          className="px-3 py-2 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700"
                        >
                          Make Fraud
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Showing {paginatedUsers.length} of {filteredUsers.length} users
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600 text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setViewUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-[#628141] mb-4">User Details</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                {viewUser.userPhoto ? (
                  <img
                    src={viewUser.userPhoto}
                    alt={viewUser.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{viewUser.userName}</p>
                  <p>{viewUser.userEmail}</p>
                </div>
              </div>
              <p><span className="font-semibold text-gray-800">Role:</span> {viewUser.userRole}</p>
              <p><span className="font-semibold text-gray-800">Status:</span> {viewUser.userStatus}</p>
              {viewUser.chefId && (
                <p><span className="font-semibold text-gray-800">Chef ID:</span> {viewUser.chefId}</p>
              )}
              {viewUser.userAddress && (
                <p><span className="font-semibold text-gray-800">Address:</span> {viewUser.userAddress}</p>
              )}
              {viewUser.createdAt && (
                <p><span className="font-semibold text-gray-800">Joined:</span> {new Date(viewUser.createdAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setEditUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-[#628141] mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={editForm.userName}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, userName: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Photo URL</label>
                <input
                  type="text"
                  value={editForm.userPhoto}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, userPhoto: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Address</label>
                <input
                  type="text"
                  value={editForm.userAddress}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, userAddress: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200"
                />
              </div>
              <button
                onClick={handleEditSave}
                disabled={editLoading}
                className={`w-full py-3 rounded-xl text-white font-semibold ${
                  editLoading ? "bg-gray-400" : "bg-[#628141] hover:bg-[#4f6b32]"
                }`}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageUsers;
