import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import toast from "react-hot-toast";
import { FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

const SubscriptionPlans = () => {
  const axiosSecure = useAxiosSecure();
  const { userData, userLoading } = useUser();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      interval: "week",
      price: "",
      mealsPerInterval: 5,
      description: "",
    },
  });

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["subscriptionPlans", userData?.chefId],
    enabled: !!userData?.chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/subscription-plans?chefId=${userData?.chefId}&activeOnly=false`
      );
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/subscription-plans", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Subscription plan created");
      reset();
      queryClient.invalidateQueries(["subscriptionPlans", userData?.chefId]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create plan");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }) => {
      const res = await axiosSecure.patch(`/subscription-plans/${id}`, {
        isActive,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Plan updated");
      queryClient.invalidateQueries(["subscriptionPlans", userData?.chefId]);
    },
    onError: () => {
      toast.error("Failed to update plan");
    },
  });

  const onSubmit = (data) => {
    if (!userData?.chefId) return;

    const payload = {
      chefId: userData.chefId,
      chefName: userData.userName,
      name: data.name,
      interval: data.interval,
      price: Number(data.price),
      mealsPerInterval: Number(data.mealsPerInterval),
      description: data.description,
    };

    createMutation.mutate(payload);
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
      <title>Subscription Plans | LocalChefBazaar</title>
      <div className="min-h-screen bg-gradient-to-b from-accent to-gray-100 px-4 md:px-6 py-12 dark:to-[#363636]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
        >
          Subscription Plans
        </motion.h1>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 dark:bg-primary">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Plan Name
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("name", { required: "Plan name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Interval
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("interval", { required: true })}
              >
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Price (USD)
              </label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least 1" },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Meals per Interval
              </label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("mealsPerInterval", {
                  required: true,
                  min: { value: 1, message: "Minimum 1 meal" },
                })}
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Description (optional)
              </label>
              <textarea
                rows={3}
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("description")}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff8400] text-white rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
              >
                <FaPlus /> Create Plan
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-600 dark:bg-primary">
              No plans yet. Create your first subscription plan above.
            </div>
          )}

          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 dark:bg-primary"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {plan.interval === "week" ? "Weekly" : "Monthly"} • $
                    {plan.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-white">
                    Meals: {plan.mealsPerInterval || 0} per {plan.interval}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    plan.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {plan.description && (
                <p className="text-sm text-gray-600 mt-3 dark:text-white">
                  {plan.description}
                </p>
              )}

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() =>
                    toggleMutation.mutate({
                      id: plan._id,
                      isActive: !plan.isActive,
                    })
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    plan.isActive
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {plan.isActive ? <FaToggleOff /> : <FaToggleOn />}
                  {plan.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlans;
