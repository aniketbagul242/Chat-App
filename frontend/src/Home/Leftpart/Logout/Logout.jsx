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
    <div className='h-[10vh] flex items-center justify-start px-4 mb-4 border-gray-600'>
      <button
        onClick={logout}
        className='bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 mb-6 rounded-md transition-colors duration-300'
      >
        Logout
      </button>
    </div>
  )
}

export default Logout
