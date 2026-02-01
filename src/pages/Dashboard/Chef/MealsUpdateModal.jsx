import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MealsUpdateModal = ({ meal, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      foodName: meal.foodName,
      price: meal.price,
      rating: meal.rating,
      estimatedDeliveryTime: meal.estimatedDeliveryTime,
      ingredients: meal.ingredients.join(", "),
    },
  });

  const onSubmit = async (data) => {
    const updatedMeal = {
      foodName: data.foodName,
      price: data.price,
      rating: data.rating,
      estimatedDeliveryTime: data.estimatedDeliveryTime,
      ingredients: data.ingredients.split(",").map(i => i.trim()),
    };

    try {
      await axiosSecure.put(`/meals/${meal._id}`, updatedMeal);
      toast.success("Meal updated successfully 🍽️");
      refetch();
      onClose();
    } catch (error) {
      toast.error("Failed to update meal ❌");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 relative max-h-[70vh] overflow-y-auto dark:bg-primary"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#628141] mb-6">
          Update Meal
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="font-semibold text-sm">Food Name</label>
            <input
              {...register("foodName", { required: "Food name is required" })}
              className="w-full mt-1 px-4 py-3 border rounded-xl"
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm">{errors.foodName.message}</p>
            )}
          </div>

          <div>
            <label className="font-semibold text-sm">Price (৳)</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="w-full mt-1 px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Rating (1–5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating")}
              className="w-full mt-1 px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Delivery Time</label>
            <input
              {...register("estimatedDeliveryTime")}
              className="w-full mt-1 px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Ingredients</label>
            <textarea
              rows={3}
              {...register("ingredients")}
              className="w-full mt-1 px-4 py-3 border rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-primary text-white"
            >
              Update Meal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MealsUpdateModal;
