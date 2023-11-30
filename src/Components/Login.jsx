import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextField, Button, Stack, Box, Typography } from '@mui/material';

const Login = () => {

    const [cred, setCred] = useState({ email: '', password: '' });

    const { setToken } = useContext(userContext);

    const navigate = useNavigate();

    const { email, password } = cred;

    function credentials(e) {

        setCred({ ...cred, [e.target.name]: e.target.value });

    }

    async function userLogin() {

        if (!email || !password) {

            toast.warning('All fields required!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            const response = await axios.post('https://instagram-express-app.vercel.app/api/auth/login', { email, password })

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

            setCred({ email: '', password: '' })

            setToken(response.data.data.token)
            localStorage.setItem('token', response.data.data.token)

            setTimeout(() => {
                navigate("/home")
            }, 3000);
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
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    direction="column" spacing={2}>
                    <Typography variant='h4' style={{ fontFamily: 'Satisfy, Arial, sans-serif' }}>
                        Instagram
                    </Typography>
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Email"
                        name='email'
                        value={email}
                        onChange={event => credentials(event)}
                    />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Password"
                        type='password' name='password' value={password}
                        onChange={event => credentials(event)}
                    />
                    <Button variant="contained" color="primary" onClick={userLogin} style={{ width: '100%' }}>
                        Login
                    </Button>
                    <Typography>
                        Don't have an account?
                    </Typography>
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'rgb(24,113,205)' }}>SignUp</Link>
                </Stack>
            </Box>
    )
}

export default Login