import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../../context/StoreContext'

const Logout = () => {
  const navigate = useNavigate()
  const { setToken, setAuthUser } = useContext(StoreContext)
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken("")
    setAuthUser(undefined)
    navigate("/login")
  }
  return (

    <div className='h-[10vh] pt-3 pl-3'>
      <div>
        <button onClick={logout} className='hover:bg-slate-700  '> <img className='w-10 text-white ' src="logout.png" alt="" /></button>
      </div>
    </div>
  )
}

export default Logout