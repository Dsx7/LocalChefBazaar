import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MealsUpdateModal = ({ meal, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const dietaryOptions = [
    { label: "Halal", value: "halal" },
    { label: "Vegan", value: "vegan" },
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Gluten-Free", value: "gluten-free" },
    { label: "Keto", value: "keto" },
    { label: "Dairy-Free", value: "dairy-free" },
  ];
  const allergenOptions = [
    { label: "Peanuts", value: "peanuts" },
    { label: "Tree Nuts", value: "tree-nuts" },
    { label: "Dairy", value: "dairy" },
    { label: "Eggs", value: "eggs" },
    { label: "Gluten", value: "gluten" },
    { label: "Soy", value: "soy" },
    { label: "Shellfish", value: "shellfish" },
    { label: "Sesame", value: "sesame" },
  ];

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
      subscriptionEligible: meal.subscriptionEligible || false,
      dietaryTags: meal.dietaryTags || [],
      allergens: meal.allergens || [],
      calories: meal?.nutrition?.calories || "",
      protein: meal?.nutrition?.protein || "",
      carbs: meal?.nutrition?.carbs || "",
      fat: meal?.nutrition?.fat || "",
      additionalImages: meal.foodImages?.join(", ") || "",
    },
  });

  const onSubmit = async (data) => {
    const normalizeArray = (value) =>
      Array.isArray(value) ? value : value ? [value] : [];

    const extraImages = data.additionalImages
      ? data.additionalImages.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const updatedMeal = {
      foodName: data.foodName,
      price: data.price,
      rating: data.rating,
      estimatedDeliveryTime: data.estimatedDeliveryTime,
      ingredients: data.ingredients.split(",").map(i => i.trim()),
      subscriptionEligible: data.subscriptionEligible === true || data.subscriptionEligible === "true",
      dietaryTags: normalizeArray(data.dietaryTags),
      allergens: normalizeArray(data.allergens),
      foodImages: extraImages,
      nutrition: {
        calories: Number(data.calories || 0),
        protein: Number(data.protein || 0),
        carbs: Number(data.carbs || 0),
        fat: Number(data.fat || 0),
      },
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

          <div>
            <label className="font-semibold text-sm">Dietary Tags</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {dietaryOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    {...register("dietaryTags")}
                    className="w-4 h-4 accent-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">Allergen Warnings</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {allergenOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    {...register("allergens")}
                    className="w-4 h-4 accent-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">Nutrition (per serving)</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <input
                type="number"
                min="0"
                placeholder="Calories"
                {...register("calories")}
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                type="number"
                min="0"
                placeholder="Protein (g)"
                {...register("protein")}
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                type="number"
                min="0"
                placeholder="Carbs (g)"
                {...register("carbs")}
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                type="number"
                min="0"
                placeholder="Fat (g)"
                {...register("fat")}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">
              Additional Image URLs (comma separated)
            </label>
            <input
              type="text"
              placeholder="https://... , https://..."
              {...register("additionalImages")}
              className="w-full mt-2 px-4 py-3 border rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              value="true"
              {...register("subscriptionEligible")}
              className="w-4 h-4 accent-primary"
            />
            <label className="font-semibold text-sm">
              Subscription Eligible
            </label>
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
