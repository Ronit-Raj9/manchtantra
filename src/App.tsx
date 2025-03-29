import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';
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

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 2 }}
          className="fixed inset-0 bg-primary origin-top z-50"
        />
      )}

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background with Spotlight Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-10"></div>
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero-background.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="hero-text text-6xl md:text-8xl font-serif font-bold text-primary mb-8"
          >
            Manchtantra
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="hero-text text-xl md:text-2xl font-light text-white mb-8 italic"
          >
            "All the world's a stage, and all the men and women merely players"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Step into a world where stories transcend reality, where emotions paint the air, 
            and where every performance is an unforgettable journey through the human experience.
          </motion.p>
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
            delay: 3.5
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="text-primary text-sm mb-2">Discover More</span>
          <ChevronDownIcon className="h-6 w-6 text-primary" />
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-secondary" id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-8">Welcome to Our Stage</h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            At Manchtantra, we don't just perform – we create magic that resonates with souls. 
            Our stage is where emotions come alive, where stories find their voice, and where 
            every moment is crafted to leave an indelible mark on your heart.
          </motion.p>
        </div>
      </section>

      {/* Events Section */}
      <EventsSection />

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