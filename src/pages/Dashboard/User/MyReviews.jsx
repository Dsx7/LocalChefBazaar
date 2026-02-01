import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyReviews = () => {
  const { userData } = useUser()
  const axiosSecure = useAxiosSecure()
  // SAMPLE DATA
  const [reviews, setReviews] = useState([]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["reviews", userData?.userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${userData?.userEmail}`)
      setReviews(res.data)
    }
  })

  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, updated }) => {
      const res = await axiosSecure.patch(`/reviews/${id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review updated ⭐");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update review ❌");
    },
  });

  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId) => {
      const res = await axiosSecure.delete(
        `/reviews/${reviewId}?email=${reviewId}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review deleted successfully 🗑️");
      setDeleteModal(null)
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: () => {
      toast.error("Failed to delete review ❌");
    },
  });

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({ rating: 0, comment: "" });

  // Update Review Submit
  const handleUpdate = (id, updated) => {
    updateReviewMutation.mutate({ id, updated });
    setEditModal(false)
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
      <title>My Reviews | LocalChefBazaar</title>
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#628141] mb-8">
          My Reviews
        </h1>
        <p className="text-xl font-semibold">Total Reviews: {reviews.length}</p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md border border-gray-500 p-6  dark:bg-primary"
          >
            {/* Meal Name + Date */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {review.mealName}
              </h2>
              <p className="text-gray-500 text-sm">
                {new Date(review.createdAt).toDateString()}
              </p>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mt-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-yellow-500 text-lg">
                  ★
                </span>
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-700 mt-3 text-sm leading-relaxed dark:text-white">
              {review.comment}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-5">
              <button
                onClick={() => {
                  setUpdatedData({
                    rating: review.rating,
                    comment: review.comment,
                  });
                  setEditModal(review._id);
                }}
                className="flex items-center gap-2 bg-[#628141] text-info-content px-4 py-2 rounded-lg text-sm shadow cursor-pointer "
              >
                <FaEdit /> Update
              </button>

              <button
                onClick={() => setDeleteModal(review._id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-info-content px-4 py-2 rounded-lg text-sm shadow cursor-pointer"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* update modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 dark:bg-primary"
            >
              <h3 className="text-xl font-semibold mb-4">Update Review</h3>

              {/* Rating */}
              <label className="text-sm font-medium">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={updatedData.rating}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, rating: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />

              {/* Comment */}
              <label className="text-sm font-medium">Comment</label>
              <textarea
                value={updatedData.comment}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, comment: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 mt-1 h-28 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              ></textarea>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditModal(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(editModal, updatedData)}
                  className="px-4 py-2 bg-[#628141] text-white rounded-lg cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-3">Delete Review?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteReviewMutation.mutate(deleteModal)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default MyReviews;