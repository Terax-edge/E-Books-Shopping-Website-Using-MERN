import React, { useState} from 'react'
import { FiEdit2 } from "react-icons/fi";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({
    data,
    fetchdata , showEdit = true
}) => {
    
    const [editProduct, setEditProduct] = useState(false)

    return (
      <div className=" flex flex-wrap  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div className='  w-40 p-8 bg-white shadow rounded text-center '>
          <img 
            src={data?.productImage[0]} 
            alt={data?.productName || 'Product image'}
            width={120} 
            height={100} 
            className='w-[120px] h-[100px] object-contain mx-auto'
          />
          <div className=''>
            <h1 className='text-center break-words whitespace-normal w-full'>{data.productName}</h1>
            {showEdit && (
              <div className='w-fit ml-auto p-2 bg-green-400 hover:bg-green-600 rounded-full text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                <FiEdit2 />
              </div>
            )}
          </div>

          {editProduct && (
            <AdminEditProduct productData={data} onClose={()=> setEditProduct(false)} fetchdata={fetchdata}/>
          )}
        </div>
      </div>  
    )
}

export default AdminProductCard