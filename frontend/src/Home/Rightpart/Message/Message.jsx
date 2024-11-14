import React, { useContext, useEffect, useRef, useState } from 'react'
import Sendmsg from '../Sendmsg/Sendmsg'
import { StoreContext } from '../../../context/StoreContext'
import axios from 'axios'
import Loading from '../../../components/Loading/Loading'
import GetSocketMsg from '../../../context/GetSocketMsg'


const Message = () => {

  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useContext(StoreContext);

  const token = localStorage.getItem("token")

  GetSocketMsg() // getting messages from backend

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true)
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(`https://chat-app-rszy.onrender.com/api/message/get/${selectedConversation._id}`, { headers: { token } })
          console.log(response.data.message);

          if (response.data.success) {
            setMessages(response.data.message)
            setLoading(false)
          }

        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      }
    }
    getMessage();

  }, [setMessages, selectedConversation])



  const lastMsgRef = useRef();
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);





  return (
    <div className='flex-1 overflow-y-auto' style={{ minHeight: "calc(92vh - 8vh)" }}>

      {loading ? <Loading /> : (messages.length > 0 && messages.map((message) => {
        return <div key={message._id} ref={lastMsgRef} > <Sendmsg message={message} /> </div>
      })
      )}
      {
        !loading && messages.length === 0 && (
          <div><p className='text-center mt-[20%]'>Say! Hi to start the conversation</p></div>
        )}


    </div>

  )
}

export default Message
