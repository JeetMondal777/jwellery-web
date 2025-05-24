import React from 'react'
import Navbar from './components/Nav'
import Orders from './components/Orders'
import Footer from './components/Footer'

const OrderPage = () => {
  return (
    <div className='bg-rose-50'>
        <Navbar/>
        <Orders/>
        <Footer/>
    </div>
  )
}

export default OrderPage