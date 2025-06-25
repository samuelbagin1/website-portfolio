import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';

import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Graphic() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/graphic`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'HTTP error');
        }

        const data = await response.json();
        setImages(data);
        setIsLoading(false);
      } catch (error) {
        setError(`Failed to load images: ${error.message}`);
        setIsLoading(false);
        console.error('Fetch error:', error);
      }
    };

    fetchImages();

    // Fallback in case loading takes too long
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 seconds for API calls

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Grid
            size="60"
            speed="1.5"
            color="#69eae4"
          />
        </div>
      </div>
    );
  }

  if (error) return (
    <div className='bg-[#111111] min-h-screen text-red-500 text-center p-8'>
      {error}
    </div>
  );

  return (
    <div className='bg-[#111111]'>
      <Navbar />
      <div className='h-[100px]' />

      {/* Image Grid */}
      <div className='relative min-h-lvh'>
        {images?.map((image) => (
          <div
            key={image._id}
            className='my-10 cursor-pointer'
            onClick={() => {
              setSelectedImage(image);
            }}
          >
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 max-w-5/6 '
          onClick={() => setSelectedImage(null)}
        >
          <img
            alt={selectedImage.text}
            src={selectedImage.photo}
            className=' w-auto h-full max-h-[90vh] object-contain rounded-xl'
          />
          <div className='absolute bottom-4 text-[#2f2f2f] text-xs'>click anywhere to close</div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Graphic;