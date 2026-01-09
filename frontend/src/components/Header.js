import React, { useState, useEffect, useRef, useContext } from 'react'
import Logo from './Logo'
import { BiSearchAlt } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role'
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const menuRef = useRef(null)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)


  useEffect(()=>{

    const handleClickOutside = (event) => {
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setMenuDisplay(false);
      }
    };
     document.addEventListener("mousedown", handleClickOutside);

    // Clean up on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")

    }

    if (data.error) {
      toast.error(data.message)
    }
  }
  const handleSearch = (e)=>{
    const { value } =e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={180} h={180} />
          </Link>
        </div>
        <div className='flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type="text" placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-9 bg-black flex items-center justify-center rounded-r-full text-white'>
            <BiSearchAlt /></div>
        </div>
        <div className='flex items-center gap-5'>

          <div className='text-3xl cursor-pointer'>
            {
              user?.profilepic ? (
                <img src={user?.profilepic} className='w-15 h-10 rounded-full' alt={user?.name} />
              ) : (
                <FaBookReader />
              )
            }

          </div>
            {
              user?._id && (
                <Link to={"/cart"} className='text-3xl'>
                  <span><CgShoppingCart /></span>
                  <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-3 right-21'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
            </Link>
                )
            }
        

          <div className='relative group flex justify-center' ref={menuRef}>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>

              <MdOutlineAccountCircle />
              {
                menuDisplay && (
             
            <div className='absolute bg-black bottom-0 top-8  h-12 w-32 p-2 rounded-xl text-white  z-50 '>
              <nav>
                {
                  user?.role === ROLE.ADMIN && (
                  <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block  h-10 w-30 p-2 rounded-xl hover:bg-slate-600 text-lg mt-[-8px] relative z-50 '>Admin Panel</Link>
                  )
                }

                
              </nav>
            </div> 
          )}
          </div>
              )}
            </div>
            





          
          <div>{
            user?._id ? (
              <button onClick={handleLogout} className='px-2 py-1 rounded-full text-white bg-black hover:bg-red-600'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-2 py-1 rounded-full text-white bg-black hover:bg-red-600'>Login</Link>
            )
          }

          </div>
        </div>
      </div>
    </header>
  )

}

export default Header