import React, {useState} from 'react'
import Logo from '../assets/sign samuelbagin-white.png'
import { FaBars } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"


const Navbar = ({ onLogoReady, variant = "default" }) => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    const navbarStyle = variant === "glass"
      ? "border-b border-white/15 bg-white/[0.08] backdrop-blur-2xl"
      : "bg-[#000000ba] backdrop-blur-md"
    const mobileMenuStyle = variant === "glass"
      ? "border-t border-white/15 bg-black/25 backdrop-blur-3xl"
      : "bg-[#0e0e0e]"

  return (
    <div className={`fixed z-40 flex h-[80px] w-full items-center justify-end text-[#FEFEFA] ${navbarStyle}`}>
        <div className='w-screen absolute flex justify-center translate-y-[2px] translate-x-[-2px]'>
            <Link to='/' aria-label="Samuel Bagin home"><img src={Logo} alt="Samuel Bagin" onLoad={onLogoReady} onError={onLogoReady} className=' md:w-[150px] w-[130px] justify-self-center ' /></Link>
        </div>

        <ul className='hidden md:flex space-x-5 px-7 z-50'>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/'>Home</Link></li>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/portfolio'>Portfolio</Link></li>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/skills'>Skills</Link></li>
            <li className='hover:scale-95 duration-150 ease-out'><Link to='/contact'>Contact</Link></li>
        </ul>


        {/* menu nav bar when screen mobile/md */}
        <button
            type="button"
            onClick={handleClick}
            className='z-10 flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden'
            aria-label={nav ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={nav}
        >
            {nav ? <IoClose size='30'/> : <FaBars size='20' />}
        </button>
        <ul className={nav ? `absolute left-0 top-0 flex h-dvh w-full flex-col items-center justify-center gap-3 text-lg ${mobileMenuStyle}` : 'hidden'}>
            <li><Link className="flex min-h-11 items-center px-5" to='/' onClick={() => setNav(false)}>Home</Link></li>
            <li><Link className="flex min-h-11 items-center px-5" to='/portfolio' onClick={() => setNav(false)}>Portfolio</Link></li>
            <li><Link className="flex min-h-11 items-center px-5" to='/skills' onClick={() => setNav(false)}>Skills</Link></li>
            <li><Link className="flex min-h-11 items-center px-5" to='/contact' onClick={() => setNav(false)}>Contact</Link></li>
        </ul>
    </div>
  )
}

export default Navbar
