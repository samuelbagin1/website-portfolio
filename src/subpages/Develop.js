import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';
import { FaArrowRightLong } from "react-icons/fa6";

import Button from '../components/Button';

import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Develop() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // This state seems unused in Develop.js

  // Refs for GSAP
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  const scrollSmootherRef = useRef(null);

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

  // Initialize GSAP ScrollSmoother
  useEffect(() => {
    if (!isLoading && images.length > 0) {
      const ctx = gsap.context(() => {
        scrollSmootherRef.current = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: 2,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });
      }, smoothWrapperRef);

      return () => ctx.revert();
    }
  }, [isLoading, images]);

  // Cleanup GSAP on unmount
  useEffect(() => {
    return () => {
      if (scrollSmootherRef.current) {
        scrollSmootherRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
      <Navbar />

      <div id="smooth-wrapper" ref={smoothWrapperRef} className='bg-[#111111]'>
        <div id="smooth-content" ref={smoothContentRef}>
          <div className='h-20'></div>

          <div className='md:w-3/4 mx-auto min-h-screen px-4 py-8 text-[#FEFEFA]'>
            {images?.map((image, index) => (
              <div className='mb-20 last:mb-0' key={image._id}>

                <div className='w-full relative rounded-xl overflow-hidden border-solid border-[#353535] border'>

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
                  <div className=' p-6'>
                    {/* Title */}
                    <h2 className='text-2xl font-bold text-[#FEFEFA] mb-3'>{image.title}</h2>

                    {/* Description */}
                    <p className='text-[#FEFEFA] text-base leading-relaxed mb-6'>{image.text}</p>

                    {/* Button */}
                    <div className='w-full flex justify-center items-center'>
                      <Button href={image.linkText} size='large' className=' mt-5'>
                        view project <FaArrowRightLong className='inline ml-2' />
                      </Button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Develop;