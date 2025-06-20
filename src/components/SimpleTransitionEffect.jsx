import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SimpleTransitionEffect = ({ 
  imageSrc = "/your-transition-image.webp"
}) => {
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Track screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to scale value - responsive scaling
  const scaleY = useTransform(
    scrollYProgress,
    [0, 1.5], 
    [0.001, isSmallScreen ? 16 : 8] // 16x for small screens, 8x for large screens
  );
  
  return (
    <section className="pointer-events-none relative z-10">
      <div 
        ref={containerRef}
        className="relative w-full h-[400vh]"
      >
        {/* Sticky container that stays in view during scroll */}
        <div className="sticky top-0 flex h-screen w-full items-end">
          {/* Image positioned at bottom */}
          <div className="absolute left-0 bottom-0 h-auto w-full">
            {/* Animated scaling container */}
            <motion.div 
              className="flex origin-bottom"
              style={{ scaleY: scaleY }}
            >
              <img
                alt="transition-bg"
                className="h-full w-full object-cover"
                src={imageSrc}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleTransitionEffect;