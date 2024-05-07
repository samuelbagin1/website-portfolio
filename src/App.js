import Logo from './assets/sign samuelbagin-white.png'
import backImage from './assets/umbra-11.jpeg'

function App() {
  return (
    <div className="bg-[#000000] text-[#FEFEFA]">
      <img src={backImage} alt="at the backk" className='absolute h-dvh w-dvw object-cover z-0' />
        <div className='justify-center items-center flex h-dvh w-dvw relative' >
          <div className='md:text-lg text-sm relative'>website under development</div>
          <img src={Logo} alt="aaa" className='md:w-[100px] w-[60px] absolute bottom-3 opacity-80' />
        </div>
    </div>
  );
}

export default App;

