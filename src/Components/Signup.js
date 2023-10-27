import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [cred, setCred] = useState({ name: '', email: '', password: '' });

    const { setToken } = useContext(userContext);

    const navigate = useNavigate();

    const { name, email, password } = cred;

    function credentials(e) {

        setCred({ ...cred, [e.target.name]: e.target.value });

    }

    async function userSignUp() {

        try {
            const response = await axios.post('https://instagram-express-app.vercel.app/api/auth/signup', { name, email, password })
            setCred({ name: '', email: '', password: '' })
    
            setToken(response.data.data.token)
            localStorage.setItem('token',response.data.data.token)

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
            <div className='sign-up'>
                <h1>Instagram</h1>
                <input placeholder='Name' name='name' value={name} onChange={event => credentials(event)} />
                <input placeholder='Email' name='email' value={email} onChange={event => credentials(event)} />
                <input placeholder='Password' name='password' type='password' value={password} onChange={event => credentials(event)} />
                <button onClick={userSignUp}>SignUp</button>
            </div>
            <div className='altr'>
                <span>Have an account?</span>
                <Link to="/">Login</Link>
            </div>
        </div>

    )
}

export default Signup