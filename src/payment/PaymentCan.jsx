import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";
const PaymentCan = () => {
  return (
    <>
    <title>Payment Cancelled | LocalChefBazaar</title>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-8 text-center">
        
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-600 text-sm md:text-base mb-6">
          Your payment was not completed.  
          No amount has been charged. You can try again anytime.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/my-orders"
            className="btn btn-primary border-primary shadow-none w-full"
          >
            Try Payment Again
          </Link>

          <Link
            to="/"
            className="btn btn-outline w-full"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentCan;
