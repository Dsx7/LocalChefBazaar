import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const EditProfileModal = ({ onClose, refetchProfile, address }) => {
  const { user, updateUserProfile, changePassword } = useAuth();
  const { userData } = useUser();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.photoURL || "");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const isPasswordProvider = user?.providerData?.some(
    (provider) => provider.providerId === "password"
  );

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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // à¦ªà§à¦°à¦¿à¦­à¦¿à¦‰ à¦‡à¦®à§‡à¦œ
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
      const wantsPasswordUpdate =
        data.currentPassword?.trim() ||
        data.newPassword?.trim() ||
        data.confirmPassword?.trim();

      if (wantsPasswordUpdate) {
        if (!isPasswordProvider) {
          throw new Error("Password updates are only available for email/password accounts.");
        }
        if (!data.newPassword || !data.confirmPassword) {
          throw new Error("Please enter and confirm your new password.");
        }
        if (data.newPassword !== data.confirmPassword) {
          throw new Error("New password and confirmation do not match.");
        }
        await changePassword(data.currentPassword, data.newPassword);
      }

      // à¦ªà§à¦°à¦¥à¦®à§‡ Firebase-à¦ à¦†à¦ªà¦¡à§‡à¦Ÿ à¦•à¦°à§‹ (à¦¯à¦¦à¦¿ à¦¥à¦¾à¦•à§‡)
      if (updateUserProfile) {
        await updateUserProfile({
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }

      // Backend-à¦ à¦†à¦ªà¦¡à§‡à¦Ÿ à¦•à¦°à§‹ (à¦¯à¦¦à¦¿ MongoDB-à¦¤à§‡ user profile à¦¸à§‡à¦­ à¦¥à¦¾à¦•à§‡)
      const res = await axiosSecure.patch(`/users/${user?.email}`, {
        userName: data.displayName,
        userPhoto: data.photoURL,
        userAddress: data.address
      });

      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("Profile updated successfully! ðŸŽ‰");
        refetchProfile(); // à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦² à¦°à¦¿à¦«à§à¦°à§‡à¦¶ à¦•à¦°à§‹
        onClose();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.",
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
          Ã—
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

          {/* Password Update */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Update Password
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Leave blank if you don't want to change it.
              </p>
              {!isPasswordProvider && (
                <p className="text-xs text-amber-600 mt-1">
                  Password updates are disabled for Google accounts.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                disabled={!isPasswordProvider}
                {...register("currentPassword")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition disabled:opacity-60"
                placeholder="Enter current password"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    disabled={!isPasswordProvider}
                    {...register("newPassword", {
                      minLength: { value: 8, message: "Minimum 8 characters required" },
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition disabled:opacity-60 pr-12"
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-3 text-xs text-gray-500"
                  >
                    {showNewPass ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    disabled={!isPasswordProvider}
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition disabled:opacity-60 pr-12"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-3 text-xs text-gray-500"
                  >
                    {showConfirmPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
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
