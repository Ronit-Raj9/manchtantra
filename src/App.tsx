import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, SparklesIcon, FilmIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import Navbar from './components/Navbar';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TheatricalScene from './components/TheatricalScene';
import GalleryPage from './components/GalleryPage';
import EventsPage from './components/EventsPage';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScene, setShowScene] = useState(false);
  const [activeMask, setActiveMask] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  
  // Theatrical masks for rotation
  const masks = [
    "Comedy", "Tragedy", "Drama", "Mystery", "Expression", "Emotion"
  ];

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setIsLoading(false);
      setHasVisited(true);
    } else {
      // Simulate loading time for first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisited', 'true');
      }, 2500);
      
      return () => clearTimeout(timer);
    }
    
    // Rotate through theatrical masks
    const maskInterval = setInterval(() => {
      setActiveMask(prev => (prev + 1) % masks.length);
    }, 3000);

    // Parallax effect for hero section
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroElement = heroRef.current;
        const opacity = Math.max(1 - scrollY / 700, 0);
        const translateY = scrollY * 0.5;
        
        heroElement.style.opacity = opacity.toString();
        heroElement.style.transform = `translateY(${translateY}px)`;
      }
      
      // Text reveal on scroll
      if (introTextRef.current) {
        const introElement = introTextRef.current;
        const rect = introElement.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8;
        
        if (inView) {
          introElement.classList.add('text-reveal');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(maskInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [masks.length]);

  // Text reveal animation variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.5 + (i * 0.2)
      }
    })
  };

  // Cinematic particle effect component
  const CinematicParticles = () => {
    return (
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-primary/70"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: ['0%', '100%'], 
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Cinematic Introduction Sequence */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 2, times: [0, 0.6, 1] }}
              className="w-32 h-32 mb-8 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
                  <path d="M50,10 C27.91,10 10,27.91 10,50 C10,72.09 27.91,90 50,90 C72.09,90 90,72.09 90,50 C90,27.91 72.09,10 50,10 Z M50,80 C33.43,80 20,66.57 20,50 C20,33.43 33.43,20 50,20 C66.57,20 80,33.43 80,50 C80,66.57 66.57,80 50,80 Z M65,35 C65,43.28 58.28,50 50,50 L50,35 L65,35 Z M50,65 C41.72,65 35,58.28 35,50 L50,50 L50,65 Z" />
                </svg>
              </div>
              <motion.div 
                className="absolute inset-0"
                animate={{ 
                  rotate: 360,
                  boxShadow: ["0 0 20px rgba(255, 214, 0, 0.3)", "0 0 50px rgba(255, 214, 0, 0.6)", "0 0 20px rgba(255, 214, 0, 0.3)"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-serif text-primary mb-4 text-shadow-glow"
            >
              Manchtantra
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4 text-gray-400 text-center"
            >
              Theatre Collective of IIITM Gwalior
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Theatrical Background Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10"></div>
          
          {/* Parallax background layers */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: hasVisited ? 0 : 1.5 }}
            className="w-full h-full absolute inset-0"
            style={{ 
              backgroundImage: "url('/images/events/hero-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "contrast(1.1) brightness(0.6)"
            }}
          />

          {/* Cinematic lighting effects */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-80 mix-blend-overlay"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="spotlights w-full h-full relative">
              <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl"
                animate={{ 
                  x: ['20%', '80%', '50%', '20%'],
                  y: ['20%', '40%', '80%', '20%'],
                  scale: [1, 1.5, 1.2, 1]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              <motion.div
                className="absolute w-[200px] h-[200px] rounded-full bg-primary/10 blur-3xl"
                animate={{ 
                  x: ['70%', '30%', '60%', '70%'],
                  y: ['60%', '30%', '20%', '60%'],
                  scale: [1.2, 1, 1.5, 1.2]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 2
                }}
              />
            </div>
          </div>
        </div>

        {/* Add cinematic particles */}
        <CinematicParticles />

        {/* 3D Theatrical Scene */}
        {showScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur"
            onClick={() => setShowScene(false)}
          >
            <TheatricalScene />
          </motion.div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: hasVisited ? 0.2 : 1.7 }}
              className="inline-block relative"
            >
              <motion.h1
                className="hero-text text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-primary to-yellow-600 mb-2 text-shadow-glow"
              >
                Manchtantra
              </motion.h1>
              <motion.div 
                className="absolute -inset-3 rounded-full blur-3xl bg-primary/20 -z-10"
                animate={{ 
                  boxShadow: ["0 0 20px rgba(255, 214, 0, 0.3)", "0 0 50px rgba(255, 214, 0, 0.5)", "0 0 20px rgba(255, 214, 0, 0.3)"]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            <motion.h2 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 mt-4"
            >
              Theatre Collective of IIITM Gwalior
            </motion.h2>
          </div>
          
          {/* Theatrical mask animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: hasVisited ? 0.4 : 2 }}
            className="mb-10 relative h-16"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={activeMask}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-3xl font-serif italic text-primary absolute left-0 right-0 text-shadow-glow"
              >
                The Art of {masks[activeMask]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="text-md sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Step into a world where stories transcend reality, where emotions paint the air, 
            and where every performance is an unforgettable journey through the human experience.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <motion.button
              className="px-8 py-3 bg-primary text-black font-medium rounded-full transition-all hover:bg-primary/90 hover:scale-105 focus:ring-4 focus:ring-primary/30 shadow-lg shadow-primary/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 214, 0, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowScene(true)}
            >
              Experience Theatre
            </motion.button>
            
            <motion.a
              href="#upcoming-events"
              className="px-8 py-3 bg-transparent text-primary border border-primary font-medium rounded-full hover:bg-primary/10 transition-all focus:ring-4 focus:ring-primary/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255, 214, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Upcoming Events
            </motion.a>
          </motion.div>
        </div>

        {/* Animated Stage Curtains */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black via-black to-transparent"
            initial={{ x: 0 }}
            animate={{ x: "-95%" }}
            transition={{ duration: 2, delay: hasVisited ? 0.2 : 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black via-black to-transparent"
            initial={{ x: 0 }}
            animate={{ x: "95%" }}
            transition={{ duration: 2, delay: hasVisited ? 0.2 : 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: hasVisited ? 1 : 2.5
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="text-primary text-sm mb-2">Discover More</span>
          <ChevronDownIcon className="h-6 w-6 text-primary" />
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-secondary" id="about">
        <div className="max-w-6xl mx-auto" ref={introTextRef}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
            />
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary mb-6 text-shadow-glow"
            >
              Welcome to Our Stage
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              At Manchtantra, we don't just perform – we create magic that resonates with souls. 
              Our stage is where emotions come alive, where stories find their voice, and where 
              every moment is crafted to leave an indelible mark on your heart.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Theatrical Excellence",
                description: "Our performances blend classical traditions with contemporary innovations to create unique theatrical experiences.",
                icon: <SparklesIcon className="w-10 h-10 text-primary" />
              },
              {
                title: "Creative Workshops",
                description: "Develop your artistic skills through our immersive workshops led by experienced theatre practitioners.",
                icon: <LightBulbIcon className="w-10 h-10 text-primary" />
              },
              {
                title: "Cultural Impact",
                description: "We use the power of theatre to explore social themes and create meaningful conversations.",
                icon: <FilmIcon className="w-10 h-10 text-primary" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 30px -10px rgba(255, 214, 0, 0.2)"
                }}
                className="bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-primary/30 transition-all group spotlight-hover"
              >
                <div className="mb-4 flex justify-center md:justify-start">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4 group-hover:text-yellow-400 transition-colors text-center md:text-left">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-center md:text-left">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <div id="upcoming-events">
        <EventsSection />
      </div>

      {/* Gallery Section */}
      <GallerySection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 