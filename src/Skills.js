import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Skills() {
  const [isLoading, setIsLoading] = useState(true);
  const skillsGridRef = useRef(null);
  const disclaimerRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP ScrollSmoother
    let smoother;

    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,               // Smooth factor
      effects: true,             // Enable data-speed effects
      smoothTouch: 0.1,          // Smooth factor for touch devices
      normalizeScroll: true,     // Normalize scroll behavior
      ignoreMobileResize: true,  // Prevent issues with mobile viewport changes
    });

    // Cleanup
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  useEffect(() => {
    // Set up GSAP animations after component mounts
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate skill boxes individually on scroll
        if (skillsGridRef.current) {
          const skillBoxes = Array.from(skillsGridRef.current.children);

          // Set initial state for all boxes
          gsap.set(skillBoxes, {
            opacity: 0,
            scale: 0.7,
            y: 80,
            rotation: -10,
          });

          // Animate each box individually as it comes into view
          skillBoxes.forEach((box, index) => {
            gsap.to(box, {
              opacity: 1,
              scale: 1,
              y: 0,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
                // Optional: add some randomness to timing
                delay: Math.random() * 0.2,
              },
            });
          });
        }

        // Animate disclaimer text
        if (disclaimerRef.current) {
          gsap.fromTo(
            disclaimerRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: disclaimerRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Add hover effects to skill boxes
        if (skillsGridRef.current) {
          const skillBoxes = Array.from(skillsGridRef.current.children);

          skillBoxes.forEach((box) => {
            box.addEventListener('mouseenter', () => {
              gsap.to(box, {
                scale: 1.05,
                rotation: 2,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            box.addEventListener('mouseleave', () => {
              gsap.to(box, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        }

      });

      // Cleanup
      return () => {
        ctx.revert();
      };
    }, 100); // Small delay for ScrollSmoother initialization

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content" className='bg-[#0e0e0e] text-[#FEFEFA]'>

          <div className='h-20'></div>
          <div className='h-[300vh] justify-center items-center flex py-8'>
            <div
              ref={skillsGridRef}
              className="grid grid-cols-3 grid-rows-12 gap-4 w-4/5 h-full font-bold text-md text-center lg:text-3xl"
            >
              <div className="col-span-2 bg-[#00E6B3] text-[#312AF8] justify-center items-center flex rounded-2xl cursor-pointer">
                Object Oriented Programming
              </div>
              <div className="row-span-2 col-start-3 bg-[#91FBC7] text-[#920089] justify-center items-center flex rounded-2xl cursor-pointer">
                C++
              </div>

              <div className="col-start-2 row-start-2 bg-[#00C944] text-[#00385B] justify-center items-center flex rounded-2xl cursor-pointer">
                Java
              </div>
              <div className="col-start-1 row-start-2 bg-[#20CBD2] text-[#38226F] justify-center items-center flex rounded-2xl cursor-pointer">
                NextJS
              </div>

              <div className="col-span-2 row-span-2 row-start-3 bg-[#FF0C75] text-[#760073] justify-center items-center flex rounded-2xl cursor-pointer">
                C
              </div>
              <div className="col-start-3 row-start-3 bg-[#54A4A8] text-[#5B0047] justify-center items-center flex rounded-2xl cursor-pointer">
                Matlab
              </div>

              <div className="row-span-2 col-start-3 row-start-4 bg-[#76C187] text-[#4C545C] justify-center items-center flex rounded-2xl cursor-pointer">
                AI
              </div>
              <div className="col-span-2 col-start-2 row-start-6 bg-[#39CEF1] text-[#341B4E] justify-center items-center flex rounded-2xl cursor-pointer">
                NoSQL
              </div>

              <div className="col-start-2 row-start-5 bg-[#E45538] text-[#383F7B] justify-center items-center flex rounded-2xl cursor-pointer">
                MySQL
              </div>
              <div className="row-span-2 col-start-1 row-start-5 bg-[#EF4759] text-[#130B54] justify-center items-center flex rounded-2xl cursor-pointer">
                MongoDB
              </div>

              <div className="row-span-2 col-start-2 row-start-7 bg-[#20C9A9] text-[#454653] justify-center items-center flex rounded-2xl cursor-pointer">
                Vercel Serverless
              </div>
              <div className="col-start-1 row-start-7 bg-[#009FB2] text-[#003780] justify-center items-center flex rounded-2xl cursor-pointer">
                Photoshop
              </div>

              <div className="row-span-2 col-start-1 row-start-8 bg-[#79EE3C] text-[#103934] justify-center items-center flex rounded-2xl cursor-pointer">
                Lightroom
              </div>
              <div className="row-span-2 col-start-3 row-start-7 bg-[#BFF6E7] text-[#244CDF] justify-center items-center flex rounded-2xl cursor-pointer">
                Davinci Resolve
              </div>

              <div className="col-span-2 col-start-2 row-start-9 bg-[#0077FF] text-[#FF0200] justify-center items-center flex rounded-2xl cursor-pointer">
                Javascript
              </div>
              <div className="col-span-2 row-span-2 row-start-10 bg-[#0CD5DF] text-[#121E53] justify-center items-center flex rounded-2xl cursor-pointer">
                HTML/CSS
              </div>

              <div className="col-start-3 row-start-10 bg-[#104362] text-[#11CD40] justify-center items-center flex rounded-2xl cursor-pointer">
                React
              </div>
              <div className="col-start-3 row-start-11 bg-[#8E0095] text-[#9CFED9] justify-center items-center flex rounded-2xl cursor-pointer">
                Python
              </div>

              <div className="col-span-2 col-start-2 row-start-12 bg-[#6D63CD] text-[#33D2A7] justify-center items-center flex rounded-2xl cursor-pointer">
                Video Editing
              </div>
              <div className="col-start-1 row-start-12 bg-[#00FF7F] text-[#103934] justify-center items-center flex rounded-2xl cursor-pointer">
                Photo Editing
              </div>
            </div>
          </div>

          <div
            ref={disclaimerRef}
            className='text-center text-xs lg:text-sm text-[#5a5a5a] mb-10 w-3/4 mx-auto'
          >
            <span>DISCLAIMER:</span> size of the box does not represent knowledge or skill level.
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Skills