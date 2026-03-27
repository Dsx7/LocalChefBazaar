import React from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaPause, FaPlay, FaSyncAlt } from "react-icons/fa";

const MySubscriptions = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const { data: plans = [], isLoading: plansLoading } = useQuery({
    queryKey: ["subscriptionPlansAll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscription-plans");
      return res.data;
    },
  });

  const { data: subscriptions = [], isLoading: subsLoading } = useQuery({
    queryKey: ["subscriptions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscriptions?email=${user?.email}`);
      return res.data;
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (planId) => {
      const res = await axiosSecure.post("/create-subscription-session", {
        planId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      window.location.assign(data.url);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to start subscription");
    },
  });

  const pauseMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await axiosSecure.patch(`/subscriptions/${id}/pause`, {
        action,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Subscription updated");
      queryClient.invalidateQueries(["subscriptions", user?.email]);
    },
    onError: () => {
      toast.error("Failed to update subscription");
    },
  });

  const skipMutation = useMutation({
    mutationFn: async ({ id, skipNext }) => {
      const res = await axiosSecure.patch(`/subscriptions/${id}/skip`, {
        skipNext,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Skip updated");
      queryClient.invalidateQueries(["subscriptions", user?.email]);
    },
    onError: () => {
      toast.error("Failed to update skip");
    },
  });

  if (loading || plansLoading || subsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <title>My Subscriptions | LocalChefBazaar</title>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-[#628141] mb-8"
      >
        My Subscriptions
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 dark:bg-primary">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Available Plans
          </h2>
          <div className="space-y-4">
            {plans.length === 0 && (
              <p className="text-gray-600">No plans available right now.</p>
            )}
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="border border-gray-200 rounded-xl p-4 flex items-center justify-between dark:border-gray-700"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {plan.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {plan.interval === "week" ? "Weekly" : "Monthly"} • $
                    {plan.price}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white">
                    Chef: {plan.chefName || plan.chefId}
                  </p>
                </div>
                <button
                  onClick={() => subscribeMutation.mutate(plan._id)}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-green-700 transition cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 dark:bg-primary">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Your Active Subscriptions
          </h2>
          <div className="space-y-4">
            {subscriptions.length === 0 && (
              <p className="text-gray-600">You have no subscriptions yet.</p>
            )}
            {subscriptions.map((sub) => {
              const periodStart = sub.currentPeriodStart
                ? new Date(sub.currentPeriodStart).toLocaleDateString()
                : "N/A";
              const periodEnd = sub.currentPeriodEnd
                ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                : "N/A";
              const isPaused = sub.isPaused;

              return (
                <div
                  key={sub._id}
                  className="border border-gray-200 rounded-xl p-4 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {sub.planName || "Plan"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {sub.interval || "interval"} • $
                        {sub.price || "0"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        isPaused
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isPaused ? "Paused" : "Active"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 dark:text-white">
                    Current period: {periodStart} - {periodEnd}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() =>
                        pauseMutation.mutate({
                          id: sub._id,
                          action: isPaused ? "resume" : "pause",
                        })
                      }
                      className="px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      {isPaused ? (
                        <>
                          <FaPlay className="inline mr-1" /> Resume
                        </>
                      ) : (
                        <>
                          <FaPause className="inline mr-1" /> Pause
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        skipMutation.mutate({
                          id: sub._id,
                          skipNext: !sub.skipNext,
                        })
                      }
                      className="px-3 py-2 rounded-lg text-sm font-semibold bg-orange-100 text-orange-700 hover:bg-orange-200 transition"
                    >
                      <FaSyncAlt className="inline mr-1" />
                      {sub.skipNext ? "Unskip Next" : "Skip Next"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MySubscriptions;
