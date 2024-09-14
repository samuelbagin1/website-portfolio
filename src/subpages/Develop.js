import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useQuery, gql } from '@apollo/client'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

const DEVELOPS = gql`
query GetDevelops{
  develops {
    data {
      id
      attributes {
        title
        link
        text
        photo {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;

function Develop() {
  const { loading, error, data } = useQuery(DEVELOPS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <body className='bg-[#111111]' >
        <Navbar />

        <div className='h-[100px]'></div>

        {/* at medium screen */}
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
                <span className='justify-center items-center flex translate-x-12 '>
                  <AsyncImage
                    alt={id}
                    src={`${API_URL}${attributes.photo.data.attributes.url}`}   //${API_URL} pre local dev
                    style={{ height: "90%", aspectRatio: 3 / 4 }}
                    loader={<div style={{ background: '#888' }} />}
                    error={<div style={{ background: '#eee' }} />}
                    Transition={props => <Blur radius={10} {...props} />}
                    className=' rounded-xl '
                  />
                </span>
              </div>
            </div>
          ))}
        </div>





        {/* small screens */}
        <div className=' md:hidden min-h-screen '>
          {data.develops.data.map(({ id, attributes }) => (
            <div className='h-svh '>
              <div key={id} className='w-3/4 h-[80%] mx-auto bg-[#e0e2e4] rounded-xl relative '>
                  <div className=' font-boldd text-xl p-4 '>{attributes.title}</div>
                  <div className=' text-sm p-4 '>{attributes.text}</div>
                  
                  <AsyncImage
                    alt={id}
                    src={`${API_URL}${attributes.photo.data.attributes.url}`}   //${API_URL} pre local dev
                    style={{ height: "60%", aspectRatio: 3 / 4 }}
                    loader={<div style={{ background: '#888' }} />}
                    error={<div style={{ background: '#eee' }} />}
                    Transition={props => <Blur radius={10} {...props} />}
                    className=' mx-auto rounded-xl w-full '
                  />

                <div className='absolute bottom-5 w-full'>
                  <div className='flex justify-center items-center'><button href={attributes.link} className=' border border-[#111111] border-solid rounded-full h-8 w-36 text-sm '>see the project</button></div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Develop