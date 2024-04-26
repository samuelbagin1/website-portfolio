import Logo from './assets/sign samuelbagin-black.png'

function App() {
  return (
    <div className="bg-zinc-300 text-zinc-900 relative w-screen h-screen justify-center items-center flex">
        <div className='grid justify-items-center gap-1'>
          <div className='md:text-lg'>website under development</div>
          <img src={Logo} alt="" className='md:w-[120px] w-[90px] ' />
        </div>
    </div>
  );
}

export default App;
