import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'


function Develop() {

  return (
    <>
      <body className='bg-[#111111]' >
        <Navbar />

        <div className='h-[100px] lg:h-[120px]'></div>


        {/* at medium screen */}

        {/*
        <div className=' hidden md:table-row min-h-screen '>
          {data.develops.data.map(({ id, attributes }) => (
            <div className='h-svh '>
              <div key={id} className='w-3/4 h-3/4 mx-auto bg-[#e0e2e4] rounded-xl grid grid-cols-2'>
                <span className=' pt-32 pl-20 relative '>
                  <div className=' font-boldd text-4xl '>{attributes.title}</div>
                  <div className=' mt-12 '>{attributes.text}</div>
                  <div className='absolute bottom-40 ml-4 '>
                    <a href={attributes.link} className=' font-black w-full group relative'>
                      see the project
                      <div className='absolute -bottom-1 left-0 w-0 transition-all h-px rounded-lg bg-[#111111] group-hover:w-full'></div>
                    </a>
                  </div>
                </span>
                <span className='justify-center items-center flex translate-x-12 lg:translate-x-24 '>
                  <AsyncImage
                    alt={id}
                    src={`${attributes.photo.data.attributes.url}`}   //${API_URL} pre local dev
                    style={{ aspectRatio: 3 / 4 }}
                    loader={<div style={{ background: '#888' }} />}
                    error={<div style={{ background: '#eee' }} />}
                    Transition={props => <Blur radius={10} {...props} />}
                    className=' rounded-xl h-[90%] lg:h-[110%]'
                  />
                </span>
              </div>
            </div>
          ))}
        </div>

          */}




        {/* small screens */}
        {/*
        <div className=' md:hidden min-h-screen '>
          {data.develops.data.map(({ id, attributes }) => (
            <div className='h-svh '>
              <div key={id} className='w-[90%] h-[80%] mx-auto bg-[#e0e2e4] rounded-xl relative '>
                  
                  <div className='bg-inherit top-0 absolute w-full h-full -translate-x-20 '></div>

                  <div className=' font-boldd text-xl p-4 relative top-4 '>{attributes.title}</div>
                  <div className=' text-xs p-4 relative '>{attributes.text}</div>
                  
                  <AsyncImage
                    alt={id}
                    src={`${attributes.photo.data.attributes.url}`}   //${API_URL} pre local dev
                    style={{ aspectRatio: 4/5 }}
                    loader={<div style={{ background: '#888' }} />}
                    error={<div style={{ background: '#eee' }} />}
                    Transition={props => <Blur radius={10} {...props} />}
                    className=' rounded-xl w-auto h-[60%] translate-x-16 absolute'
                  />

                <div className='absolute bottom-5 w-full'>
                  <div className='flex justify-center items-center'><a href={attributes.link} className=' flex justify-center items-center border bg-[#7400F9] text-[#43EEB6] border-solid rounded-full h-9 w-36 text-sm font-black '>see the project</a></div>
                </div>


              </div>
            </div>
          ))}
        </div>
          */}
        

        <Footer />
      </body>
    </>
  );
}

export default Develop