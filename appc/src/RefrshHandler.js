import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefrshHandler() {
    const [IsAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsAuthenticated(false);
            if (location.pathname === '/Dashboard' ||
                location.pathname === '/createroom'
            ) {
                navigate('/', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefrshHandler