import { motion } from "framer-motion";
import { Link } from "react-router";

const SubscriptionCancel = () => {
  return (
    <>
      <title>Subscription Cancelled | LocalChefBazaar</title>

      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Subscription Cancelled
          </h1>

          <p className="text-gray-600 text-sm md:text-base mb-6">
            Your subscription checkout was cancelled. You can try again anytime.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/dashboard/my-subscriptions"
              className="w-full py-3 rounded-xl bg-primary hover:bg-green-700 text-white font-semibold transition"
            >
              Back to Subscriptions
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

export default SubscriptionCancel;
