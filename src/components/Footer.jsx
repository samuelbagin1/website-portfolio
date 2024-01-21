import React from 'react'
import Logo from '../assets/sign samuelbagin-white.png'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom"


function Footer() {
    return (
        <div className='w-full lg:h-[250px] h-[500px] bg-[#111111] text-[#FEFEFA] justify-center items-center flex'>

            {/* on small screen longer footer */}
            <div className='justify-center items-center lg:hidden grid grid-rows-6 gap-4 h-4/5 '>
                <div className='row-span-3'><Link to='/'><img src={Logo} alt="logo" style={{ width: '200px' }} /></Link></div>
                <div className='flex justify-center items-center'>
                    <FaLinkedin size={27} className='m-2 hover:scale-95 duration-150 ease-out' />
                    <FaGithub size={27} className='m-2 hover:scale-95 duration-150 ease-out' />
                    <FaInstagram size={27} className='m-2 hover:scale-95 duration-150 ease-out' />
                    <FaTwitter size={27} className='m-2 hover:scale-95 duration-150 ease-out' />
                </div>
                <div className='flex justify-center items-center'><button className='flex justify-center items-center border-solid border-b m-2 hover:px-2 ease-out duration-150'>leave an email <FaArrowRightLong className='ml-2' /></button></div>
                <ul className='flex justify-center items-center gap-5'>
                    <li className='hover:scale-95 duration-150 ease-out'><Link to='/portfolio'>Portfolio</Link></li>
                    <li className='hover:scale-95 duration-150 ease-out'><Link to='/skills'>Skills</Link></li>
                    <li className='hover:scale-95 duration-150 ease-out'><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>



            <div className='justify-center items-center w-1/2 hidden lg:grid gap-5'>
                <div className='justify-center items-center flex'><Link to='/'><img src={Logo} alt="logo" style={{ width: '180px' }} /></Link></div>
                <div className='lg:grid-cols-5 flex gap-7'>
                    <div className='flex justify-center items-center'>
                        <FaLinkedin size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                        <FaGithub size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                        <FaInstagram size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                        <FaTwitter size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                    </div>
                    <div className='flex justify-center items-center'><button className='flex justify-center items-center border-solid border-b m-2 hover:px-2 ease-out duration-150'>leave an email <FaArrowRightLong className='ml-2' /></button></div>
                    <ul className='flex justify-center items-center gap-5'>
                        <li className='hover:scale-95 duration-150 ease-out'><Link to='/portfolio'>Portfolio</Link></li>
                        <li className='hover:scale-95 duration-150 ease-out'><Link to='/skills'>Skills</Link></li>
                        <li className='hover:scale-95 duration-150 ease-out'><Link to='/contact'>Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer