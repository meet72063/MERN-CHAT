import React, { useContext, useState } from 'react'
import { Container, Form, Button, Row, Col, Alert, ProgressBar } from 'react-bootstrap'
import './Login.css'
import logoImg from '../assets/avatar.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupUserMutation } from '../services/userApi'
import { MessageContext } from '../Context/MessageContext'
import { app } from '../Config'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// Initialize Firebase Storage
const storage = getStorage(app);





const SignUp = () => {
    const { socket } = useContext(MessageContext)
    const [previewImg, setPreviewImg] = useState(null)
    const [img, setImg] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(null)
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '', profilePic: '' })
    const [userSignUp, { isLoading, isError, error, isSuccess }] = useSignupUserMutation()

    const navigate = useNavigate()


    const handleProfilePic = async (e) => {
        const file = e.target.files[0]
        setPreviewImg(URL.createObjectURL(file)) //set preview image link 
        await uploadImg(file)
        setImg(file) //storing image data
    }



    //uploading image to firebase
    function uploadImg(img) {
        return new Promise((resolve, reject) => {
            // Create a reference to the "chatApp" folder and specify the image name
            const storageRef = ref(storage, `profilePics/${img.name}`)

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Update the progress state
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setUploadProgress(progress);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    // Upload completed successfully
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUserInfo({ ...userInfo, profilePic: downloadURL })
                        resolve(downloadURL);
                    });
                }
            )

        })

    };


    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!img) return alert('please upload profile picture')
        try {

            // Sign up user
            userSignUp({ name: userInfo.name, email: userInfo.email, password: userInfo.password, picture: img }).then(() => {
                socket.emit('new-user', userInfo.email)
            })
        } catch (error) {
            console.log(error)
            setUploadProgress(null)
        }
    }

    // navigate to chat page after signUp
    if (isSuccess) {

        return navigate('/chat')
    }


    return (
        <Container  >
            <Row className='mt-5'>
                <Col md={5}>
                    <div className='login-page-img'>

                    </div>

                </Col>

                <Col md={7} className=' border py-3'>
                    <h2 className='mb-5 text-center '>Create New Account</h2>
                    <div className='d-flex justify-content-center mb-3' >
                        <div className='user-image-container '>
                            <img src={previewImg || logoImg} className='user-img'></img>
                            <label className='add-image-label' htmlFor='profile-pic'>+</label>
                            <input type="file" accept='image/jpg image/png' hidden id='profile-pic' onChange={handleProfilePic} />


                        </div>




                    </div>
                    {uploadProgress && <div>
                        <ProgressBar animated now={uploadProgress} striped variant="success" style={{ color: 'red', margin: 3 }} label={`uploading profile pic.... ${uploadProgress}%`} />
                    </div>}

                    <Form className='p-2' onSubmit={handleSignUp}>
                        {/* Error alert */}
                        {isError && <Alert variant='danger' dismissible>{error.data?.msg}</Alert>}
                        <Form.Group className='mb-4' >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your name" name='name' value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} required />

                        </Form.Group>
                        <Form.Group className='mb-4' >
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} required />
                        </Form.Group>

                        <div className='d-flex justify-content-between '>
                            <Button variant="primary" type="submit" className='mb-3' >
                                {isLoading ? 'Signing up...' : 'Submit'}
                            </Button>
                            <p className='mx-5'>already have account ?<Link to='/login'>Login</Link></p>
                        </div>


                    </Form>
                </Col>

            </Row>
        </Container>
    )
}

export default SignUp
