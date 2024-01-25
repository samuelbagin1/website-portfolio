import React from 'react'
import useFetch from '../hooks/useFetch'

export default function Photo() {
  const { loading, error, data } = useFetch('http://localhost:1337/images')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
        {data.map(image => (
            <div key={image.photo}></div>
        ))}
    </div>
  )
}
