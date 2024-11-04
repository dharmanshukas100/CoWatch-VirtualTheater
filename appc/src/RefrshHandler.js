// import { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// function RefrshHandler({ setIsAuthenticated }) {
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             setIsAuthenticated(true);
//             if (location.pathname === '/Dashboard' ||
//                 location.pathname === '/login' ||
//                 location.pathname === '/signup'
//             ) {
//                 navigate('/', { replace: false });
//             }
//         }
//     }, [location, navigate, setIsAuthenticated])

//     // useEffect(() => {
//     //     if (!localStorage.getItem('token')) {
//     //         setIsAuthenticated(false);
//     //         if (location.pathname === '/Dashboard'
//     //         ) {
//     //             navigate('/home', { replace: true });
//     //         }
//     //     }
//     // }, [location, navigate, setIsAuthenticated])

//     return (
//         null
//     )
// }

// export default RefrshHandler