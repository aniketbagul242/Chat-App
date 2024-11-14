import React from 'react'

const Sendmsg = ({ message }) => {

  const authUser = JSON.parse(localStorage.getItem("user"))
  const itsMe = authUser._id === message.senderId

  const end = "flex justify-end";
  const start = "flex justify-start"


  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })


  return (
    <>
      <div>
        <div className='p-4 space-y-2 '>
          <div className={itsMe ? end : start}>
            <div className='font-normal' > <span className={itsMe ? " bg-blue-600 pt-2 pb-2 rounded-md pr-2.5 pl-2.5" : "bg-green-500 pt-2 pb-2 rounded-md pr-2.5 pl-2.5"}>{message.message} </span> </div>
            <div>

            </div>
          </div>
        </div>
      </div>



    </>

  )
}


export default Sendmsg