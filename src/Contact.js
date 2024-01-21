import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Contact() {
    return (
        <div className='bg-[#F2F3F4] text-[#111111]'>
            <Navbar />
            <div className='h-screen justify-center items-center flex'>
                <div className='lg:w-2/3 lg:h-1/5 w-4/5 h-1/2 grid lg:grid-cols-4 lg:grid-rows-1 grid-cols-1 grid-rows-4 gap-5 lg:gap-8 lg:text-2xl font-boldd'>
                    <div className='bg-[#B2BEB5] justify-center items-center flex rounded-3xl hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-[#FEFEFA] ease-in duration-150'>Instagram</div>
                    <div className='bg-[#B2BEB5] justify-center items-center flex rounded-3xl hover:bg-red-600 hover:text-[#FEFEFA] ease-in duration-150'>Email</div>
                    <div className='bg-[#B2BEB5] justify-center items-center flex rounded-3xl hover:bg-indigo-700 hover:text-[#FEFEFA] ease-in duration-150'>Discord</div>
                    <div className='bg-[#B2BEB5] justify-center items-center flex rounded-3xl hover:bg-green-600 hover:text-[#FEFEFA] ease-in duration-150'>Whatsapp</div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact