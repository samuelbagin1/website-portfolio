import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import backImage from "./assets/background.GIF";
import Button from "./components/Button";
import BeholdWidget from './components/BeholdWidget';

import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = backImage;

    img.onload = () => {
      // Add additional loading checks here if needed
      setIsLoading(false);
    };

    img.onerror = () => {
      // Handle error case if needed
      setIsLoading(false);
    };

    // Fallback in case loading takes too long
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

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

  // mix-blend-soft-light

  // relative lg:left-40 left-10 justify-center lg:w-1/2 w-2/3 mt-24

  // flex justify-center items-center

  return (
    <div className="bg-[#111111] text-[#FEFEFA] relative z-10 w-full">
      <Navbar />

      <div className="relative w-full h-lvh justify-center items-center flex">
        <img src={backImage} alt='background' className="absolute h-screen object-cover w-full" />
        <div className="h-screen w-full absolute bg-[#00000097] justify-center backdrop-blur-md"></div>
        <div className=' font-black md:text-9xl text-6xl z-10 w-3/4 opacity-60'>
          <div>Capture.</div>
          <div>Create.</div>
          <div>Code.</div>
        </div>

        <div className=' absolute bottom-2 z-10 mix-blend-soft-light text-xs'>scroll down</div>
      </div>




      <div className=" relative text-sm lg:text-lg mt-20">


        <div className="relative w-full flex justify-center px-4">
          <div className="w-full lg:w-3/4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ">
            <span className='flex-1 flex flex-col justify-center order-2 lg:order-1'>
              <div className='mb-2'><span className='font-bold'>Hi,</span> I'm Sam.</div>
              <div>Photographer. Videographer. Developer.</div>
              <div>Based in Slovakia.</div>
              <div>Currently studying at Slovak Technical University.</div>
            </span>

            <span className='flex flex-col items-center flex-shrink-0 order-1 lg:order-2'>
              <img src='https://res.cloudinary.com/dqktedlja/image/upload/v1750360702/yuyrtyff_Large_k2cr1a.jpg' className='h-36 rounded-full' alt='profile' />
              <div className='font-thin text-xs mt-2'>Samuel Bagin</div>
            </span>
          </div>
        </div>


        <div className='relative font-instrument italic flex justify-center items-center w-3/4 md:w-full opacity-70 text-3xl mt-24 mx-auto text-center md:text-left'>
          Capturing light. Crafting motion. Writing code.
        </div>



        <div className="relative flex justify-center items-center w-full mt-6">
          <Button to="/portfolio" size='large'>View My Work</Button>
        </div>

      </div>

      <div className='min-h-screen flex justify-center items-center'>
        fluid transition
      </div>


      <div className='w-5/6 right-1/2 mx-auto hidden lg:flex'>
        <BeholdWidget id='7eJB3FwDt4Ahpq9N9X1v' className='hidden' />
      </div>
      <div className='lg:hidden w-5/6 right-1/2 mx-auto'>
        <BeholdWidget id='U8gObnFVUObaIvrZ9kdA' className='lg:hidden' />
      </div>


      <div className='h-20'></div>


      <div className='relative lg:left-40 left-10 justify-center lg:w-1/2 w-2/3'>
        <div>I create clean visuals and digital experiences.</div>
        <div>From concept to final output — photo, video, or code.</div>
        <br></br>
        <div>Always learning. Always building.</div>
        <div>Let’s make something meaningful.</div>
      </div>

      <Footer />
    </div>
  );
}

export default App;