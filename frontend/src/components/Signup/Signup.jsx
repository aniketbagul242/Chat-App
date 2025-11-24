import React, { useContext, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";

const Signup = () => {
  const { setToken, url,setAuthUser } = useContext(StoreContext);
  
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${url}/user/signup`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.reload();
        toast.success("Signup Successful");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const renderPasswordInput = (name, value, show, setShow, placeholder) => (
    <div className='relative'>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={OnChangeHandler}
        placeholder={placeholder}
        required
        className='bg-gray-800 text-white rounded-md px-4 py-2 outline-none border border-gray-600 focus:border-teal-400 focus:ring focus:ring-teal-300 transition duration-300 w-full pr-10'
      />
      <button
        type="button"
        onClick={() => setShow(prev => !prev)}
        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200'
      >
        {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
      </button>
    </div>
  );

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-teal-600'>
      <form onSubmit={onSubmit} className='bg-gray-900 shadow-2xl rounded-xl w-[90%] sm:w-[400px] p-8 flex flex-col'>
        <h1 className='text-3xl font-bold text-white text-center mb-2'>ChatApp</h1>
        <p className='text-gray-300 text-center mb-6'>Create your account</p>

        <div className='flex flex-col gap-4'>
          <input
            type="text"
            name="fullname"
            value={data.fullname}
            onChange={OnChangeHandler}
            placeholder='Fullname'
            required
            className='bg-gray-800 text-white rounded-md px-4 py-2 outline-none border border-gray-600 focus:border-teal-400 focus:ring focus:ring-teal-300 transition duration-300'
          />
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={OnChangeHandler}
            placeholder='Email'
            required
            className='bg-gray-800 text-white rounded-md px-4 py-2 outline-none border border-gray-600 focus:border-teal-400 focus:ring focus:ring-teal-300 transition duration-300'
          />

          {renderPasswordInput("password", data.password, showPassword, setShowPassword, "Password")}
          {renderPasswordInput("confirmPassword", data.confirmPassword, showConfirmPassword, setShowConfirmPassword, "Confirm Password")}
        </div>

        <p className='text-gray-400 text-sm mt-4 text-center'>
          Have an account? <Link to="/login" className='text-teal-400 hover:underline'>Login</Link>
        </p>

        <button
          type='submit'
          disabled={loading}
          className={`mt-6 w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2 ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {loading && <AiOutlineLoading3Quarters className='animate-spin h-5 w-5 text-white' />}
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  )
}

export default Signup
