import React, {useState} from 'react'
import Logo from '../assets/sign samuelbagin-white.png'
import {FaBars, FaTimes} from 'react-icons/fa'


const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-8 text-[#FEFEFA]'>
        <div>
            <img src={Logo} alt="" style={{width: '150px'}}/>
        </div>

        <ul className='hidden md:flex space-x-5 px-2'>
            <li>Home</li>
            <li>Portfolio</li>
            <li>Skills</li>
            <li>Contact</li>
        </ul>


        {/* menu nav bar when screen mobile/md */}
        <div onClick={handleClick} className='md:hidden z-10'>
            {nav ? <FaTimes/> : <FaBars/>}
        </div>
        <ul className={nav ? 'absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-[#111111]' : 'hidden'}>
            <li>Home</li>
            <li>Portfolio</li>
            <li>Skills</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar