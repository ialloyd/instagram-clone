import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import userContext from '../context/userContext';

const Profile = () => {

    let userToken = localStorage.getItem('token')

    const navigate = useNavigate()

    const { token, setToken } = useContext(userContext)

    async function logout() {

        try {

            const response = await axios.delete(`https://instagram-express-app.vercel.app/api/auth/logout`, {
                headers: {
                    authorization: `Bearer ${userToken}`
                }
            })


            localStorage.removeItem('token');
            setToken('');
            alert(`Message : ${response.data.message}`)

            navigate('/')
        }

        catch (error) {

            console.log(error)
            alert(`Message : ${error.response.data.message}`)
        }

    }

    return (
        <div>
            <h1>Welcome {token}</h1>
            <button style={{ display: 'block', margin: 'auto' }} onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile;