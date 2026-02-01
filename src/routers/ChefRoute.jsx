import { Navigate, useLocation } from "react-router";
import useUser from "../hooks/useUser";

const ChefRoute = ({ children }) => {
    const { userData, userLoading } = useUser();
    const location = useLocation();

    if (userLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }    

    if (userData.userRole !== 'chef') {
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

export default ChefRoute;