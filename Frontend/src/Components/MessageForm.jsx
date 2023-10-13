import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import './Messageform.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../Context/MessageContext'
import { useSelector } from 'react-redux'
import { createRoutesFromElements } from 'react-router-dom'

function MessageForm({ setUserToShow }) {
    const { currentRoom, rooms, socket, messages, setMessages } = useContext(MessageContext)
    const { user } = useSelector(state => state.user)
    const [message, setMessage] = useState('')
    const containerRef = useRef(null)




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
    useEffect(() => {
        const handleNewMessageFromRoom = (payload) => {

            setMessages(payload);
        };
        socket.on("newMessageFromRoom", handleNewMessageFromRoom);
        return () => {
            socket.off("newMessageFromRoom", handleNewMessageFromRoom);
        };
    }, [messages]);






    return (
        <>
            <div className='message-output' ref={containerRef}>
                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <div className="alert alert-light">
                            <small className="text-muted">October 13, 2023</small>
                        </div>
                    </div>
                </div>
                <ListGroup style={{ paddingBottom: 20 }}>
                    {messages.map((item) => {
                        return <ListGroupItem
                            key={item?._id}
                            className={` custom-list-group-item ${item?.by?._id == user?._id ? 'd-flex flex-row-reverse align-items-center  ' : 'd-flex flex-row align-items-center '}`}
                        >
                            <img src={item?.by?.picture} alt={item?.by?.name} className='user-avatar' onClick={() => setUserToShow({ name: item.by.name, picture: item.by.picture })} />
                            <div className="message-item">
                                {item?.content}
                            </div>
                        </ListGroupItem>

                    })}
                </ListGroup>

            </div>
            <Form><Row>

                <Col sm={11}>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Enter you message here' value={message} onChange={e => setMessage(e.target.value)} ></Form.Control>
                    </Form.Group>


                </Col>
                <Col sm={1}>
                    <Button variant='info' type='submit' onClick={handleSubmit}  >
                        <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#f5f74a", }} />
                    </Button>
                </Col>

            </Row></Form>
        </>

    )
}

export default MessageForm
