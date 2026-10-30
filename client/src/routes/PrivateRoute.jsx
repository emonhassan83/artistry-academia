import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (user) {
        return children;
    }
    if (loading) {
        return <Loader/>;
    }
    return <Navigate to="/login" state={{form: location}} replace></Navigate>
};

export default PrivateRoute;