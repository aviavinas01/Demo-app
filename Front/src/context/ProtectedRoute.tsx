import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './Auth/AuthContext'; // Adjust path if you put this elsewhere

interface ProtectedRouteProps {
    children: React.ReactNode;
    // This lets us require just a login, or a full profile completion
    requireProfile?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireProfile = true }) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    // Safety catch if context is somehow undefined
    if (!authContext) {
        return <Navigate to="/login" replace />;
    }

    const { authData } = authContext;

    // RULE 1: Not logged in at all? Kick to login screen.
    // We save their 'location' so after they log in, we can send them back to where they wanted to go!
    if (!authData.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // RULE 2: Logged in, but haven't finished their Krayaa profile setup? Kick to onboarding.
    if (requireProfile && !authData.hasProfile) {
        return <Navigate to="/complete-profile" replace />;
    }

    // Passed all security checks! Let them into the page.
    return <>{children}</>;
};

export default ProtectedRoute;