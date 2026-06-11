import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo, { createWebPageSchema } from '../components/Seo';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';



import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Video() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  // Refs for GSAP
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  const scrollSmootherRef = useRef(null);
  const description = "Selected video, motion, and editing work by Samuel Bagin.";
  const pageSchema = React.useMemo(
    () => createWebPageSchema({
      path: "/portfolio/video",
      name: "Video Portfolio | Samuel Bagin",
      description,
      type: "CollectionPage",
    }),
    [description]
  );
  const seo = (
    <Seo
      title="Video Portfolio | Samuel Bagin"
      description={description}
      path="/portfolio/video"
      schema={pageSchema}
    />
  );

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
      <>
        {seo}
        <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Grid
              size="60"
              speed="1.5"
              color="#69eae4"
            />
          </div>
        </div>
      </>
    );
  }

  if (error) return (
    <>
      {seo}
      <div className='bg-[#111111] min-h-screen text-red-500 text-center p-8'>
        {error}
      </div>
    </>
  );

  return (
    <>
      {seo}
      <Navbar />


      <div id="smooth-wrapper" ref={smoothWrapperRef} className='bg-[#111111]'>
        <div id="smooth-content" ref={smoothContentRef} className='bg-[#111111]'>
          <header className="mx-auto max-w-6xl px-4 pb-12 pt-32 text-[#FEFEFA] md:px-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">Video and motion</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Selected video production, editing, and motion work by Samuel Bagin.
            </p>
          </header>

          <div className=''>
            {images?.map((image) => (
              <div key={image._id} className=' mx-auto mb-12 md:mb-20'>
                <iframe src={image.linkText} className='w-[90%] md:w-3/4 h-auto aspect-video rounded-xl mx-auto ' title={image.text || "Video project by Samuel Bagin"} loading="lazy" allowFullScreen></iframe>

              </div>
            ))}
          </div>

          <div className='h-20' />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Video;
