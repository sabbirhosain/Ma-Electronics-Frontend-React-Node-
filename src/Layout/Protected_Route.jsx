import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth_Context } from '../Context/Auth_Context';

const Protected_Route = () => {
    const { auth, isTokenExpired, authLoading } = useAuth_Context();
    const location = useLocation();

    if (authLoading) {
        return <div className='vh-100 d-flex align-items-center justify-content-center'>Loading...</div>
    }

    if (!auth || !auth.access || isTokenExpired(auth.access)) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    
    return <Outlet />
};

export default Protected_Route;
