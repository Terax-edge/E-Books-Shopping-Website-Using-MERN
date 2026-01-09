import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const VerticalCard = ({loading, data =[]}) => {
    const loadingList = new Array(13).fill(null);

    const { fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center gap-4 md:justify-between overflow-x-auto transition-all  " >



        {data.length === 0 && <p className="text-sm text-gray-600">No products found.</p>}
        
        {data.map((product, index) => (
          <Link to={"/product/"+ product?._id}
            key={product?._id || index}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex mb-4  " onClick={scrollTop}>
            <div className="bg-slate-900 h-full p-2 min-w-[120px] md:min-w-[145px] flex items-center justify-center ">
              {product?.productImage?.[0] ? (
                <img
                  src={product?.productImage[0]}
                  alt={product.productName || 'product'}
                  className="object-scale-down h-full hover:scale-110 transition-all"
                  onError={(e) => {
                    e.target.src = '/fallback-image.jpg'; // optional fallback
                  }}
                />
              ) : (
                <div className="text-xs text-white">No Image</div>
              )}
            </div>
             <div className="flex-1 p-2 flex flex-col justify-center">
               <h3 className="text-sm font-medium">{product?.productName || 'Unnamed'}</h3>
                 <div className='flex gap-3'>
                   <p className='text-red-600 font-medium'>{displayINRCurrency(product?.selling) }</p>
                    <p className='text-slate-800 line-through'>{displayINRCurrency(product?.price) }</p>
                 </div>
               <button className='text-sm bg-red-600 hover:bg-red-700 text-white w-32 py-1 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
              </div>
          </Link>
        ))}
         
      </div>
  )
}

export default VerticalCard