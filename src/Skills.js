import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Skills() {
  return (
    <div className='bg-[#0e0e0e] text-[#FEFEFA]'>
        <Navbar />
        <div className='h-svh md:h-screen justify-center items-center flex'>
                <div className='w-2/3 h-3/5 grid md:grid-cols-5 md:grid-rows-2 grid-rows-5 grid-cols-2 gap-5 md:text-xl 2xl:text-2xl text-sm font-boldd text-center'>
                    <div className='bg-[#9ABF9A] text-[#003949] justify-center items-center flex rounded-3xl ease-in duration-150 md:col-span-2 md:row-span-1 row-span-2'>Video Editing</div>
                    <div className='bg-[#1BE79C] text-[#B5228A] justify-center items-center flex rounded-3xl ease-in duration-150'>Javascript</div>
                    <div className='bg-[#282C53] text-[#29CBCE] justify-center items-center flex rounded-3xl ease-in duration-150'>HTML/CSS</div>
                    <div className='bg-[#072240] text-[#279F63] justify-center items-center flex rounded-3xl ease-in duration-150 md:row-span-2 md:col-span-1 col-span-2'>React</div>
                    <div className='bg-[#500348] text-[#51A5AF] justify-center items-center flex rounded-3xl ease-in duration-150'>Photo Editing</div>
                    <div className='bg-[#232854] text-[#1AD2D5] justify-center items-center flex rounded-3xl ease-in duration-150 md:row-span-1 row-span-2'>Python</div>
                    <div className='bg-[#1BCF79] text-[#294945] justify-center items-center flex rounded-3xl ease-in duration-150 md:col-span-2'>Graphic Design</div>
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default Skills