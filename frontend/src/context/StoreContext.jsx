import { createContext, useEffect, useState } from "react";
import React from 'react'

export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");

  const intialState = localStorage.getItem("user");
  const [authuser, setAuthUser] = useState(intialState ? JSON.parse(intialState) : undefined)

  // managing userConversation globally
  const [selectedConversation, setSelectedConversation] = useState("");
  const [messages, setMessages] = useState([]);

  const [show, SetShow] = useState(false);


  const contexValue = {
    token,
    setToken,
    authuser,
    setAuthUser,
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
    show,
    SetShow,
  }

  return (
    <>
      <StoreContext.Provider value={contexValue}>
        {props.children}
      </StoreContext.Provider>
    </>
  )
}

export default StoreContextProvider;

