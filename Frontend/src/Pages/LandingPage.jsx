import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import chatImg from '../assets/chat.jpg'
import './Landing.css'


const LandingPage = () => {



    return (
        <>
            <Row className='border rounded  m-2'>
                <Col md={7} >
                    <div className='d-flex flex-column  justify-content-center align-items-center p-4  ' style={{ height: '50vh' }}>

                        <div>
                            <h4 className='my-3 '>
                                Share Your thought ,laugh,opinions with your friends and families
                            </h4>
                            <p>
                                enjoy real time chat ...
                            </p>
                            <Button className='bg-success btn-lg'>
                                Lets Chat
                            </Button>

                        </div>



                    </div>

                </Col>
                <Col md={5}>
                    <div className='chat-img'>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default LandingPage
