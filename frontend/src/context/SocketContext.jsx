import React, { createContext, useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import io from "socket.io-client";

export const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
  const {
    authuser,
    selectedConversation,
    setMessages,
    incrementUnread,
    resetUnread,
    moveToTop,
    url,
  } = useContext(StoreContext);

  const [socket, setSocket] = useState(null);
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (!authuser) return;

    const socketInstance = io(url, {
      query: { userId: authuser._id },
    });

    setSocket(socketInstance);

    // ✅ online users list
    socketInstance.on("getOnlineUser", (users) => setOnlineUsers(users));

    // ✅ typing indicators
    socketInstance.on("typing", ({ senderId }) => setTypingUser(senderId));
    socketInstance.on("stopTyping", () => setTypingUser(null));

    // ✅ new message handling
    socketInstance.on("newMessage", (msg) => {
      const { senderId } = msg;

      setMessages((prev) => [...prev, msg]);

      if (!selectedConversation || selectedConversation._id !== senderId) {
        // message from another user → increment counter
        incrementUnread(senderId);
        moveToTop(senderId);
      } else {
        // message from the user we are chatting with → reset counter
        resetUnread(senderId);
      }
    });

    return () => socketInstance.close();
  }, [authuser, selectedConversation]);

  return (
    <SocketContext.Provider value={{ socket, OnlineUsers, typingUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

