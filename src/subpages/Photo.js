import React from 'react'
import { useQuery, gql } from '@apollo/client'



const IMAGES = gql`
  query GetImages {
    images {
      text,
      photo
    }
  }
`

function Photo() {
  const { loading, error, data } = useQuery(IMAGES)
  console.log(data)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    
      <div>
        {data.images.map(image => (
          <div key={image.id} className=' w-full h-full' >
            <img src={image.photo} />
            {image.title}
          </div>
        ))}
      </div>
  )
}

export default Photo