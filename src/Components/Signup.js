import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {

    const [cred, setCred] = useState({ name: '', email: '', password: '' });

    const { name, email, password } = cred;

    function credentials(e) {

        setCred({ ...cred, [e.target.name]: e.target.value })

    }

    async function userSignUp() {

        try {
            const response = await axios.post('https://instagram-express-app.vercel.app/api/auth/signup', { name, email, password })
            setCred({ name: '', email: '', password: '' })
            console.log(response)
            alert(`Message : ${response.data.message}`)

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
                <input placeholder='Password' name='password'  type='password' value={password} onChange={event => credentials(event)} />
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