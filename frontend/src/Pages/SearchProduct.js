import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/verticalProductCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    console.log("query",query.search)

    const fetchProduct = async()=>{
      setloading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
       setloading(false)

        setData(dataResponse.data)

        
    }

    useEffect(()=>{
        fetchProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-center text-lg'>Loading....</p>
        )
      }
      
         <p className='text-lg font-semibold '>Search Results : {data.length}</p> 
         <br></br>
         {
          data.length === 0 && !loading && (
            <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
          )
         }

         {
          data.length !==0 && !loading && (
            
              <VerticalCard loading={loading} data={data} />
              )
            
          
         }
      </div>
  )
}

export default SearchProduct