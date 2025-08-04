import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadImage';
import {MdDelete} from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify';


const AdminEditProduct = ({onClose, productData, fetchdata}) => {

    const [data, setData] = useState({
      ...productData, 
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    selling: productData?.selling
  });

  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;
    if (!file){
      alert("No file selected.");
       return;
    }
    if(file.size > maxSize){
      alert("File too large. Maximum allowed size is 10MB.");
      return;
    }

    setUploadProductImageInput(file.name);

    const uploadImageCloudinary = await uploadImage(file);

    setData(prev => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));


    e.target.value = null;
  };

  const handleDeleteProductImage = async(index) => {
      

      const newProductImage = [...data.productImage]
      newProductImage.splice(index, 1)

      setData((preve)=>{
        return {
          ...preve,
          productImage : [...newProductImage]
        }
      })
  }

  {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()

    const response = await fetch(SummaryApi.updateProduct.url,{
      method : SummaryApi.updateProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchdata()
    }

    if(responseData.error){
      toast.success(responseData?.message)
      
    }
    
  }

  

  return (
   <div className='fixed w-full min-h-[1000px] bg-white bg-opacity-35 top-32 left-0 right-0 bottom-0 flex justify-center'>
         <div className='fixed bg-slate-300 p-4 rounded w-full max-w-2xl max-h-[80%] h-[500px]'>
           <div className='flex justify-between items-center pb-3'>
             <h2 className='font-bold text-lg'>Edit Product</h2>
             <div className='w-fit ml-auto text-2xl text-white hover:text-black cursor-pointer' onClick={onClose}>
               <CgClose />
             </div>
           </div>
   
           <form className='grid p-4 gap-1 overflow-y-auto max-h-[400px]' onSubmit={handleSubmit}>
             <label htmlFor='productName' className='text-left'>Product Name :</label>
             <input
               type='text'
               id='productName'
               placeholder='Enter product name'
               name='productName'
               value={data.productName}
               onChange={handleOnChange}
               className='p-2 bg-slate-100 border rounded'
               required
             />
   
             <label htmlFor='brandName' className='text-left'>Brand Name :</label>
             <input
               type='text'
               id='brandName'
               placeholder='Enter brand name'
               value={data.brandName}
               name='brandName'
               onChange={handleOnChange}
               className='p-2 bg-slate-100 border rounded'
               required
             />
   
             <label htmlFor='category' className='text-left'>Category :</label>
             <select
             required
               value={data.category}
               className='p-2 bg-slate-600 border rounded'
               name="category"
               onChange={handleOnChange}
             >
               <option value="">Select Category</option> {/* ✅ Added default option */}
               {
                 productCategory.map((el, index) => (
                   <option value={el.value} key={el.value + index}>{el.label}</option>
                 ))
               }
             </select>
   
             <label htmlFor='productImage' className='mt-3 text-left'>Product Image :</label>
             <label htmlFor='uploadImageInput'>
               <div className='p-2 bg-slate-100 border rounded h-40 w-full flex justify-center items-center cursor-pointer'>
                 <div className='text-slate-500 flex justify-center items-center flex-col gap-2 '>
                   <span className='text-5xl'><FaCloudUploadAlt /></span>
                   <h1 className='text-lg'>Upload Product Image</h1>
                   <input
                     type='file'
                     id='uploadImageInput'
                     className='hidden'
                     onChange={handleUploadProduct}
                     accept="image/*"
                   />
                 </div>
               </div>
             </label>
   
             <div>
               {data?.productImage.length > 0 ? (
                 <div className='flex items-center gap-2 flex-wrap'>
                   {data.productImage.map((el, index) => {
                     return(
                    <div key={el} className='relative'>
                        <img
                       
                       src={el}
                       alt='product-preview'
                       width={80}
                       height={80}
                       className='bg-slate-100 border'
                  
                     />
                     <div className='absolute -bottom-4 right-0 bg-red-400 hover:bg-red-600' onClick= {()=>  handleDeleteProductImage(index)}>
                       <MdDelete />
                    </div>
                    </div>
                    ) })}
   
                    
                 </div>
               ) : (
                 <p className='text-red-600 text-xs'>*Please upload product image</p>
               )}
             </div>
   
             <label htmlFor='price' className='text-left'>Price :</label>
             <input
               type='number'
               id='price'
               placeholder='Enter Price'
               value={data.price}
               name='price'
               onChange={handleOnChange}
               className='p-2 bg-slate-100 border rounded'
               required
             />
   
             <label htmlFor='selling' className='text-left'>Selling Price :</label>
             <input
               type='number'
               id='selling'
               placeholder='Enter Selling Price'
               value={data.selling}
               name='selling'
               onChange={handleOnChange}
               className='p-2 bg-slate-100 border rounded'
               required
             />
              <label htmlFor='description' className='text-left'>Description :</label>
               <textarea className ='h-28 bg-slate-100 border resize-none p-1'
                placeholder='Enter product description' 
                rows={3} 
                onChange={handleOnChange} n
                ame='description'
                value={data.description}
                >
   
               </textarea>
   
             <button
               type="submit"
               className='px-3 py-2 bg-red-600 text-white mt-4 hover:bg-red-700' >
               Update Product
             </button>
           </form>
         </div>
       </div>
  )
}

export default AdminEditProduct