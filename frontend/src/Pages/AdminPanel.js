import React, { useEffect } from 'react';
import { Link, Outlet , useNavigate } from 'react-router-dom';
import { FaBookReader } from "react-icons/fa";
import { useSelector } from 'react-redux';
import ROLE from '../common/role';


const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if((user?.role !== ROLE.ADMIN))
          navigate("/")
    },[user])
  return (
    <div className='flex min-h-[calc(100vh-120px)]'>
  {/* Sidebar */}
  <aside className='bg-white w-64 min-h-screen shadow flex-shrink-0'>
    <div className='flex flex-col items-center p-4'>
      <div className='text-9xl cursor-pointer relative flex justify-center mt-10'>
        {user?.profilepic ? (
          <img
            src={user?.profilepic}
            className='w-32 h-32 rounded-full object-cover'
            alt={user?.name}
          />
        ) : (
          <FaBookReader />
        )}
      </div>
      <p className='capitalize text-lg font-semibold mt-3'>{user?.name}</p>
      <p>{user?.role}</p>
    </div>


  {/* Main Content Goes Here */}
  <div className='flex-1 p-6 overflow-x-auto'>
    {/* book cards grid goes here */}
  </div>


            {/***navigation */}
            <div>
                      <nav className='grid -mt-6'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
                      </nav>
            </div>
            </aside>
        <main className='w-full h-full p-3'>
            <Outlet />
            </main> 
        </div>
  )
}

export default AdminPanel