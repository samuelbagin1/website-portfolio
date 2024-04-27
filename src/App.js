import Logo from './assets/sign samuelbagin-white.png'
import backImage from './assets/umbra-11.jpeg'

function App() {
  return (
    <div className="bg-[#FEFEFA] text-[#FEFEFA] relative w-screen h-dvh justify-center items-center flex">
        <img src={backImage} className='absolute h-screen object-cover z-0 w-full' />
        <div className='grid justify-items-center gap-1 z-10'>
          <div className='md:text-lg text-sm'>website under development</div>
        </div>
        <img src={Logo} alt="" className='md:w-[120px] w-[60px] absolute bottom-3 z-10 opacity-80' />
    </div>
  );
}

export default App;

