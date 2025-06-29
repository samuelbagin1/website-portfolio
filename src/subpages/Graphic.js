import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';
import { Grid } from 'ldrs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import 'ldrs/react/Grid.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Graphic() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Refs for GSAP
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  const imageRefs = useRef([]);
  const scrollSmootherRef = useRef(null);

  // Add images to refs array
  const addToRefs = (el, index) => {
    if (el && !imageRefs.current[index]) {
      imageRefs.current[index] = el;
    }
  };

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
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  // Initialize GSAP ScrollSmoother and parallax effects
  useEffect(() => {
    if (!isLoading && images.length > 0) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        // Create ScrollSmoother
        scrollSmootherRef.current = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: 2, // Smoothness level (higher = smoother but less responsive)
          effects: true, // Enable data-speed effects
          normalizeScroll: true, // Normalize scroll across devices
          ignoreMobileResize: true,
        });

        // Ratio calculation function like in the reference
        const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

        // Create advanced parallax effects for each image section
        imageRefs.current.forEach((section, i) => {
          if (section) {
            // Apply parallax effect to the image container
            gsap.fromTo(section, {
              y: () => i ? -window.innerHeight * getRatio(section) : 0
            }, {
              y: () => window.innerHeight * (1 - getRatio(section)),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: () => i ? "top bottom" : "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
              }
            });
          }
        });

        // Refresh ScrollTrigger to recalculate positions
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
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
      {/* Image Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4'
          onClick={() => setSelectedImage(null)}
        >
          <img
            alt={selectedImage.text}
            src={selectedImage.image}
            className=' h-auto max-h-[90vh] max-w-[90vw] rounded-xl'
          />
          <div className='absolute bottom-4 text-[#2f2f2f] text-xs'>
            click anywhere to close
          </div>
        </div>
      )}


      <div id="smooth-wrapper" ref={smoothWrapperRef} className='bg-[#111111]'>
        <div id="smooth-content" ref={smoothContentRef}>

          <div className='h-[100px]' />

          {/* Image Grid */}
          <div className='relative'>
            {images?.map((image, index) => (
              <div
                key={image._id}
                className='relative h-screen flex items-center justify-center cursor-pointer overflow-hidden'
                onClick={() => {
                  setSelectedImage(image);
                }}
              >
                <div
                  ref={(el) => addToRefs(el, index)}
                  className='w-full'
                >
                  <AsyncImage
                    alt={image.text}
                    src={image.image}
                    style={{ height: 'auto', aspectRatio: 1 / 1 }}
                    loader={<div className="bg-[#959595] rounded-xl aspect-square" />}
                    error={<div className="bg-red-500 rounded-xl aspect-square" />}
                    Transition={(props) => <Blur radius={10} {...props} />}
                    className='w-full rounded-xl aspect-square object-cover'
                  />
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

export default Graphic;