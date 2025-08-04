import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

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

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Featured E-Books</h2>

      <div className="flex items-center flex-wrap gap-9">
        {allProduct.map((product, index) => (
          <AdminProductCard
            key={index + "homeProduct"}
            data={product}
            fetchdata={fetchAllProduct}
            showEdit={false}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeProduct
