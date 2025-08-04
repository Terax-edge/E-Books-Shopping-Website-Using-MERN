import React, { useState, useEffect } from 'react'
import { FiEdit2 } from "react-icons/fi";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({ fetchdata }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/all-products");
        const data = await response.json();

        // ✅ Defensive check
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {products.map((product, index) => (
        <div key={index} className='w-40 p-4 bg-white shadow rounded text-center'>
          <img src={product?.productImage[0]} width={120} height={100} alt="product" />
          <div>
            <h1 className='text-center break-words whitespace-normal w-full'>{product.productName}</h1>
            <div className='w-fit ml-auto p-2 bg-green-400 hover:bg-green-600 rounded-full text-white cursor-pointer'
              onClick={() => {
                setSelectedProduct(product);
                setEditProduct(true);
              }}>
              <FiEdit2 />
            </div>
          </div>

          {
            editProduct && selectedProduct?._id === product._id && (
              <AdminEditProduct
                productData={selectedProduct}
                onClose={() => setEditProduct(false)}
                fetchdata={fetchdata}
              />
            )
          }
        </div>
      ))}
    </div>
  );
};

export default AdminProductCard;
