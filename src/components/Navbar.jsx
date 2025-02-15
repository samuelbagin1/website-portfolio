import React, {useState} from 'react'
import Logo from '../assets/sign samuelbagin-white.png'
import { FaBars } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"


const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-8 text-[#FEFEFA] bg-[#000000ba] backdrop-blur-md z-50'>
        <div>
            <Link to='/'><img src={Logo} alt="" className='md:w-[150px] w-[120px]' /></Link>
        </div>

        <ul className='hidden md:flex space-x-5 px-2'>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/'>Home</Link></li>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/portfolio'>Portfolio</Link></li>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/skills'>Skills</Link></li>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/contact'>Contact</Link></li>
        </ul>


        {/* menu nav bar when screen mobile/md */}
        <div onClick={handleClick} className='md:hidden z-10'>
            {nav ? <IoClose size='30'/> : <FaBars size='20' />}
        </div>
        <ul className={nav ? 'absolute top-0 left-0 w-full h-dvh flex flex-col justify-center items-center bg-[#111111] gap-3 text-lg ' : 'hidden'}>
            <li className=''><Link to='/'>Home</Link></li>
            <li className=''><Link to='/portfolio'>Portfolio</Link></li>
            <li className=''><Link to='/skills'>Skills</Link></li>
            <li className=''><Link to='/contact'>Contact</Link></li>
        </ul>
    </div>
  )
}

export default Navbar