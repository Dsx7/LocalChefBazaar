import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";

const ReviewModal = ({ setOpen, mealId, user, refetch, mealName }) => {
  const axiosSecure = useAxiosSecure();
  const {userData} = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully ⭐");
      refetch(); 
      reset();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to submit review ❌");
    },
  });

  const onSubmit = (data) => {
    const reviewInfo = {
      foodId: mealId,
      mealName,
      reviewerEmail: user?.email,
      reviewerName: userData?.userName,
      reviewerImage: userData?.userPhoto,
      rating: Number(data.rating),
      comment: data.comment
    };

    reviewMutation.mutate(reviewInfo);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 dark:bg-primary">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary">Write a Review</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="e.g. 4.5"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              {...register("rating", {
                required: "Rating is required",
                min: { value: 0, message: "Minimum rating is 0" },
                max: { value: 5, message: "Maximum rating is 5" },
              })}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              rows="4"
              placeholder="Write your review..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              {...register("comment", {
                required: "Comment is required",
              })}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={reviewMutation.isLoading}
            className="w-full btn bg-[#628141] border-primary shadow-none py-6 rounded-xl text-lg font-semibold text-white"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
