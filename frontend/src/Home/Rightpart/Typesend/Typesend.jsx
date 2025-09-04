import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";
import { SocketContext } from "../../../context/SocketContext";

const Typesend = () => {
  const { messages, setMessages, selectedConversation, SetShow, url, authuser } =
    useContext(StoreContext);
  const { socket } = useContext(SocketContext);

  const [message, setMsg] = useState("");
  const typingTimeoutRef = useRef(null);
  const token = localStorage.getItem("token");

  const onChange = (e) => {
    setMsg(e.target.value);

    if (socket && selectedConversation?._id) {
      socket.emit("typing", { senderId: authuser._id, receiverId: selectedConversation._id });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", { senderId: authuser._id, receiverId: selectedConversation._id });
      }, 1000);
    }
  };

  // sendMessage in Typesend.jsx
const sendMessage = async (e) => {
  e.preventDefault();
  if (!message.trim()) return;

  try {
    const response = await axios.post(
      `${url}/api/message/send/${selectedConversation._id}`,
      { message },
      { headers: { token } }
    );

    if (response.data.success) {
      const newMsg = response.data.message;

      // update local state with DB saved message
      setMessages((prev) => [...prev, newMsg]);
      setMsg("");

      // notify receiver via socket (no need to append again here)
      if (socket && selectedConversation?._id) {
        socket.emit("sendMessage", {
          senderId: user._id,
          receiverId: selectedConversation._id,
          text: newMsg.message,
        });
      }
    }
  } catch (error) {
    console.log("error in sendMessage", error);
  }
};


  const handleClick = () => {
    if (window.innerWidth < 500) SetShow(false);
  };

  return (
    <form onSubmit={sendMessage}>
      <div className="flex items-center ml-3 h-[8vh]">
        <div className="w-[65%]">
          <input
            onClick={handleClick}
            onChange={onChange}
            value={message}
            type="text"
            placeholder="Type here"
            className="pt-2 pb-2 rounded w-full text-black outline-none pl-10"
          />
        </div>
        <div>
          <button type="submit">
            <img className="w-20" src="send.png" alt="send" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Typesend;
