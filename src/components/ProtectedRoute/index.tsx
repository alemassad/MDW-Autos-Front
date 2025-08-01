import type { User } from "firebase/auth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, user}: {children: JSX.Element, user: User| null}) => {
    return user? children: <Navigate to={'/'} />;
}

export default ProtectedRoute;