import React, { useContext, useEffect, useRef, useState } from "react";
import Sendmsg from "../Sendmsg/Sendmsg";
import { StoreContext } from "../../../context/StoreContext";
import { SocketContext } from "../../../context/SocketContext";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";

const Message = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation, url } =
    useContext(StoreContext);
  const { socket, typingUser } = useContext(SocketContext);

  const token = localStorage.getItem("token");
  const lastMsgRef = useRef();

  // 📌 Fetch chat history when user changes
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${url}/api/message/get/${selectedConversation._id}`,
          { headers: { token } }
        );
        if (res.data.success) {
          setMessages(res.data.message);
        }
      } catch (err) {
        console.log("Error fetching messages", err);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages, url, token]);

useEffect(() => {
  if (!socket) return;

  socket.on("newMessage", (data) => {
    if (data.senderId === selectedConversation?._id) {
      // active chat → refresh messages + reset unread
      axios.get(`${url}/api/message/get/${selectedConversation._id}`, {
        headers: { token },
      }).then((res) => {
        if (res.data.success) {
          setMessages(res.data.message);
        }
      });
      resetUnread(data.senderId);
    } else {
      // other chat → increment unread
      incrementUnread(data.senderId);
    }

    // move sender to top
    moveToTop(data.senderId);
  });

  return () => {
    socket.off("newMessage");
  };
}, [socket, selectedConversation, token, url, setMessages]);


  // 📌 Auto scroll to last msg
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg._id} ref={lastMsgRef}>
            <Sendmsg message={msg} />
          </div>
        ))
      ) : (
        <p className="text-center mt-[20%]">Say! Hi to start the conversation</p>
      )}

      {/* typing indicator */}
      {typingUser === selectedConversation?._id && (
        <div className="italic text-sm text-gray-500 ml-4 mb-2">
          {selectedConversation.fullname} is typing...
        </div>
      )}
    </div>
  );
};

export default Message;
