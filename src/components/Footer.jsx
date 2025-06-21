import React from 'react'
import Logo from '../assets/sign samuelbagin-white.png'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom"


function Footer() {
    return (
        <div className='w-full lg:h-[250px] h-[500px] bg-[#0d0d0d] text-[#FEFEFA] justify-center items-center flex'>
            {/* on small screen footer */}
            <div className='justify-center items-center lg:hidden grid grid-rows-5 h-3/5 gap-5'>
                <div className='row-span-2 justify-center items-center flex translate-x-[-2px]'><Link to='/'><img src={Logo} alt="logo" style={{ width: '160px' }} /></Link></div>
                <div className='flex justify-center items-center gap-4'>
                    
                    <a href='https://www.linkedin.com/in/samuel-bag%C3%ADn/' target='_blank' rel='noopener noreferrer'><FaLinkedin size={27} className=' hover:scale-95 duration-150 ease-out' /></a>
                    <a href='https://github.com/samuelbagin1' target='_blank' rel='noopener noreferrer'><FaGithub size={27} className=' hover:scale-95 duration-150 ease-out' /></a>
                    <a href='https://www.instagram.com/samuelbagin/' target='_blank' rel='noopener noreferrer'><FaInstagram size={27} className=' hover:scale-95 duration-150 ease-out' /></a>
                    <a href='https://x.com/samuelbagin' target='_blank' rel='noopener noreferrer'><FaXTwitter size={27} className=' hover:scale-95 duration-150 ease-out' /></a>
                </div>
                <div className='flex justify-center items-center '>
                    <a className=" font-boldd text-sm border border-solid border-[#fefefa7e] opacity-90 rounded-lg w-36 h-9 align-middle flex items-center justify-center " href="mailto:samuel.bagin1@gmail.com?subject=Hello%20Samuel&body=Hi%20Samuel,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards">leave an email <FaArrowRightLong className='ml-2' /></a>
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
                        <a href='https://www.linkedin.com/in/samuel-bag%C3%ADn/' target='_blank' rel='noopener noreferrer'><FaLinkedin size={25} className='m-2 hover:scale-95 duration-150 ease-out' /></a>
                        <a href='https://github.com/samuelbagin1' target='_blank' rel='noopener noreferrer'><FaGithub size={25} className='m-2 hover:scale-95 duration-150 ease-out' /></a>
                        <a href='https://www.instagram.com/samuelbagin/' target='_blank' rel='noopener noreferrer'><FaInstagram size={25} className='m-2 hover:scale-95 duration-150 ease-out' /></a>
                        <a href='https://x.com/samuelbagin' target='_blank' rel='noopener noreferrer'><FaXTwitter size={25} className='m-2 hover:scale-95 duration-150 ease-out' /></a>
                    </div>
                    <div className='flex justify-center items-center w-max relative group'>
                        <a className='flex justify-center items-center m-2 ease-out duration-150 after:transition' href="mailto:samuel.bagin1@gmail.com?subject=Hello%20Samuel&body=Hi%20Samuel,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards">
                            leave an email
                            <FaArrowRightLong className='ml-2' />
                        </a>
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