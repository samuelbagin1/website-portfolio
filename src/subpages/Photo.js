import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useQuery, gql } from '@apollo/client'

const api = "http://localhost:1337"

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

/* const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`; */




function Photo() {
  const { loading, error, data } = useQuery(IMAGES)



  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
    <Navbar />
      {data.images.data.map(({ id, attributes }) => (
        <div key={id}>
          <img alt={id} src={api + attributes.photo.data.attributes.url} />
          <p>{attributes.text}</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

/* function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
} */

export default Photo