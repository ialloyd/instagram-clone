import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [navigate, token]);

    return token ? children : navigate('/');

};
