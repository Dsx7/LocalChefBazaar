import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const AdminRoute = ({ children }) => {
    const { userData, userLoading } = useUser();
    const location = useLocation();

    if (userLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }
   

    if (userData.userRole !== 'admin') {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default AdminRoute;