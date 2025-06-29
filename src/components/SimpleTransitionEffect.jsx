import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StretchTransition = () => {
  const transitionContainerRef = useRef(null);
  const transitionImageRef = useRef(null);

  useEffect(() => {
    const setupStretchAnimation = () => {
      if (!transitionImageRef.current || !transitionContainerRef.current) return;

      // Check for mobile/small screens
      const isSmallScreen = window.innerWidth < 768;
      
      // Set initial state - image is scaled down to almost nothing
      gsap.set(transitionImageRef.current, {
        scaleY: 0.001,
        transformOrigin: "bottom center",
        willChange: "transform", // Optimize for animation
      });

      // Create the stretch animation
      const stretchTween = gsap.to(transitionImageRef.current, {
        scaleY: isSmallScreen ? 80 : 50, // Adjust scale values as needed
        ease: "none", // Linear progression tied to scroll
        scrollTrigger: {
          trigger: transitionContainerRef.current,
          start: "top bottom", // Animation starts when top of trigger hits bottom of viewport
          end: "bottom top", // Animation ends when bottom of trigger hits top of viewport
          scrub: 1, // Smooth scroll-linked animation (1 second lag)
          invalidateOnRefresh: true, // Recalculate on window resize
          anticipatePin: 1, // Optimize performance
          refreshPriority: 1,
          onUpdate: (self) => {
            // Optional: Add progress-based effects
            const progress = self.progress;
            console.log(`Stretch progress: ${(progress * 100).toFixed(1)}%`);
          }
        }
      });

      // Cleanup function
      return () => {
        stretchTween.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    // Initialize animation
    const cleanup = setupStretchAnimation();

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cleanup && cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="pointer-events-none relative z-10">
      <div 
        ref={transitionContainerRef}
        className="relative w-full h-[200vh]" // Tall container for scroll distance
      >
        {/* Sticky container that stays in view during scroll */}
        <div className="sticky top-0 flex h-screen w-full items-end overflow-hidden">
          {/* Image positioned at bottom */}
          <div className="absolute left-0 bottom-0 h-auto w-full">
            {/* Animated scaling container */}
            <div 
              ref={transitionImageRef}
              className="flex origin-bottom transform-gpu" // transform-gpu for better performance
            >
              <img
                alt="transition-bg"
                className="h-screen w-full object-cover"
                src="https://res.cloudinary.com/dqktedlja/image/upload/v1750454438/njsfbhjref_wmyz5i.webp"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Alternative version with more advanced controls
const AdvancedStretchTransition = () => {
  const transitionContainerRef = useRef(null);
  const transitionImageRef = useRef(null);

  useEffect(() => {
    if (!transitionImageRef.current || !transitionContainerRef.current) return;

    // Create timeline for more complex animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: transitionContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          // Recalculate on refresh
          const isSmallScreen = window.innerWidth < 768;
          tl.to(transitionImageRef.current, {
            scaleY: isSmallScreen ? 80 : 50,
            duration: 1
          }, 0);
        }
      }
    });

    // Initial setup
    gsap.set(transitionImageRef.current, {
      scaleY: 0.001,
      transformOrigin: "bottom center",
      willChange: "transform",
    });

    // Add stretch animation to timeline
    const isSmallScreen = window.innerWidth < 768;
    tl.to(transitionImageRef.current, {
      scaleY: isSmallScreen ? 80 : 50,
      ease: "none",
      duration: 1
    });

    // Optional: Add additional effects
    tl.to(transitionImageRef.current, {
      opacity: 0.8,
      duration: 0.3
    }, 0.7); // Start at 70% of the main animation

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="pointer-events-none relative z-10">
      <div 
        ref={transitionContainerRef}
        className="relative w-full h-[200vh]"
      >
        <div className="sticky top-0 flex h-screen w-full items-end overflow-hidden">
          <div className="absolute left-0 bottom-0 h-auto w-full">
            <div 
              ref={transitionImageRef}
              className="flex origin-bottom transform-gpu"
            >
              <img
                alt="transition-bg"
                className="h-screen w-full object-cover"
                src="https://res.cloudinary.com/dqktedlja/image/upload/v1750454438/njsfbhjref_wmyz5i.webp"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { StretchTransition, AdvancedStretchTransition };