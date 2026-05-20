import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

const HomeProduct = () => {
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()
      setAllProduct(dataResponse?.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className="p-4 px-1 my-4 ml-4 relative">
      <h2 className="text-xl font-bold mb-4">All Featured E-Books</h2>

      <div className="flex items-center flex-wrap gap-9">
  {allProduct.map((product, index) => (
    <Link to={"product/"+ product?._id}
      key={index + "homeProduct"}
      className="w-[216px] border rounded-lg justify-center shadow-sm overflow-hidden bg-white"
    >
      {/* Product Image */}
      <div className="bg-slate-900 h-[150px] p-2 flex items-center justify-center">
        {product?.productImage?.[0] ? (
          <img
            src={product.productImage[0]}
            alt={product.productName || "product"}
            className="object-scale-down h-full hover:scale-110 transition-all duration-300"
            onError={(e) => {
              e.target.src = "/fallback-image.jpg"; // optional fallback
            }}
          />
        ) : (
          <div className="text-xs text-white">No Image</div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-2 flex flex-col gap-1">
        <h3 className="text-sm font-medium">
          {product?.productName || "Unnamed"}
        </h3>

        <div className="flex gap-3">
          <p className="text-red-600 font-medium">
            {displayINRCurrency(product?.selling)}
          </p>
          <p className="text-slate-800 line-through">
            {displayINRCurrency(product?.price)}
          </p>
        </div>

        <button
          className="text-sm bg-red-600 hover:bg-red-700 text-white w-full py-1 rounded-full mt-2"
          onClick={(e) => handleAddToCart(e, product?._id)}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  ))}
</div>

    </div>
  )
}

export default HomeProduct
