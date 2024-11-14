import React, { useEffect, useState } from 'react'
import Users from '../RegisterUser/Users'
import axios from 'axios';


const User = () => {

  const token = localStorage.getItem("token");

  const [alluser, setAlluser] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // getting all user from database

    const getAlluser = async () => {

      try {
        const response = await axios.get("http://localhost:3000/user/userdata", { headers: { token } })
        setAlluser(response.data.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    getAlluser()
  }, [token])

  return (
    <>
      <div>
        <h1 className='text-white px-8 py-2 bg-slate-800 rounded-md font-semibold mt-4'>Messages</h1>
        <div className='overflow-y-auto flex-1' style={{ maxHeight: "calc(85vh - 10vh)" }}>
          {alluser.map((user, index) => {
            return <Users user={user} key={index} />
          })}

        </div>

      </div>
    </>
  )
}

export default User