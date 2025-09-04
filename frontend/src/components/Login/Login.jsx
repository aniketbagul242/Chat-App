import React, { useContext, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'

const Login = () => {
  const { setToken, setAuthUser, url } = useContext(StoreContext)
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/user/login`, data);

      if (response.data.success) {
        setToken(response.data.token);
        setAuthUser(response.data.user);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        toast.success("Login Successful")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!")
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 to-indigo-700'>
      <form onSubmit={onSubmit} className='bg-gray-800 shadow-2xl rounded-xl w-[90%] sm:w-[400px] p-8 flex flex-col'>
        <h1 className='text-3xl font-bold text-white text-center mb-2'>ChatApp</h1>
        <p className='text-gray-300 text-center mb-6'>Login to your account</p>

        <div className='flex flex-col gap-4'>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder='Email'
            required
            className='bg-gray-700 text-white rounded-md px-4 py-2 outline-none border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-300'
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder='Password'
            required
            className='bg-gray-700 text-white rounded-md px-4 py-2 outline-none border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-300'
          />
        </div>

        <div className='flex justify-between items-center mt-4'>
          <p className='text-gray-400 text-sm'>
            New user? <Link to="/signup" className='text-blue-400 hover:underline'>Signup</Link>
          </p>
        </div>

        <button
          type='submit'
          className='mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
