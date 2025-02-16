import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Photo() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [nav, setNav] = useState(true);
  const handleClick = () => setNav(!nav);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/images`);
        
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
    <div className='bg-[#111111]'>
      <Navbar />
      <div className='h-[100px]' />

      <div className='relative min-h-lvh'>
        {images.map((image) => (
          <div key={image._id} className='my-10' onClick={handleClick}>
            <AsyncImage
              alt={image.text}
              src={image.photo}
              style={{ height: 'auto', aspectRatio: 1 / 1 }}
              loader={<div className="bg-[#959595] rounded-xl" />}
              error={<div className="bg-red-500 rounded-xl" />}
              Transition={(props) => <Blur radius={10} {...props} />}
              className='w-3/4 rounded-xl mx-auto aspect-square'
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Photo;