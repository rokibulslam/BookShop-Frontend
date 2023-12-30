import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import TopTenBooks from '../components/Book/TopTenBooks'


const Layout = () => {
  return (
      <div>
          <Navbar />
          <Outlet />
          <Footer />
    </div>
  )
}

export default Layout