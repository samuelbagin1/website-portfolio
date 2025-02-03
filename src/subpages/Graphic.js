import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useQuery, gql } from '@apollo/client'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'

const API_URL = '/api';

const GRAPHICS = gql`
  query GetGraphics{
    graphics {
      data {
        id
        attributes {
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

function Graphic() {
  const { loading, error, data } = useQuery(GRAPHICS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <body className='bg-[#111111] min-h-screen ' >
        <Navbar />

        <div className='h-[100px]'></div>
        <div className=' relative '>
          {data.graphics.data.map(({ id, attributes }) => (
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
          ))}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Graphic