import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import backImage from "./assets/background.GIF";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";

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
      <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] text-[#FEFEFA] relative z-10 w-full">
      <Navbar />

      <div className="relative w-full h-svh justify-center items-center flex">
        <img src={backImage} alt='background' className="absolute h-screen object-cover w-full" />
        <div className="h-screen w-full absolute bg-[#00000097] justify-center backdrop-blur-md"></div>
        <div className="opacity-80">
          <div className='font-black lg:text-[230px] md:text-[180px] text-6xl '>Welcome</div>
          <div className="flex justify-center text-xs lg:text-sm">to portfolio of Samuel Bagín</div>
        </div>
      </div>

      <div className="lg:w-1/2 w-2/3 relative min-h-screen text-sm lg:text-lg">
        <div className="relative lg:left-40 left-10 top-20 justify-center w-full">
          <div className="text-3xl lg:text-9xl ">Greetings,</div>
          <div className="left-5 lg:top-5 top-2 relative">from Sam. I am a young, passionate flame of ideas. I create visual arts such as designs, photos and short videos. Moreover I develop websites and algorithms, where I can put art of code and color together.</div>

          <div className="left-5 relative top-10">You might never heard of me, but when it comes to good-quality worth work, I am the <span className="font-bold">one</span> you need to find.</div>

          <div className="left-5 relative top-20 md:flex items-center w-full">I am not going to waste your time. Here is my portfolio you might to look at<Link to='/portfolio' className=" font-black text-sm border border-solid border-[#fefefa7e] opacity-75 hover:opacity-100 hover:border-[#fefefabc] rounded-lg w-24 h-8 relative flex items-center justify-center mx-auto md:mx-5 top-5 md:top-0 ease-in duration-150 ">Portfolio</Link></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;