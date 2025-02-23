import React, { useContext, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'
import {Link} from "react-router-dom";
import { toast } from 'react-toastify'

const Login = () => {
  const {setToken, setAuthUser } = useContext(StoreContext)
  const [data,setData]= useState({
    email:"",
    password:""
  })

 const onChangeHandler = (e)=>{
  const name = e.target.name;
  const value = e.target.value;
  setData((data)=>({...data, [name]:value}))
 }

const onSubmit = async (e)=>{
  e.preventDefault();
  const response = await axios.post("https://chat-app-rszy.onrender.com/user/login",data);

  if(response.data.success){
    setToken(response.data.token);
    setAuthUser(response.data.user)
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    toast.success("Login Successful")
  
  }
  else{
    alert(response.data.message)
  }
}


  return (
<>
<form onSubmit={onSubmit}>
    <div className='bg-slate-900 h-screen flex items-center justify-center'>
    <div className='text-white bg-slate-600 w-[90%] max-h-[50%] rounded-md sm:w-[50%] xl:w-[25%] border border-gray-500'>
        <h1 className='text-2xl font-bold pl-32 pt-3'>ChatApp</h1>
        <h1 className='text-xl font-semibold pl-2 pt-2'>Login</h1>
        <div className='flex justify-center mt-7'>

               <div className='flex flex-col gap-y-6 w-[70%]  '>
            <input className=' rounded bg-slate-900 outline-none border border-gray-700 h-10 ' name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email' required />
            <input className=' rounded bg-slate-900 outline-none border border-gray-700 h-10 ' name='password' onChange={onChangeHandler} value={data.password}  type="text" placeholder='Password' required />

              </div>
        </div>
        <div className='flex justify-center mt-3'>
            <p >New user? <Link to="/signup"> <span className='text-blue-400 cursor-pointer'>Signup </span>   </Link> </p>
        </div>
        <div className='flex justify-center mt-3'> 
       <button className='bg-blue-600 pl-3 pr-3 pt-1 pb-1 text-white rounded font-medium hover:bg-blue-500'  type='submit'>Login</button>
        </div>
    </div>
    
    </div>
    
    </form>
</>
  )
}

export default Login
