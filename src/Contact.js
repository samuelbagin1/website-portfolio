import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa'

import dajkwn from './gif.GIF'
import desjf from './gif2.gif'

import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

// <img src={dajkwn} className='absolute h-screen object-cover w-full md:rotate-90' />

function Contact() {

const [isLoading, setIsLoading] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Preload images
    useEffect(() => {
        const img1 = new Image();
        const img2 = new Image();
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount++;
            if (loadedCount === 2) {
                setIsLoading(false);
            }
        };

        const handleImageError = () => {
            loadedCount++;
            if (loadedCount === 2) {
                setIsLoading(false);
            }
        };

        img1.src = dajkwn;
        img2.src = desjf;

        img1.onload = handleImageLoad;
        img1.onerror = handleImageError;
        img2.onload = handleImageLoad;
        img2.onerror = handleImageError;

        // Fallback in case loading takes too long
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    // Track screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 560);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText('apollo446');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            const textArea = document.createElement('textarea');
            textArea.value = 'apollo446';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#000000] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Grid
                        size="60"
                        speed="1.5"
                        color="#69eae4"
                    />
                </div>
            </div>
        );
    }


    return (
        <div>
            <Navbar />

            <div className="absolute w-full h-lvh justify-center items-center flex -z-10">
                <img src={isSmallScreen ? dajkwn : desjf} alt='background' className="absolute h-screen object-cover w-full md:scale-105" />
                <div className="h-screen w-full absolute bg-[#00000097] justify-center backdrop-blur-md "></div>
            </div>

            <div className='h-screen flex justify-center items-center relative top-3 md:top-0'>
                <div className='md:flex justify-center items-center w-3/4 h-3/4 grid grid-cols-1 gap-5 md:gap-10 text-[#FEFEFA]'>

                    <a className='h-36 w-full md:h-96 md:w-1/5 rounded-xl bg-[#bababa11] backdrop-blur-xl p-4 md:p-10 cursor-pointer hover:bg-[#bababa3b] transition-all duration-200'
                        href='https://www.instagram.com/samuelbagin/' target='_blank' rel='noopener noreferrer'>
                        <div className='font-bold text-3xl mb-2'>Instagram</div>
                        <div className='text-sm'>@samuelbagin</div>
                        <div className='md:flex justify-center items-center md:h-3/4 '>
                            <FaInstagram size={isSmallScreen ? 70 : 150} className='absolute right-4 bottom-4 md:static hover:scale-95 duration-150 ease-out' />
                        </div>
                    </a>

                    <a
                        href="mailto:samuel.bagin1@gmail.com?subject=Hello%20Samuel&body=Hi%20Samuel,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards"
                        className='h-36 w-full md:h-96 md:w-1/5 rounded-xl bg-[#bababa11] backdrop-blur-xl p-4 md:p-10 cursor-pointer hover:bg-[#bababa3b] transition-all duration-200'
                    >
                        <div className='font-bold text-3xl mb-2'>Email</div>
                        <div className='text-sm'>samuel.bagin1@gmail.com</div>
                        <div className='flex justify-center items-center h-3/4 '>
                            <FaEnvelope size={isSmallScreen ? 65 : 150} className='absolute right-4 bottom-4 md:static hover:scale-95 duration-150 ease-out' />
                        </div>
                    </a>



                    <a
                        className='h-36 w-full md:h-96 md:w-1/5 rounded-xl bg-[#bababa11] backdrop-blur-xl p-4 md:p-10 cursor-pointer hover:bg-[#bababa3b] transition-all duration-200 relative group'
                        onClick={handleCopyToClipboard}
                    >
                        <div className='font-bold text-3xl mb-2'>Discord</div>
                        <div className={`transition-all duration-200 text-sm ${copied ? 'text-[#50D18D]' : ''}`}>
                            {copied ? 'Copied!' : 'apollo446'}
                        </div>
                        <div className='flex justify-center items-center h-3/4'>
                            <FaDiscord
                                size={isSmallScreen ? 70 : 150}
                                className={`absolute right-4 bottom-4 md:static hover:scale-95 duration-150 ease-out transition-all ${copied ? 'text-[#50D18D]' : ''}`}
                            />
                        </div>

                        {/* CSS-only tooltip */}
                        <div className='hidden md:flex absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#e8e8e845] text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap'>
                            Click to copy
                            <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#e8e8e845]'></div>
                        </div>
                    </a>





                    <a className='h-36 w-full md:h-96 md:w-1/5 rounded-xl bg-[#bababa11] backdrop-blur-xl p-4 md:p-10 cursor-pointer hover:bg-[#bababa3b] transition-all duration-200'
                        href='https://www.linkedin.com/in/samuel-bag%C3%ADn/' target='_blank' rel='noopener noreferrer'>
                        <div className='font-bold text-3xl mb-2'>LinkedIn</div>
                        <div className='text-sm'>Samuel Bagin</div>
                        <div className='flex justify-center items-center h-3/4 '>
                            <FaLinkedin size={isSmallScreen ? 70 : 150} className='absolute right-4 bottom-4 md:static hover:scale-95 duration-150 ease-out' />
                        </div>
                    </a>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact