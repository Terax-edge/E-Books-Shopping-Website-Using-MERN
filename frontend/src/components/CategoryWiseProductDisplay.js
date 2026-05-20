import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';

import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);


  const { fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true);
    
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : []);
      
    } catch (err) {
      console.error('fetchCategoryWiseProduct error', err);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  
  if (loading) {
    return (
      <div className="container px-1 my-4 ml-4">
        <h2 className="text-2xl font-semibold py-2">{heading}</h2>
        <div className=" justify-between gap-4 overflow-x-auto">
          {loadingList.map((_, i) => (
            <div
              key={i}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-gray-100 rounded-sm shadow flex items-center justify-center"
            >
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="contianer px-1 my-4 ml-4 relative ">
         <h2 className="text-2xl font-semibold py-2">{heading}</h2>
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(300px,320px))]  justify-between overflow-x-auto transition-all  " >



        {data.length === 0 && <p className="text-sm text-gray-600">No products found.</p>}

        {data.map((product, index) => (
          <Link to={"/product/"+ product?._id}
            key={product?._id || index}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex mb-4 " onClick={scrollTop}>
            <div className="bg-slate-900 h-full p-2 min-w-[120px] md:min-w-[145px] flex items-center justify-center ">
              {product?.productImage?.[0] ? (
                <img
                  src={product.productImage[0]}
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
    </div>
  );
};

export default CategoryWiseProductDisplay;
