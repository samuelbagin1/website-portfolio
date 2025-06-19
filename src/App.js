import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import backImage from "./assets/background.GIF";
import { Link } from "react-router-dom";

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
      <div className="fixed inset-0 bg-[#381567] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Grid
            size="60"
            speed="1.5"
            color="#3CE8FE"
          />
        </div>
      </div>
    );
  }

  // mix-blend-soft-light

  return (
    <div className="bg-[#111111] text-[#FEFEFA] relative z-10 w-full">
      <Navbar />

      <div className="relative w-full h-svh justify-center items-center flex">
        <img src={backImage} alt='background' className="absolute h-screen object-cover w-full" />
        <div className="h-screen w-full absolute bg-[#00000097] justify-center backdrop-blur-md"></div>
        <div className='font-black md:text-9xl text-6xl z-10 w-3/4 opacity-60'>
          <div>Capture.</div>
          <div>Create.</div>
          <div>Code.</div>
        </div>
        
        <div className=' absolute bottom-2 z-10 mix-blend-soft-light '>scroll down</div>
      </div>

      <div className="lg:w-1/2 w-2/3 relative min-h-screen text-sm lg:text-lg">
        <div className="relative lg:left-40 left-10 top-20 justify-center w-full">
          <div className="left-5 lg:top-5 top-2 relative">Student at Slovak Technical University, crafting visual stories & functional design.
            Obsessed with turning ideas into pixels and motion.</div>

          <div className=' text-6xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block h-full text-transparent bg-clip-text p-2 '>Photography</div>
          <p>Frames that feel.</p>
          <div>Videography</div>
          <p>Motion with meaning.</p>
          <div>Development</div>
          <p>Clean code, clearer purpose.</p>


          <Link to='/portfolio' className=" font-black text-sm border border-solid border-[#fefefa7e] opacity-75 hover:opacity-100 hover:border-[#fefefabc] rounded-lg w-24 h-8 relative flex items-center justify-center mx-auto md:mx-5 top-5 md:top-0 ease-in duration-150 ">Portfolio</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;