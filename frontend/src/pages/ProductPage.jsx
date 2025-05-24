import React from 'react'
import Nav from './components/Nav'
import Products from './components/Products'
import Footer from './components/Footer'

const ProductPage = () => {
  return (
    <div className='bg-rose-50 mt-[-4rem]'>
        <Nav/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default ProductPage