import userContext from './userContext'
import React, { useState } from 'react'

const UserProvider = (props) => {

    const [token, setToken] = useState('')

    return (
        <userContext.Provider value={{ token, setToken }}>

            {props.children}

        </userContext.Provider>
    )
}

export default UserProvider