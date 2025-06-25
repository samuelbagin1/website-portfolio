import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function Skills() {

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Initialize Lenis smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
  
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      // Cleanup
      return () => {
        lenis.destroy();
      };
    }, []);

  return (
    <div className='bg-[#0e0e0e] text-[#FEFEFA]'>
      <Navbar />
      <div className='h-20'></div>
      <div className='h-[300vh] justify-center items-center flex py-8'>
        <div className="grid grid-cols-3 grid-rows-12 gap-4 w-4/5 h-full font-bold text-md text-center lg:text-3xl">
          <div className="col-span-2 bg-[#00E6B3] text-[#312AF8] justify-center items-center flex rounded-2xl">Object Oriented Programming</div>
          <div className="row-span-2 col-start-3 bg-[#91FBC7] text-[#920089] justify-center items-center flex rounded-2xl">C++</div>

          <div className="col-start-2 row-start-2 bg-[#00C944] text-[#00385B] justify-center items-center flex rounded-2xl">Java</div>
          <div className="col-start-1 row-start-2 bg-[#20CBD2] text-[#38226F] justify-center items-center flex rounded-2xl">NextJS</div>

          <div className="col-span-2 row-span-2 row-start-3 bg-[#FF0C75] text-[#760073] justify-center items-center flex rounded-2xl">C</div>
          <div className="col-start-3 row-start-3 bg-[#54A4A8] text-[#5B0047] justify-center items-center flex rounded-2xl">Matlab</div>

          <div className="row-span-2 col-start-3 row-start-4 bg-[#76C187] text-[#4C545C] justify-center items-center flex rounded-2xl">AI</div>
          <div className="col-span-2 col-start-2 row-start-6 bg-[#39CEF1] text-[#341B4E] justify-center items-center flex rounded-2xl">NoSQL</div>

          <div className="col-start-2 row-start-5 bg-[#E45538] text-[#383F7B] justify-center items-center flex rounded-2xl">MySQL</div>
          <div className="row-span-2 col-start-1 row-start-5 bg-[#EF4759] text-[#130B54] justify-center items-center flex rounded-2xl">MongoDB</div>

          <div className="row-span-2 col-start-2 row-start-7 bg-[#20C9A9] text-[#454653] justify-center items-center flex rounded-2xl">Vercel Serverless</div>
          <div className="col-start-1 row-start-7 bg-[#009FB2] text-[#003780] justify-center items-center flex rounded-2xl">Photoshop</div>

          <div className="row-span-2 col-start-1 row-start-8 bg-[#79EE3C] text-[#103934] justify-center items-center flex rounded-2xl">Lightroom</div>
          <div className="row-span-2 col-start-3 row-start-7 bg-[#BFF6E7] text-[#244CDF] justify-center items-center flex rounded-2xl">Davinci Resolve</div>

          <div className="col-span-2 col-start-2 row-start-9 bg-[#0077FF] text-[#FF0200] justify-center items-center flex rounded-2xl">Javascript</div>
          <div className="col-span-2 row-span-2 row-start-10 bg-[#0CD5DF] text-[#121E53] justify-center items-center flex rounded-2xl">HTML/CSS</div>

          <div className="col-start-3 row-start-10 bg-[#104362] text-[#11CD40] justify-center items-center flex rounded-2xl">React</div>
          <div className="col-start-3 row-start-11 bg-[#8E0095] text-[#9CFED9] justify-center items-center flex rounded-2xl">Python</div>

          <div className="col-span-2 col-start-2 row-start-12 bg-[#6D63CD] text-[#33D2A7] justify-center items-center flex rounded-2xl">Video Editing</div>
          <div className="col-start-1 row-start-12 bg-[#00FF7F] text-[#103934] justify-center items-center flex rounded-2xl">Photo Editing</div>
        </div>
      </div>

      <div className='text-center text-xs lg:text-sm opacity-30 mb-10 w-3/4 mx-auto'>
        <span>DISCLAIMER:</span> size of the box does not represent knowledge or skill level.
      </div>
      <Footer />
    </div>
  )
}

export default Skills