import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Contact() {
    return (
        <div className='bg-[#111111] text-[#111111]'>
            <Navbar />
            <div className='h-screen justify-center items-center flex'>
                <div className='lg:w-2/3 lg:h-1/5 w-4/5 h-1/2 grid lg:grid-cols-4 lg:grid-rows-1 grid-cols-1 grid-rows-4 gap-5 lg:gap-8 lg:text-2xl font-boldd'>
                    <a className='bg-[#FEFEFA] justify-center items-center flex rounded-3xl hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-[#FEFEFA] ease-in duration-150' href='https://www.instagram.com/samuelbagin/' target="_blank" rel="noopener noreferrer" >Instagram</a>
                    <a className='bg-[#FEFEFA] justify-center items-center flex rounded-3xl hover:bg-red-600 hover:text-[#FEFEFA] ease-in duration-150'>Email</a>
                    <a className='bg-[#FEFEFA] justify-center items-center flex rounded-3xl hover:bg-indigo-700 hover:text-[#FEFEFA] ease-in duration-150'>Discord</a>
                    <a className='bg-[#FEFEFA] justify-center items-center flex rounded-3xl hover:bg-green-600 hover:text-[#FEFEFA] ease-in duration-150'>Whatsapp</a>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact