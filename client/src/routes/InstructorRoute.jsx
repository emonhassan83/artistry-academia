import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader/Loader";
import { useInstructor } from "../hooks/useInstructor";

const InstructorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return <Loader/>;
    }

    if (user && isInstructor) {
        return children;
    }
    
    return <Navigate to="/" state={{form: location}} replace></Navigate>
};

export default InstructorRoute;