import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import moment from 'moment'
import {MdModeEdit} from "react-icons/md"; 
import ChangeUserRole from '../components/ChangeUserRole';
import setShowConfirmPassword from "./Signup"

const AllUsers = () => {
  const [allUsers,setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name : "",
    role : "",
    _id : ""

  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method : SummaryApi.allUser.method,
      credentials :'include'
    })
  

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }

    
  }
  useEffect(()=>{
    fetchAllUsers()
  },[])
  return (
    <div className="w-full usertable">
       <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr className='bg-black text-white'>
        <th className="border px-4 py-2">Sr.</th>
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Email</th>
        <th className="border px-4 py-2">Role</th>
        <th className="border px-4 py-2">Created Date</th>
        <th className="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          allUsers.map((el,index) => {
            return(
              <tr>
                <td>{index+1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.CreatedAt).format('LL')}</td>
                <td>
                  <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white' 
                  onClick={()=>{
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)
                  }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole onClose={()=> setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId = {updateUserDetails._id}
            callFunc = {fetchAllUsers}
          />
        )

      }
      
    </div>
  )
}

export default AllUsers