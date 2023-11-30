import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import '@fontsource/satisfy/400.css';

const Signup = () => {

    const [cred, setCred] = useState({ name: '', email: '', password: '' });

    const { setToken } = useContext(userContext);

    const navigate = useNavigate();

    const { name, email, password } = cred;

    function credentials(e) {

        setCred({ ...cred, [e.target.name]: e.target.value });

    }

    async function userSignUp() {

        if (!email || !password || !name) {

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
        else if (!name.includes(' ')) {

            toast.error(`Enter Full Name!`, {
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
        else if (!email.includes('@')) {

            toast.error(`Enter Valid Email!`, {
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
        else if (password.length < 8) {

            toast.error(`Password should have atleast 8 characters!`, {
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
            const response = await axios.post('https://instagram-express-app.vercel.app/api/auth/signup', { name, email, password })

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

            setCred({ name: '', email: '', password: '' })

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
                    label="Name"
                    name='name'
                    value={name}
                    onChange={event => credentials(event)}
                />
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
                <Button variant="contained" color="primary" onClick={userSignUp} style={{ width: '100%' }}>
                    SignUp
                </Button>
                <Typography>
                    Have an account?
                </Typography>
                <Link to="/" style={{ textDecoration: 'none', color: 'rgb(24,113,205)' }}>Login</Link>
            </Stack>
        </Box>
    )
}

export default Signup