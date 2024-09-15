import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import backImage from "./assets/backgroundImage.png";
import { Link } from "react-router-dom"



function App() {
  return (
    <div className="bg-[#111111] text-[#FEFEFA] relative z-10 w-full">
      <Navbar />

      <div className="relative w-full h-svh justify-center items-center flex">
        <img src={backImage} alt='imagee' className="absolute h-screen object-cover z-0 w-full" />
        <div className="h-screen w-full absolute bg-[#111111] opacity-80 justify-center"></div>
        <div className="opacity-80">
          <div className='font-black lg:text-[230px] md:text-[180px] text-6xl '>Welcome</div>
          <div className="flex justify-center text-xs lg:text-sm">to portfolio of Samuel Bagín</div>
        </div>
      </div>

      <div className="lg:w-1/2 w-2/3 relative min-h-screen text-sm lg:text-lg">
        <div className="relative lg:left-40 left-10 top-20 justify-center ">
          <div className="text-3xl lg:text-9xl ">Greetings,</div>
          <div className="left-5 lg:top-5 top-2 relative">from Sam. I am a young, passionate flame of ideas. I create visual arts such as designs, photos and short videos.
            Morover I develop websites and algorithms, where I can put art of code and color together.
          </div>

          <div className="left-5 relative top-10">You might never heard of me, but when it comes to good-quality worth work, I am the <span className="font-boldd">one</span> you need to find.</div>

          <div className="left-5 relative top-20">I am not going to waste your time. Here`s my portfolio you might to look at: <Link to='/portfolio' className=" font-black border border-solid border-[#FEFEFA] rounded-full w-24 h-10 ">Portfolio</Link></div>
        </div>
      </div>

      <Footer />
    </div>

  );
}

export default App;
