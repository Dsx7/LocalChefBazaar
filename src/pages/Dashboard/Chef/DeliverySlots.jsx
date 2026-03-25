import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import toast from "react-hot-toast";
import { FaToggleOn, FaToggleOff, FaTrash, FaPlus } from "react-icons/fa";

const DeliverySlots = () => {
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
      date: "",
      startTime: "",
      endTime: "",
      capacity: 5,
    },
  });

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ["chefSlots", userData?.chefId],
    enabled: !!userData?.chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/schedules?chefId=${userData?.chefId}&includeInactive=true`
      );
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/schedules", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Delivery slot added");
      reset();
      queryClient.invalidateQueries(["chefSlots"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add slot");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }) => {
      const res = await axiosSecure.patch(`/schedules/${id}`, { isActive });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Slot updated");
      queryClient.invalidateQueries(["chefSlots"]);
    },
    onError: () => {
      toast.error("Failed to update slot");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/schedules/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Slot deleted");
      queryClient.invalidateQueries(["chefSlots"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete slot");
    },
  });

  const onSubmit = (data) => {
    if (!userData?.chefId) return;

    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Dhaka";

    const payload = {
      chefId: userData.chefId,
      chefName: userData.userName,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      capacity: Number(data.capacity),
      timezone,
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
      <title>Delivery Slots | LocalChefBazaar</title>
      <div className="min-h-screen bg-gradient-to-b from-accent to-gray-100 px-4 md:px-6 py-12 dark:to-[#363636]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
        >
          Delivery Slots
        </motion.h1>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 dark:bg-primary">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-4 gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("startTime", { required: "Start time is required" })}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                End Time
              </label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("endTime", { required: "End time is required" })}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.endTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                {...register("capacity", {
                  required: "Capacity is required",
                  min: { value: 1, message: "Minimum capacity is 1" },
                })}
              />
              {errors.capacity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div className="md:col-span-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff8400] text-white rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
              >
                <FaPlus /> Add Slot
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {slots.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-600 dark:bg-primary">
              No slots yet. Add your first delivery slot above.
            </div>
          )}

          {slots.map((slot) => {
            const isActive = slot.isActive;
            return (
              <div
                key={slot._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 dark:bg-primary"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {slot.date}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 text-sm text-gray-700 dark:text-white space-y-1">
                  <p>
                    Capacity:{" "}
                    <span className="font-semibold">
                      {slot.remaining}/{slot.capacity}
                    </span>
                  </p>
                  <p>
                    Timezone:{" "}
                    <span className="font-semibold">
                      {slot.timezone || "Asia/Dhaka"}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      toggleMutation.mutate({
                        id: slot._id,
                        isActive: !isActive,
                      })
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      isActive
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {isActive ? <FaToggleOff /> : <FaToggleOn />}
                    {isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(slot._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DeliverySlots;
