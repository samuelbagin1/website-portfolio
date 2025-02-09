import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';

function Photo() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/images');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'HTTP error');
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError(`Failed to load images: ${error.message}`);
        console.error('Fetch error:', error);
      }
    };

    fetchImages();
  }, []);

  if (error) return (
    <div className='bg-[#111111] min-h-screen text-red-500 text-center p-8'>
      {error}
    </div>
  );

  return (
    <div className='bg-[#111111] min-h-screen'>
      <Navbar />
      <div className='h-[100px]' />

      <div className='relative'>
        {images.map((image) => (
          <div key={image._id} className='my-10'>
            <AsyncImage
              alt={image.text}
              src={image.photo}
              style={{ height: 'auto', aspectRatio: 1 / 1 }}
              loader={<div className="bg-gray-800 animate-pulse rounded-xl" />}
              error={<div className="bg-red-900 rounded-xl" />}
              Transition={(props) => <Blur radius={10} {...props} />}
              className='w-3/4 rounded-xl mx-auto'
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Photo;