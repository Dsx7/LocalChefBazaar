import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const EditProfileModal = ({ onClose, refetchProfile, address }) => {
  const { user, updateUserProfile } = useAuth(); // তোমার useAuth-এ updateUserProfile ফাংশন থাকা উচিত
  const { userData } = useUser();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.photoURL || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      address: address || "",
      photoURL: user?.photoURL || "",
    },
  });

  // প্রিভিউ ইমেজ
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("photoURL", reader.result); // temporary URL
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // প্রথমে Firebase-এ আপডেট করো (যদি থাকে)
      if (updateUserProfile) {
        await updateUserProfile({
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }

      // Backend-এ আপডেট করো (যদি MongoDB-তে user profile সেভ থাকে)
      const res = await axiosSecure.patch(`/users/${user?.email}`, {
        userName: data.displayName,
        userPhoto: data.photoURL,
        userAddress: data.address
      });

      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("Profile updated successfully! 🎉");
        refetchProfile(); // প্রোফাইল রিফ্রেশ করো
        onClose();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-6 text-white">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-white text-2xl hover:text-gray-200 transition cursor-pointer"
        >
          ×
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
              <img
                src={previewImage || "/placeholder-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
              Choose New Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <input type="hidden" {...register("photoURL")} />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("displayName", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition"
              placeholder="Your full name"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>
            )}
          </div>

          {/* Email */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="address"
              {...register("email", { required: "Address is required" })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition"
              placeholder="Your Address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div> */}

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition"
              placeholder="Your Address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
              }`}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;