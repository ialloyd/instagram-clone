import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Container, Stat, Para, Grid } from '../styles/profile'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Profile = () => {

    const token = localStorage.getItem('token')

    const [posts, setPosts] = useState([])

    async function viewMyPosts() {

        const response = await axios.get('https://instagram-express-app.vercel.app/api/post/my-posts', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        console.log(response.data.data)
        setPosts(response.data.data)
    }

    useEffect(() => { viewMyPosts() }, [])

    return (
        <>
            <Navbar />
            {posts.length > 0 && <> <Container>
                <AccountCircleIcon style={{ fontSize: '10rem' }} />
                <div style={{ marginLeft: '10px' }}>
                    <h1 style={{ marginBottom: '25px' }}>User-{token}</h1>
                    <Stat>
                        <Para>{posts.length} posts</Para>
                        <Para>0 followers</Para>
                        <Para>0 following</Para>
                    </Stat>
                </div>
            </Container>
                <Container>
                    <Grid>
                        {posts.map(post =>

                            <img src={post.image} style={{ width: '200px', height: '200px', border: '1px solid gray' }} />

                        )}
                    </Grid>
                </Container></>}
        </>
    )
}

export default Profile