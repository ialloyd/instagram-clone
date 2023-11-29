import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [navigate, token]);

    return !token ? children : null;

}