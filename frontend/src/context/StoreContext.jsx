import React, { createContext, useState, useCallback } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [alluser, setAlluser] = useState([]);

  // ✅ Safe localStorage parse
  const initialState = (() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [authuser, setAuthUser] = useState(initialState);

  // ✅ conversation and messages
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  // ✅ unread counters
  const [unreadCounts, setUnreadCounts] = useState({});

  // ✅ sidebar toggle
  const [show, SetShow] = useState(false);

  // ✅ API URL
  //const url = "http://localhost:3000";
   const url ="https://chat-app-rszy.onrender.com";

  // ---------- helpers ----------
  const incrementUnread = useCallback((userId) => {
    if (!userId) return;
    setUnreadCounts((prev) => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1,
    }));
  }, []);

  const resetUnread = useCallback((userId) => {
    if (!userId) return;
    setUnreadCounts((prev) => ({ ...prev, [userId]: 0 }));
  }, []);

  const moveToTop = useCallback((userId) => {
    if (!userId) return;
    setAlluser((prev) => {
      const idx = prev.findIndex((u) => u._id === userId);
      if (idx === -1) return prev;
      const arr = [...prev];
      const [item] = arr.splice(idx, 1);
      return [item, ...arr];
    });
  }, []);

  const contexValue = {
    token,
    setToken,
    authuser,
    setAuthUser,
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
    alluser,
    setAlluser,
    unreadCounts,
    setUnreadCounts,
    incrementUnread,
    resetUnread,
    moveToTop,
    show,
    SetShow,
    url,
  };

  return (
    <StoreContext.Provider value={contexValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
