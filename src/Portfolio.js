import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'



function Portfolio() {
  return (
    <div>
      <Navbar />
      <div className='h-screen w-full justify-center items-center flex bg-[#111111] text-[#111111] font-boldd'>
        <div className=' grid grid-cols-2 grid-rows-2 gap-5 w-3/4 h-3/5 text-center items-center '>
          <Link to='/portfolio/photo' className='bg-[#FEFEFA] rounded-xl h-5/6 justify-center items-center flex'>Photo</Link>
          <Link to='/portfolio/video' className='bg-[#FEFEFA] rounded-xl h-5/6 justify-center items-center flex'>Video</Link>
          <Link to='/portfolio/graphic' className='bg-[#FEFEFA] rounded-xl h-5/6 justify-center items-center flex'>Graphic Design</Link>
          <Link to='/portfolio/develop' className='bg-[#FEFEFA] rounded-xl h-5/6 justify-center items-center flex'>Develop Projects</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Portfolio