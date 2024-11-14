import React, { createContext, useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import io from "socket.io-client"

export const SocketContext = createContext(null)

const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [OnlineUsers, setOnlineUsers] = useState([])
  const { authuser } = useContext(StoreContext)



  useEffect(() => {
    if (authuser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authuser._id
        }
      })
      setSocket(socket)
      socket.on("getOnlineUser", (users) => {
        setOnlineUsers(users)
      })
      return () => socket.close();

    } else {
      if (socket) {
        socket.close();
        setSocket(null)
      }
    }
  }, [authuser])

  const contextValue = {
    socket,
    OnlineUsers
  }

  return (
    <>
      <SocketContext.Provider value={contextValue}>
        {props.children}
      </SocketContext.Provider>

    </>
  )
}

export default SocketContextProvider