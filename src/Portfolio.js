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
      <div className='h-svh md:h-screen w-full justify-center items-center flex bg-[#000000] font-bold text-7xl md:text-9xl'>
        <div className=' grid w-3/4 h-3/5 items-center '>
          <Link to='/portfolio/photo' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1 '><GradientText className='from-[#36FFC3] to-[#070722]'>Photo</GradientText></Link>
          <Link to='/portfolio/video' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText className='from-[#13CDD8] to-[#101D51]'>Video</GradientText></Link>
          <Link to='/portfolio/graphic' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText className='from-[#FF2941] to-[#191051]'>Graphic</GradientText></Link>
          <Link to='/portfolio/develop' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText className='from-[#C64BFF] to-[#00008B]'>Develop</GradientText></Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Portfolio