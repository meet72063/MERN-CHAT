import React, { useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import SiderBar from '../Components/SiderBar'
import MessageForm from '../Components/MessageForm'
import './chatPage.css'
import Carousel from '../Components/Carousel'

function ChatPage() {
    const [userToshow, setUserToShow] = useState(null)

    return (
        <Container className='mt-5 h-full'>
            <Carousel setUserToShow={setUserToShow} userToshow={userToshow} />
            <Row >
                <Col md={5}>
                    <SiderBar setUserToShow={setUserToShow} userToshow={userToshow} />
                </Col>
                <Col md={7}>
                    {/* <div className='start-chat'>

                        <h1>Select Group or User to Chat</h1>

                    </div> */}
                    <MessageForm setUserToShow={setUserToShow} userToshow={userToshow} />
                </Col>
            </Row>

        </Container>
    )
}

export default ChatPage
