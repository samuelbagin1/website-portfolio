import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';

const API_URL = '/api';

function Photo() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch images
  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/images`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <body className='bg-[#111111] min-h-screen'>
        <Navbar />

        <div className='h-[100px]'></div>

        <div className='relative'>
          {images.map((image) => (
            <div key={image._id}>
              <AsyncImage
                alt={image.text}
                src={image.photo}
                style={{ height: 'auto', aspectRatio: 1 / 1 }}
                loader={<div style={{ background: '#888' }} />}
                error={<div style={{ background: '#eee' }} />}
                Transition={(props) => <Blur radius={10} {...props} />}
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

export default Photo;