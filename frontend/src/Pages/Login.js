import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login=() => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
      email : "",
      password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails} = useContext(Context)

   // console.log("generalContext",generalContext.fetchUserDetails())

    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
    }
    const handleSubmit = async(e) =>{
      e.preventDefault()
      const dataResponse = await fetch(SummaryApi.signIn.url,{
        method : SummaryApi.signIn.method,
        credentials : 'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data) 
      
      })
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
        
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }

    }
  //  console.log("data login", data)
  return (
    <section id="login" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className='mx-auto container px-4'>
        <div className='bg-white p-1 w-full max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons'/>
          </div>
         <form className='p-4' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange= {handleOnChange}
                  className='w-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div className='mb-4'>
              <label>Password:</label>
              <div className='flex items-center bg-slate-100 p-2'>
                <input
                  type={showPassword ? "text": "password"}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='flex-grow outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=> !preve )}>
                  <span>
                    {showPassword ? (
                     <IoEye />
                    )
                    :
                    (
                       <IoMdEyeOff />
                    )
                  
                  
                  }</span>
                </div>
              </div>
            <Link
    to={'/forgot-password'}
    className='text-sm text-left hover:underline hover:text-red-600'
  >
    Forgot Password
  </Link>
            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all mx-auto block mt-4'>
              Login
            </button>
          </form>
          <p className='my-2'><b>Don't have account ?</b> <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>

          </div>
        </div>

     
    </section>
  )
}

export default Login