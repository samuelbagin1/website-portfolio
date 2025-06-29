import { useState, useEffect, useRef } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import backImage from "./assets/background.GIF";
import Button from "./components/Button";
import BeholdWidget from './components/BeholdWidget';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';


import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Refs for animation targets
  const heroTextRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const profileImageRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonRef = useRef(null);
  const videosRef = useRef(null);
  const widgetRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Track screen size for responsive transition effect
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Initialize GSAP ScrollSmoother
    let smoother;

    if (!isLoading) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,               // Smooth factor (higher = more smooth)
        effects: true,             // Enable data-speed effects
        smoothTouch: 0.1,          // Smooth factor for touch devices
        normalizeScroll: true,     // Normalize scroll behavior
        ignoreMobileResize: true,  // Prevent issues with mobile viewport changes
      });
    }

    // Cleanup
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = backImage;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };

    // Fallback in case loading takes too long
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Small delay to ensure ScrollSmoother is initialized
    const timer = setTimeout(() => {
      // Set up GSAP animations
      const ctx = gsap.context(() => {



        // Hero text animation - stagger the three lines
        gsap.fromTo(
          heroTextRef.current?.children,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.7, // 0.5 + 0.2
          }
        );

        // About section animation
        gsap.fromTo(
          aboutSectionRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Profile image animation
        gsap.fromTo(
          profileImageRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: profileImageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Tagline animation
        gsap.fromTo(
          taglineRef.current,
          {
            opacity: 0,
            x: -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: taglineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Button animation
        gsap.fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Videos animation - stagger both videos
        gsap.fromTo(
          videosRef.current?.children,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: videosRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );



        // Widget animation
        gsap.fromTo(
          widgetRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: widgetRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // CTA section animation
        gsap.fromTo(
          ctaSectionRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.2, // Added 0.2s delay
            scrollTrigger: {
              trigger: widgetRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

      });

      // Cleanup
      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100); // Small delay for ScrollSmoother initialization

    return () => clearTimeout(timer);
  }, [isLoading, isSmallScreen]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#000000] flex items-center justify-center">
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

  return (
    <>
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content" className="bg-[#111111] text-[#FEFEFA] relative z-10 w-full">

          <div className="relative w-full h-lvh justify-center items-center flex">
            <img src={backImage} alt='background' className="absolute h-screen object-cover w-full " />

            <div className="h-screen w-full absolute bg-[#00000097] justify-center backdrop-blur-md"></div>
            <div ref={heroTextRef} className='font-black md:text-9xl text-6xl z-10 w-3/4 opacity-60'>
              <div>Capture.</div>
              <div>Create.</div>
              <div>Code.</div>
            </div>

            <div className='absolute bottom-2 z-10 mix-blend-soft-light text-xs'>scroll down</div>
          </div>

          <div className="relative text-sm lg:text-lg mt-20">
            <div ref={aboutSectionRef} className="relative w-full flex justify-center px-4">
              <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <span className='flex-1 flex flex-col justify-center order-2 lg:order-1'>
                  <div className='mb-2 font-bold'>Hi, I'm Sam.</div>
                  <div>Photographer. Videographer. Developer.</div>
                  <div>Based in Slovakia.</div>
                  <div>Currently studying at Slovak Technical University.</div>
                </span>

                <span ref={profileImageRef} className='flex flex-col items-center flex-shrink-0 order-1 lg:order-2'>
                  <img src='https://res.cloudinary.com/dqktedlja/image/upload/v1750360702/yuyrtyff_Large_k2cr1a.jpg' className='h-36 rounded-full' alt='profile' />
                  <div className='font-thin text-xs mt-2'>Samuel Bagin</div>
                </span>
              </div>
            </div>

            <div ref={taglineRef} className='relative font-instrument italic flex justify-center items-center w-3/4 md:w-full opacity-70 text-3xl mt-24 mx-auto text-center md:text-left'>
              Capturing light. Crafting motion. Writing code.
            </div>

            <div ref={buttonRef} className="relative flex justify-center items-center w-full mt-6">
              <Button to="/portfolio" size='large'>View My Work</Button>
            </div>
          </div>

          <div ref={videosRef} className='md:flex justify-center items-center w-[90%] md:w-3/4 mx-auto mt-40 gap-4'>
            <Link to="/portfolio/video" className='w-1/2 h-full'>
              <video
                autoPlay loop muted playsInline data-wf-ignore="true" data-object-fit="cover"
                className='rounded-xl w-full h-full object-cover mb-10 md:mb-0'
              >
                <source
                  src="https://res.cloudinary.com/dqktedlja/video/upload/v1751067722/jdhgdjkg_stdrr0.mp4"
                  type="video/mp4"
                  data-wf-ignore="true"
                />
                <source
                  src="https://res.cloudinary.com/dqktedlja/video/upload/v1751066979/jdhgdjkg_hh7vco.webm"
                  type="video/webm"
                  data-wf-ignore="true"
                />
                Your browser does not support the video tag.
              </video>
            </Link>

            <Link to="/portfolio/develop" className='w-1/2 h-full'>
              <video
                autoPlay loop muted playsInline data-wf-ignore="true" data-object-fit="cover"
                className='rounded-xl w-full h-full object-cover'
              >
                <source
                  src="https://res.cloudinary.com/dqktedlja/video/upload/v1751068211/schoolmap_1_oeapc4.mp4"
                  type="video/mp4"
                  data-wf-ignore="true"
                />
                <source
                  src="https://res.cloudinary.com/dqktedlja/video/upload/v1751068141/schoolmap_avep8s.webm"
                  type="video/webm"
                  data-wf-ignore="true"
                />
                Your browser does not support the video tag.
              </video>
            </Link>
          </div>

          <div className='h-40' />

          <div ref={widgetRef}>
            <div className='w-5/6 right-1/2 mx-auto hidden lg:flex'>
              <BeholdWidget id='7eJB3FwDt4Ahpq9N9X1v' className='hidden' />
            </div>
            <div className='lg:hidden w-5/6 right-1/2 mx-auto'>
              <BeholdWidget id='U8gObnFVUObaIvrZ9kdA' className='lg:hidden' />
            </div>
          </div>

          <div className='h-20'></div>

          <div ref={ctaSectionRef} className='w-3/4 left-10 lg:left-1/4 relative bg-gradient-to-r from-[#1a1919] to-[#111111] p-10 rounded-xl md:flex'>
            <span className='text-sm'>
              <div>I create clean visuals and digital experiences.</div>
              <div>From concept to final output — photo, video, or code.</div>
              <br></br>
              <div>Always learning. Always building.</div>
              <div>Let's make something meaningful.</div>
            </span>
            <span className='relative flex items-center justify-center md:left-1/4 mt-10 md:mt-0 animate-pulse hover:animate-none'>
              <Button to="/contact" size='large'>Contact Me</Button>
            </span>
          </div>

          <div className='h-20'></div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;