import React, { useContext } from 'react'
import Chatuser from '../Chatuser/Chatuser'
import Message from '../Message/Message'
import Typesend from '../Typesend/Typesend'
import { StoreContext } from '../../../context/StoreContext'
import Nochat from '../Nochat/Nochat'


const Right = () => {
  const { selectedConversation } = useContext(StoreContext)
  const { show } = useContext(StoreContext)
  return (

    !selectedConversation ? <Nochat /> :

      <div className={`${show ? "sm:w-[70%] " : "w-full"} border border-white bg-slate-700 text-white `} >
        <Chatuser />:
        <div className='flex-1 overflow-y-auto' style={{ maxHeight: "calc(88vh - 8vh)" }} >
          <Message />
        </div>
        <Typesend />

      </div>

  )
}

export default Right

