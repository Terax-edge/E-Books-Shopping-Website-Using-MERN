import React from 'react'

import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import HomeProduct from './HomeProduct'


const Home = () => {
  return (
    <div>
      <BannerProduct/>

      <HorizontalCardProduct category={"storyBooks"} heading={"Best Reader's Choice Books"} />
      <HorizontalCardProduct category={"comicBooks"} heading={"Year of the Books Sold"} />
      <HorizontalCardProduct category={"technicalBooks"} heading={"Technological Books of 21'st Century"} />
      <HomeProduct/>
      
      
    </div>
  )
}
// category [ 'comicBooks', 'storyBooks', 'technicalBooks' ]

export default Home
