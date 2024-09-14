import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useQuery, gql } from '@apollo/client'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

const VIDEOS = gql`
  query GetVideos{
    videos {
      data {
        id
        attributes {
          title
          link
        }
      }
    }
  }
`;

function Video() {
  const { loading, error, data } = useQuery(VIDEOS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <body className='bg-[#111111] min-h-screen' >
        <Navbar />
        
        <div className=' relative md:top-[100px] min-h-screen'>
          {data.videos.data.map(({ id, attributes }) => (
            <div key={id} className='h-screen flex md:h-full md:relative justify-center items-center'>
              <iframe src={`${attributes.link}`} className='w-3/4 h-auto aspect-video rounded-xl mx-auto ' title='dakdawk' allowFullScreen></iframe>
            </div>
          ))}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Video