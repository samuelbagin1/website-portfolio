import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Seo, { getAbsoluteUrl } from "./components/Seo";
import backVideo from "./assets/background.webm";
import Button from "./components/Button";
import BeholdWidget from './components/BeholdWidget';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Button as ShadcnButton } from "./components/ui/button";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ArrowRight } from 'lucide-react';


import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [criticalReady, setCriticalReady] = useState({
    heroVideo: false,
    logo: false,
    fonts: false,
    firstPaint: false,
  });

  // Refs for animation targets
  const heroVideoRef = useRef(null);
  const heroTextRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const profileImageRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonRef = useRef(null);
  const featuredProjectRef = useRef(null);
  const videosRef = useRef(null);
  const widgetRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const contactRef = useRef(null);
  const homeSchema = useMemo(() => {
    const homeUrl = getAbsoluteUrl("/");
    const personId = `${homeUrl}#samuel-bagin`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${homeUrl}#website`,
          url: homeUrl,
          name: "Samuel Bagin",
          description: "AI engineering, data engineering, web development, and creative portfolio by Samuel Bagin.",
          inLanguage: "en",
          author: { "@id": personId },
        },
        {
          "@type": "Person",
          "@id": personId,
          name: "Samuel Bagin",
          url: homeUrl,
          image: "https://res.cloudinary.com/dqktedlja/image/upload/v1750360702/yuyrtyff_Large_k2cr1a.jpg",
          jobTitle: "AI and data engineer; web developer",
          homeLocation: {
            "@type": "Country",
            name: "Slovakia",
          },
          knowsAbout: [
            "Artificial intelligence",
            "Data engineering",
            "Web development",
            "React",
            "Python",
            "Databases",
            "Software development",
            "Photography",
            "Videography",
            "Video editing",
          ],
          sameAs: [
            "https://github.com/samuelbagin1",
            "https://www.linkedin.com/in/samuel-bag%C3%ADn/",
            "https://www.instagram.com/samuelbagin/",
            "https://x.com/samuelbagin",
          ],
        },
      ],
    };
  }, []);

  const markCriticalReady = useCallback((resource) => {
    setCriticalReady((current) => (
      current[resource] ? current : { ...current, [resource]: true }
    ));
  }, []);

  const homepageReady = Object.values(criticalReady).every(Boolean);

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
    let active = true;

    const prepareFonts = async () => {
      if (!document.fonts) {
        markCriticalReady("fonts");
        return;
      }

      await Promise.allSettled([
        document.fonts.load("400 16px Satoshi"),
        document.fonts.load("700 18px Satoshi"),
        document.fonts.load("900 96px Satoshi"),
      ]);

      if (active) markCriticalReady("fonts");
    };

    prepareFonts();

    return () => {
      active = false;
    };
  }, [markCriticalReady]);

  useEffect(() => {
    let firstFrame;
    let secondFrame;

    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => markCriticalReady("firstPaint"));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [markCriticalReady]);

  useEffect(() => {
    if (heroVideoRef.current?.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markCriticalReady("heroVideo");
    }
  }, [markCriticalReady]);

  useEffect(() => {
    if (homepageReady) setIsLoading(false);
  }, [homepageReady]);

  useEffect(() => {
    // Prevent a failed browser media event from trapping visitors on the loader.
    if (!isLoading) return undefined;

    const timeout = setTimeout(() => setIsLoading(false), 15000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

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


        gsap.fromTo(
          contactRef.current,
          {
            opacity: 0,
            y: -100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.4, // Added 0.2s delay
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 40%",
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

      gsap.fromTo(
        parallaxRef.current.children[0],
        {
          y: -100,
        },
        {
          y: 100, // Adjust this value for the parallax effect
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )

      // Cleanup
      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100); // Small delay for ScrollSmoother initialization

    return () => clearTimeout(timer);
  }, [isLoading, isSmallScreen]);

  useEffect(() => {
    if (isLoading || !featuredProjectRef.current) return undefined;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const featuredProject = featuredProjectRef.current;
      const image = featuredProject?.querySelector("[data-featured-project-image]");
      const content = featuredProject?.querySelector("[data-featured-project-content]");

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: featuredProject,
          start: "top 82%",
          end: "bottom 18%",
          toggleActions: "play reverse play reverse",
        },
      });

      reveal
        .fromTo(featuredProject, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .fromTo(image, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: "power3.out" }, "<")
        .fromTo(content, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.35");
    });

    return () => media.revert();
  }, [isLoading]);

  return (
    <>
      <Seo
        title="Samuel Bagin | AI & Data Engineer, Web Developer"
        description="Portfolio of Samuel Bagin, a Slovakia-based AI and data engineer and web developer building intelligent systems, data solutions, and web applications."
        image="https://res.cloudinary.com/dqktedlja/image/upload/v1750360702/yuyrtyff_Large_k2cr1a.jpg"
        schema={homeSchema}
      />
      <Navbar onLogoReady={() => markCriticalReady("logo")} />

      <div id="smooth-wrapper">
        <div id="smooth-content" className="bg-[#111111] text-[#FEFEFA] relative z-10 w-full">

          <div className="relative w-full h-svh justify-center items-center flex">
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onLoadedData={() => markCriticalReady("heroVideo")}
              onError={() => markCriticalReady("heroVideo")}
              className="absolute h-screen w-full object-cover"
            >
              <source src={backVideo} type="video/webm" />
            </video>

            <div className="h-screen w-full absolute bg-[#00000097] justify-center backdrop-blur-md"></div>
            <h1 ref={heroTextRef} className='font-black md:text-9xl text-6xl z-10 w-3/4 opacity-60' aria-label="Samuel Bagin: capture, create, code">
              <span className="block">Capture.</span>
              <span className="block">Create.</span>
              <span className="block">Code.</span>
            </h1>

            <div className='absolute bottom-2 z-10 mix-blend-soft-light text-xs'>scroll down</div>
          </div>

          <div className="relative text-sm lg:text-lg mt-20">
            <div ref={aboutSectionRef} className="relative w-full flex justify-center px-4">
              <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <span className='flex-1 flex flex-col justify-center order-2 lg:order-1'>
                  <div className='mb-2 font-bold'>Hi, I'm Sam.</div>
                  <div>AI & Data Engineer. Web Developer.</div>
                  <div>Photographer. Videographer.</div>
                  <div>Based in Slovakia.</div>
                  <div>Currently studying at Slovak Technical University.</div>
                </span>

                <span ref={profileImageRef} className='flex flex-col items-center flex-shrink-0 order-1 lg:order-2'>
                  <img src='https://res.cloudinary.com/dqktedlja/image/upload/v1750360702/yuyrtyff_Large_k2cr1a.jpg' className='h-36 rounded-full' alt='profile' loading="lazy" decoding="async" />
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

          <section ref={featuredProjectRef} className="mx-auto mt-32 w-[90%] max-w-5xl" aria-labelledby="featured-project-title">
            <Card className="group overflow-hidden border-zinc-800 bg-[#151515] shadow-2xl shadow-black/20 transition duration-300 hover:border-zinc-600">
              <div className="grid md:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-72 overflow-hidden md:min-h-full">
                  <img
                    src="https://res.cloudinary.com/dqktedlja/image/upload/v1783868199/develop/073a925e6dee48ec8f1ed3600_gspkq8.webp"
                    alt="Knowledge graph visualization for the AI-Based Knowledge Graph Construction project"
                    data-featured-project-image
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                <div data-featured-project-content className="flex flex-col justify-center">
                  <CardHeader className="pb-3">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">Featured project</p>
                    <CardTitle id="featured-project-title" className="pt-2 text-3xl leading-tight md:text-4xl">
                      AI-Based Knowledge Graph Construction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-6 text-zinc-400">
                      An AI pipeline that turns Slovak legal and financial PDFs into explainable Neo4j knowledge graphs for GraphRAG-style querying.
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <ShadcnButton asChild variant="outline" className="group/button h-10 rounded-full border-0 bg-white px-4 text-sm text-zinc-950 hover:bg-zinc-200 hover:text-zinc-950 active:scale-[0.98]">
                      <Link to="/portfolio/develop/ai-based-knowledge-graph-construction-6a53ab28">
                        Read case study
                        <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" size={17} />
                      </Link>
                    </ShadcnButton>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </section>

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

          <div className='w-screen h-[80vh] relative overflow-hidden' ref={parallaxRef}>
            <img src='https://res.cloudinary.com/dqktedlja/image/upload/v1751052585/test/f15eef31795b4e26bfb626803_tadpfx.webp' className=' h-[150%] w-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' alt='background' loading="lazy" decoding="async" />
          </div>

          <div className='h-40' />

          <div ref={widgetRef} >
            <div className='w-5/6 right-1/2 mx-auto hidden lg:flex'>
              <BeholdWidget id='7eJB3FwDt4Ahpq9N9X1v' className='hidden' />
            </div>
            <div className='lg:hidden w-5/6 right-1/2 mx-auto'>
              <BeholdWidget id='U8gObnFVUObaIvrZ9kdA' className='lg:hidden' />
            </div>
          </div>

          <div className='h-20'></div>

          <div ref={contactRef} className='w-3/4 left-10 lg:left-1/4 relative bg-gradient-to-r from-[#1a1919] to-[#111111] p-10 rounded-xl md:flex'>
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

      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]">
          <div className="flex flex-col items-center gap-4">
            <Grid
              size="60"
              speed="1.5"
              color="#69eae4"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
