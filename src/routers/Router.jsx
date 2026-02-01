import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers"
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests"
import PlatformStats from "../pages/Dashboard/Admin/PlatformStats"
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import Favorites from "../pages/Dashboard/User/Favorites";
import FavoriteMeal from "../pages/Dashboard/User/FavoriteMeal";
import CreateMeal from "../pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../pages/Dashboard/Chef/MyMeals";
import OrderPage from "../pages/Order/OrderPage";
import OrderRequests from "../pages/Dashboard/Chef/OrderRequests";
import FindProfile from "../pages/Dashboard/FindProfile";
import AuthProvider from "../context/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import PaymentSuc from "../payment/PaymentSuc";
import PaymentCan from "../payment/PaymentCan";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";
import UserRoute from "./UserRoute";
import Errorpage from "../components/ErrorPage/ErrorPage";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import MealsPge from "../pages/Meals/MealsPage";
import MealsPage from "../pages/Meals/MealsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/meals",
        element: <MealsPage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/meals/:mealId",
        element: <MealDetails />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/*",
        element: <Errorpage />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    children: [
      {
        index: true,
        element: <FindProfile />,
      },
      // Admin Panel
      {
        path: "manage-users",
        element: <AdminRoute>
          <ManageUsers />
        </AdminRoute>
      },
      {
        path: "manage-requests",
        element: <AdminRoute>
          <ManageRequests />
        </AdminRoute>
      },
      {
        path: "platform-statistics",
        element: <AdminRoute>
          <PlatformStats />
        </AdminRoute>
      },
      // Chef Panel
      {
        path: "create-meal",
        element: <ChefRoute>
          <CreateMeal />
        </ChefRoute>
      },
      {
        path: "my-meals",
        element: <ChefRoute>
          <MyMeals />
        </ChefRoute>
      },
      {
        path: "order-requests",
        element: <ChefRoute>
          <OrderRequests />
        </ChefRoute>
      },
      // User Panel
      {
        path: "my-orders",
        element: <UserRoute>
          <MyOrders />
        </UserRoute>
      },
      {
        path: "my-reviews",
        element: <UserRoute>
          <MyReviews />
        </UserRoute>
      },
      {
        path: "favorite-meals",
        element: <UserRoute>
          <FavoriteMeal />
        </UserRoute>
      },
      //Payment related route
      {
        path: "payment-success",
        element: <PaymentSuc />,
      },
      {
        path: "payment-cancel",
        element: <PaymentCan />,
      }
    ]
  }
]);