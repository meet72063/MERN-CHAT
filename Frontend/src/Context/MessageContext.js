import React, { createContext, useEffect,useState } from "react";
import { io } from "socket.io-client";
import { serverURl } from "../constants";

const socket = io(serverURl);

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [newMessages, setNewMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateRoom, setPrivateRoom] = useState();
  const [currentRoom, setCurrentRoom] = useState("General");

  useEffect(() => {
    // Establish event listeners when the component mounts
    const handleNewUser = (payload) => {
      setMembers(payload);
    };

    const handleConnected = (payload) => {
      setMembers(payload);
    };

    socket.on("new-user", handleNewUser);
    socket.on("connected", handleConnected);

    return () => {
      socket.off("new-user", handleNewUser);
      socket.off("connected", handleConnected);
    };
  }, [rooms]);

  return (
    <MessageContext.Provider
      value={{
        newMessages,
        messages,
        members,
        rooms,
        socket,
        currentRoom,
        setMembers,
        setMessages,
        setRooms,
        setNewMessages,
        setCurrentRoom,
        privateRoom,
        setPrivateRoom,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
