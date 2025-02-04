import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'


function Graphic() {
  return (
    <>
      <body className='bg-[#111111] min-h-screen ' >
        <Navbar />

        <div className='h-[100px]'></div>
        <div className=' relative '>
          {/*
            <div key={id}>
              <AsyncImage
                alt={id}
                src={`${attributes.photo.data.attributes.url}`}   //${API_URL} pre local dev
                style={{ height: "auto", aspectRatio: 1 / 1 }}
                loader={<div style={{ background: '#888' }} />}
                error={<div style={{ background: '#eee' }} />}
                Transition={props => <Blur radius={10} {...props} />}
                className='w-3/4 rounded-xl mx-auto my-10'
              />
            </div>
            */}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Graphic