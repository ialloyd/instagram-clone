import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { Container, Card, CardTop, CardImage, CardBottom, CommentSection, StyledInput } from '../styles/home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { toast } from 'react-toastify';

const Home = () => {

    let userToken = localStorage.getItem('token')

    const [posts, setPosts] = useState([])

    async function getAllPosts() {

        try {

            const response = await axios.get('https://instagram-express-app.vercel.app/api/post/all-posts', {
                headers: {
                    authorization: `Bearer ${userToken}`
                }
            });

            const limitedData = response.data.data.slice(0, 15);
            setPosts(limitedData)

        }
        catch(err){

            toast.error(`${err.response.data.message}!`, {
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

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <>
            <Navbar />
            <Container>
                {posts.map((post, index) => {
                    return <Card style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
                        <CardTop>
                            <AccountCircleIcon style={{ fontSize: '2rem', marginRight: '20px' }} />
                            <span>User{index + 1}-{post.user}</span>
                        </CardTop>
                        <CardImage src={post.image} />
                        <CardBottom>
                            <FavoriteIcon style={{ color: 'red', fontSize: '2rem' }} />
                            <p>{post.likes} Likes</p>
                            <p>{post.text}</p>
                            <b style={{ cursor: 'pointer' }}>View all Comments</b>
                            <CommentSection>
                                <InsertEmoticonIcon style={{ cursor: 'pointer' }} />
                                <StyledInput placeholder='Add a Comment' />
                                <b style={{ color: 'blue', cursor: 'pointer' }}> Post</b>
                            </CommentSection>
                        </CardBottom>
                    </Card>
                })}
            </Container>
        </>
    )
}

export default Home;