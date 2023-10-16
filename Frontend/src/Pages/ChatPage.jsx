import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SiderBar from '../Components/SiderBar';
import MessageForm from '../Components/MessageForm';
import Carousel from '../Components/Carousel';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MessageContext } from '../Context/MessageContext';

function ChatPage() {
    const { socket, setMessages } = useContext(MessageContext);

    const [userToshow, setUserToShow] = useState(null);
    const [currentChat, setCurrentChat] = useState({});
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const { user } = useSelector(state => state.user)
    const isSmallDevice = window.innerWidth < 768;

    const navigate = useNavigate()


    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };


    if (!user) {
        navigate('/login')
        return
    }

    socket.off('room-messages').on('room-messages', (messages) => setMessages(messages))






    return (
        <>
            <Container className="mt-5 h-full pb-10 mb-10">
                <Carousel setUserToShow={setUserToShow} userToshow={userToshow} />
                <Row>
                    {isSmallDevice ? (
                        <Col md={12}>
                            {isSidebarVisible ? (
                                <SiderBar
                                    setUserToShow={setUserToShow}
                                    userToshow={userToshow}
                                    currentChat={currentChat}
                                    setCurrentChat={setCurrentChat}
                                    toggleSidebar={toggleSidebar}
                                    isSmallDevice={isSmallDevice}
                                />
                            ) : (

                                <>

                                    <MessageForm
                                        setUserToShow={setUserToShow}
                                        userToshow={userToshow}
                                        currentChat={currentChat}
                                        setCurrentChat={setCurrentChat}
                                    >
                                        <Button variant="light" onClick={toggleSidebar} className="back-button">
                                            ←
                                        </Button>

                                    </MessageForm>
                                </>
                            )}
                        </Col>
                    ) : (
                        <>
                            <Col md={5}>
                                <SiderBar
                                    setUserToShow={setUserToShow}
                                    userToshow={userToshow}
                                    currentChat={currentChat}
                                    setCurrentChat={setCurrentChat}
                                    isSmallDevice={isSmallDevice}
                                />
                            </Col>
                            <Col md={7}>
                                <MessageForm
                                    setUserToShow={setUserToShow}
                                    userToshow={userToshow}
                                    currentChat={currentChat}
                                    setCurrentChat={setCurrentChat}
                                />
                            </Col>
                        </>
                    )}
                </Row>

            </Container>
        </>
    );
}

export default ChatPage;
