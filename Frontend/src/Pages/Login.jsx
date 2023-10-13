import React, { useContext, useState } from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../services/userApi'
import { MessageContext } from '../Context/MessageContext'


const Login = () => {
    const { socket, newMessage, rooms } = useContext(MessageContext)


    const [userInfo, setUserInfo] = useState({ email: '', password: '' })
    const [loginUser, { isError, error, isLoading, isSuccess }] = useLoginUserMutation()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginUser({ email: userInfo.email, password: userInfo.password })

    }

    //navigate to chat page after login
    if (isSuccess) {
        socket.emit('new-user')
        return navigate('/chat')
    }


    return (
        <Container className='' >
            <Row className='mt-5 '>

                <Col md={7} className=' border py-4 px-3'>
                    <h1 className='mb-3'>Login Into Your Account</h1>
                    {/* Error alert */}
                    {isError && <Alert variant='danger' dismissible>{error.data?.msg}</Alert>}

                    <Form className='p-2' onSubmit={handleSubmit}>
                        <Form.Group className='mb-4' >
                            <Form.Label htmlFor='email'>Email </Form.Label>
                            <Form.Control type="email" id='email' placeholder="Enter email" name='email' value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <Form.Control type="password" id='password' placeholder="Password" name='password' value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} required />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox" className='mb-3'>
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <div className='d-flex justify-content-between '>
                            <Button variant="primary" type="submit" className='mb-3' >
                                {isLoading ? 'logging in...' : 'Submit'}
                            </Button>
                            <p className='mx-5'>Do not have an account ?<Link to='/signUp'>Sign Up</Link></p>
                        </div>

                    </Form>
                </Col>
                <Col md={5}>
                    <div className='login-page-img'>

                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default Login
