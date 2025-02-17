import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Contact() {
    return (
        <div>
            <p className='absolute top-1/2 text-center w-full text-6xl z-10 font-boldd mix-blend-difference text-[#FEFEFA]'>Forget that</p>
            <div className='bg-gradient-to-br from-[#202020] to-[#111111] animate-spin'>
                <Navbar />
                <div className='h-lvh py-64 justify-center items-center md:flex grid text-[#FEFEFA] gap-5 lg:text-xl font-boldd '>
                    <a className='h-14 w-52 justify-center items-center flex rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] ease-in duration-150' href='https://www.instagram.com/samuelbagin/' target="_blank" rel="noopener noreferrer" >Instagram</a>
                    <a className='h-14 w-52 justify-center items-center flex rounded-full bg-red-600 ease-in duration-150'>Email</a>
                    <a className='h-14 w-52 justify-center items-center flex rounded-full bg-indigo-700 ease-in duration-150'>Discord</a>
                    <a className='h-14 w-52 justify-center items-center flex rounded-full bg-[#0a66c2] hover:bg-[#084f96] ease-in duration-150'>LinkedIn</a>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Contact