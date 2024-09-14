import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Contact() {
    return (
        <div className='bg-[#111111] text-[#111111]'>
            <Navbar />
            <div className='h-svh md:h-screen justify-center items-center flex'>
                <div className='lg:w-2/3 lg:h-1/5 w-4/5 h-1/2 grid lg:grid-cols-5 lg:grid-rows-1 grid-cols-1 grid-rows-5 gap-5 lg:gap-8 lg:text-2xl font-boldd '>
                    <a className='border-[#FEFEFA] border-solid border hover:border-hidden justify-center items-center flex rounded-3xl hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-[#FEFEFA] ease-in duration-150' href='https://www.instagram.com/samuelbagin/' target="_blank" rel="noopener noreferrer" >Instagram</a>
                    <a className='border-[#FEFEFA] border-solid border hover:border-hidden justify-center items-center flex rounded-3xl hover:bg-red-600 text-[#FEFEFA] ease-in duration-150'>Email</a>
                    <a className='border-[#FEFEFA] border-solid border hover:border-hidden justify-center items-center flex rounded-3xl hover:bg-indigo-700 text-[#FEFEFA] ease-in duration-150'>Discord</a>
                    <a className='border-[#FEFEFA] border-solid border hover:border-hidden justify-center items-center flex rounded-3xl hover:bg-green-600 text-[#FEFEFA] ease-in duration-150'>Whatsapp</a>
                    <a className='border-[#FEFEFA] border-solid border hover:border-hidden justify-center items-center flex rounded-3xl hover:bg-[#0a66c2] text-[#FEFEFA] ease-in duration-150'>LinkedIn</a>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact