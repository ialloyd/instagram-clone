import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [cred, setCred] = useState({ email: '', password: '' });

    const { setToken } = useContext(userContext);

    const navigate = useNavigate();

    const { email, password } = cred;

    function credentials(e) {

        setCred({ ...cred, [e.target.name]: e.target.value })

    }

    async function userLogin() {

        try {
            const response = await axios.post('https://instagram-express-app.vercel.app/api/auth/login', { email, password })
            setCred({ email: '', password: '' })
            console.log(response)
            setToken(response.data.data.token)
            console.log(response.data.data.token)
           
            alert(`Message : ${response.data.message}`)
            navigate("/profile")

        }
        catch (error) {
            console.log(error)
            alert(`Message : ${error.response.data.message}`)

        }

    }


    return (
        <div>
            <div className='login'>
                <h1>Instagram</h1>
                <input placeholder='Email' name='email' value={email} onChange={event => credentials(event)} />
                <input placeholder='Password' type='password' name='password' value={password} onChange={event => credentials(event)} />
                <button onClick={userLogin}>Login</button>
            </div>
            <div className='altr'>
                <span>Don't have an account?</span>
                <Link to="/signup">SignUp</Link>
            </div>
        </div>
    )
}

export default Login