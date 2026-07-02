import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from './components/Scene';
import { Sections } from './components/Sections';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Shared scroll state reference to bridge GSAP and the React Three Fiber Canvas
  const scrollStateRef = useRef({
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    scale: 1.4,
    rotationZ: 0,
    rotationY: 0,
    distort: 0.4,
    speed: 2,
  });

  useEffect(() => {
    // GSAP context ensures all animations and triggers are properly cleaned up when the component unmounts
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      // Define centerpiece scroll animation timeline targeting our plain JS scrollStateRef
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth scrubbing effect
        }
      });

      // SECTION 1 -> SECTION 2 TRANSITION
      // Shrink and move the centerpiece to the side (on desktop) or down (on mobile)
      tl.to(scrollStateRef.current, {
        positionX: isDesktop ? -1.8 : 0,
        positionY: isDesktop ? -0.2 : -0.6,
        positionZ: 0,
        scale: isDesktop ? 0.85 : 0.7,
        distort: 0.2,
        speed: 1.2,
        duration: 1,
        ease: 'power2.inOut',
      }, 0);

      // SECTION 2 -> SECTION 3 TRANSITION
      // Center the centerpiece, zoom out, rotate dramatically, and morph fluidly
      // Pushed further down and smaller to avoid overlapping CTA text
      tl.to(scrollStateRef.current, {
        positionX: 0,
        positionY: isDesktop ? 1.8 : 2.2,
        positionZ: -2,
        scale: isDesktop ? 0.35 : 0.3,
        rotationZ: Math.PI * 2,
        rotationY: Math.PI,
        distort: 0.65,
        speed: 3,
        duration: 1,
        ease: 'power2.inOut',
      }, 1);

      // --- HTML CONTENT ENTRANCE ANIMATIONS ---

      // Section 1 (Hero) text slide-up & fade-in (fires on page load/mount)
      gsap.fromTo('.section-1 .reveal-text', {
        y: '100%',
        opacity: 0,
      }, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.6, // Slight delay to allow LoadingScreen fade-out
      });

      gsap.fromTo('.section-1 .reveal-text-sub', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.0,
        ease: 'power3.out'
      });

      gsap.fromTo('.scroll-indicator', {
        opacity: 0
      }, {
        opacity: 0.8,
        duration: 1,
        delay: 1.4
      });

      // Section 2 (Features) scroll-triggered content reveal
      gsap.fromTo('.section-2 .reveal-text', {
        y: '100%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-2',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.feature-item', {
        opacity: 0,
        x: -30
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Section 3 (CTA) scroll-triggered content reveal
      gsap.fromTo('.section-3 .reveal-text', {
        y: '100%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-3',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.section-3 .reveal-text-sub', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-3',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.cta-actions .btn', {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.cta-actions',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });

      // Section 4 (About) scroll-triggered content reveal
      gsap.fromTo('.section-about .reveal-about-title', {
        y: '100%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-about',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.avatar-frame', {
        scale: 0.8,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.section-about',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.about-paragraph', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-about',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Section 5 (Skills) scroll-triggered content reveal
      gsap.fromTo('.section-skills .reveal-skills-title', {
        y: '100%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-skills',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.skills-category', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Section 6 (Projects) scroll-triggered content reveal
      gsap.fromTo('.section-projects .reveal-projects-title', {
        y: '100%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-projects',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.project-card', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <LoadingScreen />
      <Scene scrollState={scrollStateRef} />
      <Sections />
    </>
  );
}

export default App;
