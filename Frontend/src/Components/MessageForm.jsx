import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import './Messageform.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../Context/MessageContext'
import { useDispatch, useSelector } from 'react-redux'
import { addNotifications } from '../features/userSlice'

function MessageForm({ setUserToShow, currentChat, children }) {
    const { currentRoom, socket, messages, setMessages } = useContext(MessageContext)
    const { user } = useSelector(state => state.user)
    const [message, setMessage] = useState('')
    const containerRef = useRef(null)
    const dispatch = useDispatch()



    //get formatted time
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // Ensure two-digit format
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    //get formatted Date
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
        const day = now.getDate().toString().padStart(2, '0');

        return `${year}/${month}/${day}`;
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!message) return
        socket.emit('messageToRoom', message, currentRoom, user._id, getCurrentDate(), getCurrentTime())
        setMessage('')
    }



    useEffect(() => {
        // Set the scrollTop to the maximum value
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);


    //new message from room
    socket.off("newMessageFromRoom").on("newMessageFromRoom", (payload) => setMessages(payload));





    //room notifications
    socket.off('notifications').on('notifications', (payload) => {
        currentRoom != payload && dispatch(addNotifications(payload))
    })




    return (
        <>

            <div className='message-output' ref={containerRef}>

                <div className="row ">


                    <Row className="alert alert-success  ">
                        <Col xs={2} >{children}</Col>   <Col xs={8} style={{ fontFamily: '-moz-initial', textAlign: 'center' }} > <h5>{currentChat.name || <span>Select a chat </span>}</h5></Col>
                    </Row>


                </div>
                <ListGroup style={{ paddingBottom: 20 }}>
                    {messages.map((item) => {
                        return <ListGroupItem
                            key={item?._id}
                            className={` custom-list-group-item ${item.by._id === user._id ? 'd-flex flex-row-reverse align-items-center  ' : 'd-flex flex-row align-items-center '}`}
                        >
                            <img src={item.by.picture} alt={item.by.name} className='user-avatar' onClick={() => setUserToShow({ name: item.by.name, picture: item.by.picture })} />
                            <div className="message-item">
                                {item?.content}
                            </div>
                        </ListGroupItem>

                    })}
                </ListGroup>

            </div>
            <Form className='pb-2'><Row>

                <Col xs={10} md={11} >
                    <Form.Group>
                        <Form.Control type='text' placeholder='Enter you message here' value={message} onChange={e => setMessage(e.target.value)} ></Form.Control>
                    </Form.Group>


                </Col>
                <Col xs={2} md={1} >
                    <Button variant='info' type='submit' onClick={handleSubmit}  >
                        <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#f5f74a", }} />
                    </Button>
                </Col>

            </Row></Form>
        </>

    )
}

export default MessageForm
