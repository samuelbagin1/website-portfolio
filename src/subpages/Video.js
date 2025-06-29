import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';

import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Video() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/video`);

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
      <div className='h-28' />

      <div className=''>
        {images?.map((image) => (
          <div key={image._id} className=' mx-auto mb-12 md:mb-20'>
            <iframe src={image.linkText} className='w-[90%] md:w-3/4 h-auto aspect-video rounded-xl mx-auto ' title='a video' allowFullScreen></iframe>
          
          </div>
        ))}
      </div>

      <div className='h-20' />

      <Footer />
    </div>
  );
}

export default Video;