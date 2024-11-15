import React, { useContext, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext';
import {Link} from "react-router-dom";

const Signup = () => {
   
const {setToken} = useContext(StoreContext);


  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
});


  const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data)=>({...data,[name]:value}))
  }

  const onSubmit = async (e)=>{
  e.preventDefault();
  const response = await axios.post("http://localhost:3000/user/signup",data)
  if(response.data.success){
     setToken(response.data.token)
     localStorage.setItem("token",response.data.token)
     localStorage.setItem("user",JSON.stringify(response.data.user))
  }
  else{
    alert(response.data.message)
  }

  }

  return (

    <>
      <form onSubmit={onSubmit} >
        <div className='bg-slate-900 h-screen flex items-center justify-center'>
          <div className='text-white bg-slate-600 w-[90%] rounded-md sm:w-[50%] xl:w-[25%] border border-gray-500 max-h-[60%]  '>
            <h1 className='text-2xl font-bold pl-32 pt-3'>ChatApp</h1>
            <h1 className='text-xl font-semibold pl-2 pt-2'>Register</h1>
            <div className='flex justify-center mt-5'>
              <div className='flex flex-col gap-y-6 w-[70%]  '>
                <input className=' rounded bg-slate-900 outline-none border border-gray-700 h-10 ' name='fullname' value={data.fullname} required onChange={OnChangeHandler} type="text" placeholder='Fullname' />
                <input className=' rounded bg-slate-900 outline-none border border-gray-700 h-10 ' name='email' value={data.email} required onChange={OnChangeHandler} type="text" placeholder='Email' />
                <input className=' rounded bg-slate-900 outline-none border border-gray-700 h-10 ' name='password' value={data.password} required onChange={OnChangeHandler} type="text" placeholder='Password' />
                <input className=' rounded bg-slate-900 outline-none border border-gray-700 h-10 ' name='confirmPassword' value={data.confirmPassword} required onChange={OnChangeHandler} type="text" placeholder='Confirm Password' />
              </div>
            </div>
            <div className='flex justify-center mt-3'>
              <p >Have an account? <Link to="/login"><span className='text-blue-400 cursor-pointer'>Login </span> </Link>  </p>
            </div>
            <div className='flex justify-center mt-3'>
              <button className='bg-blue-600 pl-3 pr-3 pt-1 pb-1 text-white rounded font-medium hover:bg-blue-500' type='submit'>Signup</button>
            </div>
          </div>

        </div>
      </form>
    </>
  )
}

export default Signup