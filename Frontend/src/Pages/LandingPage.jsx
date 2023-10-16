import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

function LandingChatPage() {
    const navigate = useNavigate()

    return (
        <div className="landing-chat">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="landing-text">
                            <h1>Welcome to MERN CHAT</h1>
                            <p>Start chatting with friends and family today!</p>
                            <button className="btn btn-primary" onClick={() => navigate('/chat')}>Lets Chat</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LandingChatPage;
