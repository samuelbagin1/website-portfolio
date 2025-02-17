import React from 'react'
import Logo from '../assets/sign samuelbagin-white.png'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom"


function Footer() {
    return (
        <div className='w-full lg:h-[250px] h-[500px] bg-[#111111] text-[#FEFEFA] justify-center items-center flex'>
            {/* on small screen footer */}
            <div className='justify-center items-center lg:hidden grid grid-rows-5 h-3/5 gap-5'>
                <div className='row-span-2 justify-center items-center flex'><Link to='/'><img src={Logo} alt="logo" style={{ width: '160px' }} /></Link></div>
                <div className='flex justify-center items-center gap-4'>
                    <FaLinkedin size={27} className=' hover:scale-95 duration-150 ease-out' />
                    <FaGithub size={27} className=' hover:scale-95 duration-150 ease-out' />
                    <FaInstagram size={27} className=' hover:scale-95 duration-150 ease-out' />
                    <FaTwitter size={27} className=' hover:scale-95 duration-150 ease-out' />
                </div>
                <div className='flex justify-center items-center '>
                    <button className=" font-boldd text-sm border border-solid border-[#fefefa7e] opacity-90 rounded-lg w-40 h-10 align-middle flex items-center justify-center ">leave an email <FaArrowRightLong className='ml-2' /></button>
                </div>
                <ul className='flex justify-center items-center gap-5'>
                    <li className='hover:scale-95 duration-150 ease-out'><Link to='/portfolio'>Portfolio</Link></li>
                    <li className='hover:scale-95 duration-150 ease-out'><Link to='/skills'>Skills</Link></li>
                    <li className='hover:scale-95 duration-150 ease-out'><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>



            <div className='justify-center items-center w-1/2 hidden lg:grid gap-5'>
                <div className='justify-center items-center flex hover:animate-pulse'><Link to='/'><img src={Logo} alt="logo" style={{ width: '150px' }} /></Link></div>
                <div className='lg:grid-cols-5 flex gap-7'>
                    <div className='flex justify-center items-center'>
                        <FaLinkedin size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                        <FaGithub size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                        <FaInstagram size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                        <FaTwitter size={25} className='m-2 hover:scale-95 duration-150 ease-out' />
                    </div>
                    <div className='flex justify-center items-center w-max relative group'>
                        <button className='flex justify-center items-center m-2 ease-out duration-150 after:transition'>
                            leave an email
                            <FaArrowRightLong className='ml-2' />
                        </button>
                        <span className='absolute bottom-1 left-0 w-0 transition-all h-px rounded-lg bg-[#FEFEFA] group-hover:w-full'></span>
                    </div>
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