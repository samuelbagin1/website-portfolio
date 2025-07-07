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

function Photo() {
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
    // Ensure the component is not loading and images are present
    if (!isLoading && images.length > 0) {
      // Use a matchMedia to handle GSAP logic, ensuring it runs after DOM is ready
      const ctx = gsap.context(() => {
        // Create ScrollSmoother
        scrollSmootherRef.current = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: 2,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        // Create advanced parallax effects for each image section
        imageRefs.current.forEach((section, i) => {
          if (section && section.parentElement) {
            const container = section.parentElement;

            // The ratio determines how much the image "sticks" or "slides".
            // We base it on the container's height for a responsive effect
            // that works on both mobile (h-96) and desktop (h-screen).
            const getRatio = (el) => container.offsetHeight / (container.offsetHeight + el.offsetHeight);
            const ratio = getRatio(section);

            // The animation moves the section vertically.
            // The values are calculated to prevent gaps on any screen size
            // by using the container's height as the basis for movement.
            gsap.fromTo(section, {
              y: () => i ? -container.offsetHeight * ratio : 0,
              scale: () => window.innerWidth<768 ? 1.5 : 1
            }, {
              y: container.offsetHeight * (1 - ratio),
              scale: () => window.innerWidth<768 ? 1.5 : 1,
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
      }, smoothWrapperRef); // scope the context to the main wrapper

      return () => ctx.revert(); // cleanup GSAP animations and ScrollSmoother
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


          {/* Image Grid */}
          <div className='relative'>
            {images?.map((image, index) => (
              <div
                key={image._id}
                className='relative cursor-pointer overflow-hidden'
                // h-96 md:h-screen flex items-center justify-center cursor-pointer overflow-hidden
                onClick={() => {
                  setSelectedImage(image);
                }}
              >
                <div
                  ref={(el) => addToRefs(el, index)}
                  className='w-full h-full overflow-hidden'
                >
                  <AsyncImage
                    src={image.image}
                    style={{ height: 'auto', aspectRatio: 16 / 9 }}
                    loader={<div className="bg-[#959595] aspect-video" />}
                    error={<div className="bg-red-500 aspect-video" />}
                    Transition={(props) => <Blur radius={10} {...props} />}
                    className='w-full h-[150%] object-cover aspect-video'
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

export default Photo;