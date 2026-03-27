import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const SubscriptionSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post("/subscription-success", {
        sessionId,
        userName: user?.displayName || "",
      });
    }
  }, [sessionId, axiosSecure, user]);

  return (
    <>
      <title>Subscription Success | LocalChefBazaar</title>

      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Subscription Active!
          </h1>

          <p className="text-gray-600 text-sm md:text-base mb-6">
            Your subscription is active. You can manage it anytime from your
            dashboard.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 mb-6">
            You will receive an email confirmation shortly.
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/dashboard/my-subscriptions"
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Manage Subscriptions
            </Link>

            <Link
              to="/"
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SubscriptionSuccess;
