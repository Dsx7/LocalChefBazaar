import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ContactMessages = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["contactMessages", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contacts?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/contacts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contactMessages"]);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const contacts = data?.contacts || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  };

  return (
    <>
      <title>Contact Messages | LocalChefBazaar</title>
      <div className="min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-[#628141] mb-8">
          Contact Messages
        </h1>

        {contacts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
            <p className="text-gray-600">No messages found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Phone</th>
                  <th className="text-left px-6 py-4">Message</th>
                  <th className="text-left px-6 py-4">Date</th>
                  <th className="text-left px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[320px]">
                      <p className="line-clamp-3">{item.message}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteMutation.mutate(item._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 text-xs font-semibold hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactMessages;
