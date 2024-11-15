import React, { useContext, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../../context/StoreContext'

const Typesend = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation, SetShow } = useContext(StoreContext);

  const [message, setMsg] = useState("")
  const token = localStorage.getItem("token")


  const onChange = (e) => {
    setMsg(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://chat-app-rszy.onrender.com/api/message/send/${selectedConversation._id}`, { message }, { headers: { token } })

      if (response.data.success) {
        console.log(response.data.message);

        setMessages([...messages, response.data.message])
        setLoading(false)
        setMsg("")
      }
    }
    catch (error) {
      console.log("error in sendMessage", error);
      setLoading(false)

    }
  }

  const handleClick = () => {
    if (window.innerWidth < 500) {
      SetShow(false)
    }
  };


  return (
    <form onSubmit={sendMessage}>
      <div className='flex items-center ml-3 h-[8vh] '>
        <div className='w-[65%] ' >
          <input onClick={handleClick} onChange={onChange} className= ' pt-2 pb-2 rounded w-full  text-black outline-none pl-10 ' type="text" placeholder='Type here' value={message} />
        </div>
        <div>
          <button type='submit'> <img className='w-20' src="send.png" alt="" /></button>
        </div>
      </div>
    </form>
  )
}

export default Typesend
