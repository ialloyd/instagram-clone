import React, { useContext } from 'react'
import { Typography, Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'
import userContext from '../context/userContext';
import axios from 'axios';

const Navbar = () => {

    let userToken = localStorage.getItem('token')

    const navigate = useNavigate()

    const { setToken } = useContext(userContext)


    async function logout() {

        try {

            const response = await axios.delete(`https://instagram-express-app.vercel.app/api/auth/logout`, {
                headers: {
                    authorization: `Bearer ${userToken}`
                }
            })

            toast.success(`${response.data.message}!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            localStorage.removeItem('token');
            setToken('');
            navigate("/")

        }

        catch (error) {

            toast.error(`${error.response.data.message}!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2} style={{
                    padding: '25px', boxShadow: '0 5px 5px -5px gray', position: 'sticky',
                    top: 0,
                    zIndex: 1, backgroundColor: 'white'
                }}>
                <Link to="/home" style={{textDecoration:'none'}}>
                    <Typography variant='h4' style={{ fontFamily: 'Satisfy, Arial, sans-serif', cursor: 'pointer' }}>
                        Instagram
                    </Typography>
                </Link>
                <Stack direction="row"
                    justifyContent="space-between"
                    alignItems="center" spacing={2}>
                    <Link to="/profile">
                        <Button variant="outlined">
                            Profile
                        </Button>
                    </Link>
                    <Link to="/create">
                        <Button variant="outlined">
                            Create Post
                        </Button>
                    </Link>
                    <Button variant="contained" color="error" onClick={logout}>
                        Logout
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}

export default Navbar