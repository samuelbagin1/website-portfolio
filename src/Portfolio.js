import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import GradientText from './components/GradientText'
import Seo, { createWebPageSchema } from './components/Seo'

const PORTFOLIO_DESCRIPTION = "Explore AI, data engineering, web development, photography, video, and graphic design work by Samuel Bagin.";

function Portfolio() {
  const portfolioSchema = React.useMemo(
    () => createWebPageSchema({
      path: "/portfolio",
      name: "Samuel Bagin Portfolio",
      description: PORTFOLIO_DESCRIPTION,
      type: "CollectionPage",
    }),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Seo
        title="Portfolio | Samuel Bagin"
        description={PORTFOLIO_DESCRIPTION}
        path="/portfolio"
        schema={portfolioSchema}
      />
      <Navbar />
      <main className='min-h-svh w-full justify-center items-center flex bg-[#000000] px-4 pb-12 pt-28'>
        <div className='w-3/4'>
          <header className="mb-8 max-w-2xl text-[#FEFEFA]">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Portfolio</h1>
            <p className="mt-3 text-sm font-normal leading-6 text-zinc-400 md:text-base">
              Selected AI, data, web development, photography, video, and graphic design work.
            </p>
          </header>
          <nav aria-label="Portfolio categories" className='grid min-h-[55vh] items-center font-bold text-6xl md:text-9xl'>
          <Link to='/portfolio/photo' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1 '><GradientText className='from-[#36FFC3] to-[#070722]'>Photo</GradientText></Link>
          <Link to='/portfolio/video' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText className='from-[#13CDD8] to-[#101D51]'>Video</GradientText></Link>
          <Link to='/portfolio/graphic' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText className='from-[#FF2941] to-[#191051]'>Graphic</GradientText></Link>
          <Link to='/portfolio/develop' className='ease-in duration-150 hover:opacity-70 hover:translate-x-1'><GradientText className='from-[#C64BFF] to-[#00008B]'>Develop</GradientText></Link>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Portfolio
