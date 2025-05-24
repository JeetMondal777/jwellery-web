import React from 'react'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import Wishlist from './components/Wishlist'

const WishlistPage = () => {
  return (
    <div className='bg-rose-50  mt-[-80px]'>
        <Navbar/>
        <Wishlist/>
        <Footer/>
    </div>
  )
}

export default WishlistPage