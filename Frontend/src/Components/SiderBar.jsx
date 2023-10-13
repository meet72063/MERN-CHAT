import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { MessageContext } from '../Context/MessageContext';
import axios from 'axios';
import { serverURl } from '../constants';
import './siderbar.css';
import { useSelector } from 'react-redux';

function SiderBar({ setUserToShow }) {
    const { setRooms, rooms, members, currentRoom, setCurrentRoom, socket, setMessages, messages } = useContext(MessageContext);
    const [selectedUser, setSelectedUser] = useState(false)
    const { user } = useSelector(state => state.user)

    //filter logged in user to prevent sending messeage to himself
    const otherMembers = members.filter(member => member._id !== user._id)

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await axios.get(serverURl + '/rooms');
            setRooms(response.data.rooms);
        };
        fetchRooms();
    }, []);


    //socket join a room when room get changed
    const handleRoomChange = (room, index) => {
        setSelectedUser(index)
        setCurrentRoom(room)
        socket.emit('joinRoom', room)
    }

    //get room messages on joining room
    useEffect(() => {
        const handleMessageFromRoom = (messages, next) => {
            console.log(next)
            setMessages(messages)
        }
        socket.on('room-messages', handleMessageFromRoom)
        return () => socket.off('room-messages', handleMessageFromRoom)

    }, [currentRoom])



    return (
        <div className="sidebar">
            <h2 className="sidebar-heading">Available Rooms</h2>
            <ListGroup className="sidebar-list">
                {rooms.map((room, index) => (
                    <ListGroup.Item key={index} className={`sidebar-room ${selectedUser === index && 'selected-user'}`} onClick={() => handleRoomChange(room, index)}>
                        <div>{room}</div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h2 className="sidebar-heading " >Users</h2>
            <ListGroup className="sidebar-list">
                {otherMembers.map((user, index) => (
                    <ListGroupItem key={user._d} className={`userListItem ${selectedUser === user._id && 'selected-user'}`} onClick={() => setSelectedUser(user._id)}>
                        <img src={user?.picture} alt="user-pic" className="user-avatar" onClick={() => setUserToShow(user)} />
                        <h5 className="user-name">{user.name}</h5>
                        <div className={`dot ${user.status ? 'online' : 'offline'}`}></div>

                    </ListGroupItem>

                ))}
            </ListGroup>
        </div>
    );
}

export default SiderBar;
