import React, { useState, useRef } from 'react'
import Navbar from './Navbar'
import { Container, Card } from '../styles/create'
import image from '../assets/imageupload.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const Create = () => {

  const [caption, setCaption] = useState('');
  const fileInput = useRef();

  async function uploadData() {

    console.log(process.env.REACT_APP_ACCOUNT_ID)
    console.log(process.env.REACT_APP_API_KEY)

    if (!caption || !fileInput.current.files[0]) {

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

    basicUpload({
      accountId: process.env.REACT_APP_ACCOUNT_ID,
      apiKey: process.env.REACT_APP_API_KEY,
      requestBody: fileInput.current.files[0]

    }).then(
      response => createPost(response),

      _ => toast.error(`Failed to Upload!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    )
  }

  async function basicUpload(params) {

    const baseUrl = "https://api.bytescale.com";
    const path = `/v2/accounts/${params.accountId}/uploads/binary`;

    const response = await axios({
      method: "post",
      url: `${baseUrl}${path}`,
      data: params.requestBody,
      headers: {
        authorization: `Bearer ${params.apiKey}`
      }
    });

    const result = response.data;
    if (Math.floor(response.status / 100) !== 2)
      throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
    return result;
  }

  async function createPost(request) {
    // console.log(request)
    try {

      const response = await axios.post('https://instagram-express-app.vercel.app/api/post/create', {
        text: caption,
        image: request.fileUrl
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setCaption('');
      fileInput.current.value = null;

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
    }

    catch (err) {
      setCaption('');
      fileInput.current.value = null;

      toast.error(`Failed to Upload!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Card style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
          <h1 style={{ textAlign: 'center' }}>Create Post</h1>
          <img src={image} style={{ display: 'block', width: '100%' }} />
          <input type="file" accept="image/*" style={{ display: 'block', marginTop: '25px' }} ref={fileInput} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
            <textarea style={{ width: '80%' }} placeholder='Add Caption' value={caption}
              onChange={e => setCaption(e.target.value)}></textarea>
            <b style={{ color: 'blue', cursor: 'pointer', border: '1px solid blue', padding: '2px' }} onClick={uploadData}>share</b>
          </div>
        </Card>
      </Container>
    </>
  )
}

export default Create