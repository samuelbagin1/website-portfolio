import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';
import { FaArrowRightLong } from "react-icons/fa6";

import Button from '../components/Button';

import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Develop() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/develop`);

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
    <>
      <body className='bg-[#111111]' >
        <Navbar />

        <div className='h-5'></div>

        {/* Mobile/Small screen layout */}
        <div className='md:hidden min-h-screen px-4 py-8'>
          <div className='h-10'></div>
          {images?.map((image, index) => (
            <div className='mb-12 last:mb-0' key={image._id}>
              
              <div className='w-full relative rounded-xl overflow-hidden drop-shadow-[0_20px_20px_rgba(255,255,255,0.1)]'>
                
                {/* Main Image */}
                <div className='w-full h-64 relative'>
                  <AsyncImage
                    alt={image.title}
                    src={image.image}
                    style={{ 
                      height: '100%', 
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    loader={<div className="bg-[#959595] w-full h-full" />}
                    error={<div className="bg-red-500 w-full h-full" />}
                  />
                  
                  {/* Gradient overlay at bottom for better text readability */}
                  <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent'></div>
                </div>

                {/* Content Section */}
                <div className='bg-white/90 backdrop-blur-sm p-6'>
                  {/* Title */}
                  <h2 className='text-2xl font-bold text-[#111111] mb-3'>{image.title}</h2>
                  
                  {/* Description */}
                  <p className='text-[#111111] text-base leading-relaxed mb-6'>{image.text}</p>
                  
                  {/* Button */}
                  <div className='w-full flex justify-center'>
                    <Button href={image.linkText} size='large' className='border-[#1111119f] hover:border-[#111111] mt-5'>
                      view project <FaArrowRightLong className='inline ml-2' />
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Medium+ screen layout (existing) */}
        <div className='hidden md:block min-h-screen'>
          {images?.map((image) => (
            <div className='h-screen w-full flex justify-center items-center' key={image._id}>
              
              <div className='w-3/4 h-3/4 relative rounded-xl overflow-hidden flex drop-shadow-[0_35px_35px_rgba(255,255,255,0.2)] '>
                
                {/* Background Image - Blurred and Lightened */}
                <div 
                  className='absolute inset-0 w-full h-full bg-cover bg-center filter blur-xl brightness-130 opacity-60'
                  style={{
                    backgroundImage: `url(${image.image})`,
                  }}
                ></div>
                
                {/* Content Overlay */}
                <div className='absolute inset-0 bg-[#ffffff7f] bg-opacity-80'></div>
                
                {/* Left side - Content */}
                <div className='w-1/2 p-10 flex flex-col justify-between relative z-10'>
                  <div>
                    {/* Title at top, bold */}
                    <p className='text-3xl font-bold text-[#111111]'>{image.title}</p>
                    
                    {/* Text with margin top 5 */}
                    <p className='mt-5 text-[#111111] text-lg'>{image.text}</p>
                  </div>
                  
                  {/* Button at bottom left */}
                  <div className='w-full flex justify-center items-center'>
                    <Button href={image.linkText} size='large' className='border-[#1111119f] hover:border-[#111111]'>
                      view project <FaArrowRightLong className='inline ml-2' />
                    </Button>
                  </div>
                </div>

                {/* Right side - Image (overlapping, 20% bigger) */}
                <div className='absolute right-0 top-0 w-[50%] h-[120%] -translate-y-[10%] translate-x-[10%]'>
                  <AsyncImage
                    alt={image.title}
                    src={image.image}
                    style={{ 
                      height: '100%', 
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                    loader={<div className="bg-[#959595] rounded-xl w-full h-full" />}
                    error={<div className="bg-red-500 rounded-xl w-full h-full" />}
                  />
                </div>

              </div>

            </div>
          ))}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Develop;