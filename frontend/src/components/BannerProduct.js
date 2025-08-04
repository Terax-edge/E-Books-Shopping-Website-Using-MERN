import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/b1.jpg'
import image2 from '../assest/banner/b2.jpg'
import image3 from '../assest/banner/b3.jpg'
import image4 from '../assest/banner/b4.jpg'
import { VscTriangleRight } from "react-icons/vsc";
import image1M from '../assest/banner/b1.jpg'
import image2M from '../assest/banner/b2.jpg'
import image3M from '../assest/banner/b3.jpg'
import image4M from '../assest/banner/b4.jpg'
import { VscTriangleLeft } from "react-icons/vsc";


const BannerProduct = () => {

  const [currentImage, setCurrentImage] = useState(0)
  const desktopImages =  [
    image1, image2, image3, image4
  ]

    const mobileImages =  [
    image1M, image2M, image3M, image4M
  ]
  const nextImage = () => {
    if(desktopImages.length-1 > currentImage ){
    setCurrentImage(preve => preve + 1)
  }
}

const preveImage = () => {
    if(currentImage != 0 ){
    setCurrentImage(preve => preve - 1)
  }
}

useEffect(()=>{
  const interval = setInterval(()=>{
    if(desktopImages.length - 1 > currentImage){
      nextImage()
    }else{
      setCurrentImage(0)
    }
  },5000)
  return ()=> clearInterval(interval)
},[currentImage])

  return (
    <div className=''>
        <div className='h-60 md:h-96 w-full bg-slate-300 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center '>
              <div className=' flex justify-between w-full text-5xl'>
              <button onClick={preveImage} className='  bg-slate-300 hover:bg-black hover:text-white shadow-md rounded-full p-1'><VscTriangleLeft /></button>
              <button onClick={nextImage} className='  bg-slate-300 hover:bg-black hover:text-white shadow-md rounded-full p-1'><VscTriangleRight /></button>
              </div>
            </div>
          {/**Desktop and Tablet version */}
        <div className='hidden md:flex w-full h-full overflow-hidden'>
            {
           desktopImages.map((imageURl , index)=>{
              return(
                  <div className='w-full h-full min-w-full min-h-full transition-all relative' key={imageURl} style= {{transform: `translateX(-${currentImage*100}%)`}}>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40"><h1 className='text-white text-2xl md:text-3xl font-bold text-center px-4 max-w-3xl mx-auto leading-snug'>
                      Design and Development of a MERN Stack-Based <br /> Digital Bookstore for Selling E-Books in PDF Format</h1>
                    </div>
                    <img src={imageURl} className='w-full h-full'/>
              
                  </div>
              )
            })
          }
          </div>

           {/**Mobile Version */}
        <div className='flex w-full h-full overflow-hidden md:hidden'>
            {
          mobileImages.map((imageURl , index)=>{
              return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style= {{transform: `translateX(-${currentImage*100}%)`}}>
              <img src={imageURl} className='w-full h-full'/>
            </div>
              )
            })
          }
          
          </div>
            
        </div>
    </div>
  )
}

export default BannerProduct