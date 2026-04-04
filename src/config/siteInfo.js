export const siteInfo = {
  brandName: "LocalChefBazaar",
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE || "",
    email: import.meta.env.VITE_CONTACT_EMAIL || "",
    address: import.meta.env.VITE_CONTACT_ADDRESS || "",
    supportHours: import.meta.env.VITE_SUPPORT_HOURS || "",
  },
  socials: {
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || "",
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || "",
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || "",
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || "",
  },
};
