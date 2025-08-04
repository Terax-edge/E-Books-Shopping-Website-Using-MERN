import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import imagetobase64 from '../helpers/imagetobase64';
import SummaryApi from '../common';
import {toast} from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
      const [data, setData] = useState({
        email : "",
        password : "",
        name :"",
        confirmpassword :"",
        profilepic : "",
      })
  const navigate = useNavigate()
  
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

        if(data.password === data.confirmpassword){
                const dataResponse = await fetch(SummaryApi.signUP.url,{
          method : SummaryApi.signUP.method,
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(data)
        });

        const dataApi = await dataResponse.json()

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login")

        }

        if(dataApi.error){
          toast.error(dataApi.message)
        }
        toast(dataApi.message)

        
        }else{
          toast.error("Please check password and confirm password")
        }

    

      }
      
      const handleUploadPic = async(e) =>{
        
        const file = e.target.files[0]
        const imagePic = await imagetobase64(file)
        
        setData((preve)=>{
          return{
          ...preve,
          profilepic : imagePic
          }

        })
      }

  return (
    <section id="sign-up" className="min-h-screen lg:h-screen flex items-center justify-center bg-gray-100 ">
      <div className='mx-auto container px-4 '>
        <div className='bg-white p-1 w-full max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto relative  '>
            <div>
              <img src={data.profilepic || loginIcons} alt='login icons'/>
              </div>
              <form>
                <label>
                <div className='text-xs bg-slate-200 py-1 text center absolute -bottom-7 w-full'>
                Upload Photo
              </div>
                
                  <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>
                
              </form>
            
          </div>
         <form className='p-9 felx flex-col gap-2' onSubmit={handleSubmit}>
           <div className='mb-4'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={data.name}
                  onChange= {handleOnChange}
                  required
                  className='w-full outline-none bg-transparent'
                />
             </div>
             </div>
          
            <div className='mb-4'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange= {handleOnChange}
                  required
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
                  required
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
              </div>

              <div className='mb-4'>
              <label>Confirm Password :</label>
              <div className='flex items-center bg-slate-100 p-2'>
                <input
                  type={showConfirmPassword ? "text": "password"}
                  placeholder='Enter confirm password'
                  value={data.confirmpassword}
                  name='confirmpassword'
                  onChange={handleOnChange}
                  required
                  className='flex-grow outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=> !preve )}>
                  <span>
                    {showConfirmPassword ? (
                     <IoEye />
                    )
                    :
                    (
                       <IoMdEyeOff />
                    )
                  
                  
                  }</span>
                </div>
              </div>
              </div>
        
            

            <button className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all mx-auto block mt-4'>
            Sign in
            </button>
          </form>
          <p className='my-2'><b>already have a Account ?</b> <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

          </div>
        </div>

     
    </section>
  )
}

export default Signup