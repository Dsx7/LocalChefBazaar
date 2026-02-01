# 🥘 LocalChefBazaar

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-2ea44f?style=for-the-badge&logo=vercel)](https://local-chef-bazaar-rust.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-blueviolet?style=for-the-badge)

**A modern marketplace connecting home cooks with food lovers.** *Fresh, homemade meals delivered from local kitchens to your doorstep.*

</div>

---

## 📖 Project Purpose

**LocalChefBazaar** is a comprehensive online platform designed to bridge the gap between passionate home cooks and customers seeking authentic, hygienic, and fresh homemade meals. 

- **For Customers:** Browse daily menus, place orders, read reviews, and enjoy safe delivery.
- **For Chefs:** A dedicated platform to manage menus, track orders, and grow their culinary business.
- **For Admins:** Complete control over user roles, platform requests, and financial statistics.

---

## 🔐 Credentials & Live Demo

**🌐 Client URL:** [https://local-chef-bazaar-rust.vercel.app/](https://local-chef-bazaar-rust.vercel.app/)

Use the following credentials to explore the different dashboards:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **👨‍💼 Admin** | `admin@gmail.com` | `Admin@1234` | Full Platform Control |
| **👨‍🍳 Chef** | `chef1@gmail.com` | `Chef@1234` | Meal & Order Management |
| **🙍‍♂️ User** | `user@gmail.com` | `User@1234` | Ordering & Reviews |

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database & Auth | Tools & Payments |
| :---: | :---: | :---: | :---: |
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=flat&logo=Stripe&logoColor=white) |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=flat) | ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=flat&logo=Firebase&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |
| **Framer Motion** | **JWT** | | **TanStack Query** |

</div>

---

## 🚀 Key Features

### 🛡️ Authentication & Security
* **Firebase Authentication:** Secure email/password login and registration.
* **JWT Protection:** Secure access tokens for private API routes.
* **Role-Based Access:** Distinct dashboards for Admins, Chefs, and Users.

### 🍱 Meal Management
* **Dynamic Browsing:** Sort meals by price, rating, or category.
* **Pagination:** Efficient loading of large datasets.
* **Interactive Details:** View ingredients, chef profiles, and customer reviews.
* **Favorites:** Users can save meals to their wishlist.

### 🛒 Ordering & Payments
* **Seamless Checkout:** Auto-filled user details for quick ordering.
* **Stripe Integration:** Secure credit card payments.
* **Order Tracking:** Live status updates (Pending → Cooking → Delivered).

---

## 📊 Dashboard Overview

### 👨‍🍳 Chef Dashboard
> *For the creators.*
* **Manage Meals:** Add new dishes (CRUD), update prices/images.
* **Order Request:** Accept or reject incoming orders.
* **My Menu:** View active listings.

### 📊 Admin Dashboard
> *For the platform managers.*
* **User Management:** View all users, promote users to Chefs/Admins.
* **Security:** Mark suspicious accounts as fraud.
* **Statistics:** Visual charts (Recharts) showing revenue, total orders, and user growth.

### 🙍‍♂️ User Dashboard
> *For the foodies.*
* **Profile:** Manage personal details and request to become a Chef.
* **My Orders:** View order history and payment status.
* **My Reviews:** Manage submitted ratings and comments.

---

## 📦 Key Dependencies

<details>
<summary>Click to view Client-side Packages</summary>

* `@tanstack/react-query`: Data fetching and caching.
* `axios`: HTTP requests.
* `firebase`: Authentication.
* `framer-motion`: Animations.
* `react-hook-form`: Form handling.
* `react-hot-toast` / `sweetalert2`: Notifications.
* `recharts`: Data visualization charts.
* `stripe-js`: Payment processing UI.
* `tailwindcss`: Styling.

</details>

<details>
<summary>Click to view Server-side Packages</summary>

* `express`: Web framework.
* `mongodb`: Database driver.
* `firebase-admin`: Server-side auth verification.
* `stripe`: Payment backend logic.
* `cors`: Cross-origin resource sharing.
* `dotenv`: Environment variable management.

</details>

---
