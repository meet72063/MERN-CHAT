import React, { useContext, useEffect } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import { MessageContext } from '../Context/MessageContext';
import axios from 'axios';
import './siderbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotification } from '../features/userSlice';

function SiderBar({ setUserToShow, setCurrentChat, currentChat, toggleSidebar, isSmallDevice }) {
    const { setRooms, rooms, members, currentRoom, setCurrentRoom, socket, setMessages } = useContext(MessageContext);
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()




    useEffect(() => {
        const fetchRooms = async () => {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/rooms');
            setRooms(response.data.rooms);
        };
        fetchRooms();
    }, []);




    //socket join a room when room get changed
    const handleRoomChange = (room, index, privateRoom) => {
        setCurrentChat({ ...currentChat, _id: index, name: privateRoom || room })
        setCurrentRoom(room)
        dispatch(resetNotification(room))
        socket.emit('joinRoom', room, currentRoom)

        if (isSmallDevice) {
            toggleSidebar()
        }
    }

    //get room messages on joining room
    useEffect(() => {
        const handleMessageFromRoom = (messages) => {
            setMessages(messages)
        }
        socket.on('room-messages', handleMessageFromRoom)
        return () => socket.off('room-messages', handleMessageFromRoom)

    }, [currentRoom])


    //makes a private room between two users 
    function getPrivateRoomWithIds(_id1, _id2) {
        if (_id1 > _id2) {
            return _id1 + _id2
        } else {
            return _id2 + _id1
        }

    }




    return (
        <div className="sidebar">
            <h2 className="sidebar-heading">Available Rooms</h2>
            <ListGroup className="sidebar-list">
                {rooms.map((room, index) => (
                    <ListGroup.Item key={index} className={`sidebar-room p-3 ${currentChat._id === index && 'selected-user'}`} onClick={() => handleRoomChange(room, index)}>

                        <Col sm={10}>{room}</Col>
                        {user.newMessages[room] && <Col sm={2} > <span className='badge bg-info rounded-circle p-2'> {user.newMessages[room]}</span></Col>}

                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h2 className="sidebar-heading " >Users</h2>
            <ListGroup className="sidebar-list">
                {members.map((member) => (
                    <ListGroupItem key={member._id} className={`userListItem ${currentChat._id === member._id && 'selected-user'}`} onClick={() => handleRoomChange(getPrivateRoomWithIds(user._id, member._id), member._id, member.name)} disabled={member._id === user._id} >
                        <img src={member.picture} alt="user-pic" className="user-avatar" onClick={(e) => { setUserToShow(member); e.stopPropagation() }} />
                        <h5 className="user-name">{member.name}  {(member._id == user._id) && '(You)'} </h5>
                        {user.newMessages[getPrivateRoomWithIds(user._id, member._id)] && <Col sm={2} style={{ marginLeft: 'auto' }}> <span className='badge bg-info rounded-circle p-2 '> {user.newMessages[getPrivateRoomWithIds(user._id, member._id)]}</span></Col>}

                        <div className={`dot ${member.status === 'offline' ? 'offline' : 'online'}`}></div>

                    </ListGroupItem>

                ))}
            </ListGroup>
        </div>
    );
}

export default SiderBar;
