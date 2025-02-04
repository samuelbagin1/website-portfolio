import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'

function Video() {

  return (
    <>
      <body className='bg-[#111111] min-h-screen' >
        <Navbar />
        
        <div className=' relative md:top-[100px] min-h-screen'>
            {/*n
            <div key={id} className='h-screen flex md:h-full md:relative justify-center items-center'>
              <iframe src={`${attributes.link}`} className='w-3/4 h-auto aspect-video rounded-xl mx-auto ' title='dakdawk' allowFullScreen></iframe>
            </div>
          */}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Video