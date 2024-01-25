import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'



function Portfolio() {
  return (
    <div>
      <Navbar />
      <div className='h-screen w-full justify-center items-center flex bg-slate-900 text-[#F2F3F4]'>
        <div className=' grid grid-cols-2 grid-rows-2 gap-5 w-2/3 h-3/5 text-center items-center '>
          <Link to='/portfolio/photo'>Photo</Link>
          <Link to='/portfolio/video'>Video</Link>
          <Link to='/portfolio/graphic'>Graphic Design</Link>
          <Link to='/portfolio/develop'>Develop Projects</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Portfolio