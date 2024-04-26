import Logo from './assets/sign samuelbagin-black.png'

function App() {
  return (
    <div className="bg-[#FEFEFA] text-zinc-900 relative w-screen h-dvh justify-center items-center flex">
        <div className='grid justify-items-center gap-1'>
          <div className='md:text-lg'>website under development</div>
        </div>
        <img src={Logo} alt="" className='md:w-[120px] w-[90px] absolute bottom-3' />
    </div>
  );
}

export default App;
