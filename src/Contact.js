import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Contact() {
    return (
        <div className='bg-[#E4D8C9] text-[#FEFEFA]'>
            <Navbar />
            <div className='h-screen justify-center items-center flex'>
                <div className='w-2/3 h-2/3 grid grid-cols-2 grid-rows-2 gap-5 lg:text-3xl font-boldd'>
                    <div className='bg-[#111111] justify-center items-center flex rounded-3xl hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] ease-in duration-150'>Instagram</div>
                    <div className='bg-[#111111] justify-center items-center flex rounded-3xl hover:bg-red-600 ease-in duration-150'>Email</div>
                    <div className='bg-[#111111] justify-center items-center flex rounded-3xl hover:bg-indigo-700 ease-in duration-150'>Discord</div>
                    <div className='bg-[#111111] justify-center items-center flex rounded-3xl hover:bg-green-600 ease-in duration-150'>Whatsapp</div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact