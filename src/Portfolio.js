import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import GradientText from './components/GradientText'



function Portfolio() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className='h-svh md:h-screen w-full justify-center items-center flex bg-[#000000] text-[#FEFEFA] font-bold text-7xl md:text-9xl'>
        <div className=' grid grid-rows-6 md:grid-rows-4 gap-20 md:gap-5 w-3/4 h-3/5 items-center '>
          <Link to='/portfolio/photo' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText gradient='gradient38' >Photo</GradientText></Link>
          <Link to='/portfolio/video' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText gradient='gradient64'>Video</GradientText></Link>
          <Link to='/portfolio/graphic' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1 md:row-span-1 row-span-2'><GradientText gradient='gradient73' direction='to-left'>Graphic Design</GradientText></Link>
          <Link to='/portfolio/develop' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1 md:row-span-1 row-span-2'><GradientText gradient='gradient85' direction='to-left'>Develop Projects</GradientText></Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Portfolio