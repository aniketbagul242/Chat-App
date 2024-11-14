import React, { useContext, useEffect } from 'react'
import { StoreContext } from './StoreContext';
import { SocketContext } from './SocketContext';

const GetSocketMsg = () => {
  const { socket } = useContext(SocketContext);
  const { setMessages } = useContext(StoreContext);

  useEffect(() => {
    socket.on("newMessage", (newMsg) => {
      setMessages(prevMsg => [...prevMsg, newMsg])
    })

    return () => {
      socket.off("newMessage");
    };


  }, [socket, setMessages]);

  return null; // or whatever you want to render
};

export default GetSocketMsg;
