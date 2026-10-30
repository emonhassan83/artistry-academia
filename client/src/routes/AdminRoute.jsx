import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Loader/Loader";

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loader/>;
    }

    if (user && isAdmin) {
        return children;
    }
    
    return <Navigate to="/" state={{form: location}} replace></Navigate>
};

export default AdminRoute;