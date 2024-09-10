import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useQuery, gql } from '@apollo/client'
import { Blur } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

const IMAGES = gql`
  query GetImages {
    images {
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

function Photo() {
  const { loading, error, data } = useQuery(IMAGES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <body className='bg-[#111111] h-full -my-10' >
        <Navbar />

        {data.images.data.map(({ id, attributes }) => (
          <div key={id}>
            <AsyncImage
              alt={id}
              src={`${API_URL}${attributes.photo.data.attributes.url}`}
              style={{ height: "auto", aspectRatio: 1/1 }}
              loader={<div style={{ background: '#888' }}/>}
              error={<div style={{ background: '#eee' }}/>}
              Transition={props => <Blur radius={10} {...props}/>}
              className='w-3/4 rounded-xl mx-auto my-10'
            />
          </div>
        ))}

        <Footer />
      </body>
    </>
  );
}

export default Photo