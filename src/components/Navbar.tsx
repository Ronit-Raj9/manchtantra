import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set active link based on current path
    const path = window.location.pathname;
    setActiveLink(path === '/' ? 'home' : path.slice(1));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Nav links with animated underline effect
  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About', path: '/about', id: 'about' },
    { name: 'Events', path: '/events', id: 'events' },
    { name: 'Gallery', path: '/gallery', id: 'gallery' },
    { name: 'Contact', path: '/contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-lg py-2 shadow-lg shadow-primary/10' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with glow effect */}
          <Link to="/" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative z-10"
            >
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-primary via-yellow-400 to-primary font-serif">
                Manchtantra
              </h1>
              <div className="absolute -inset-1 rounded-lg blur-lg bg-primary/20 group-hover:bg-primary/30 
                transition-all duration-300 group-hover:blur-xl opacity-70 group-hover:opacity-100"></div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className="relative group"
                onClick={() => setActiveLink(link.id)}
              >
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  activeLink === link.id ? 'text-primary' : 'text-white hover:text-primary/90'
                }`}>
                  {link.name}
                </span>
                <motion.span
                  initial={{ width: activeLink === link.id ? '100%' : '0%' }}
                  animate={{ width: activeLink === link.id ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/80 to-primary"
                ></motion.span>
              </Link>
            ))}
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-yellow-500 text-black 
                font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 
                transition-all duration-300"
            >
              Join Us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="absolute top-0 left-0 w-6 h-0.5 bg-primary rounded-full"
                ></motion.span>
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  className="absolute top-2 left-0 w-6 h-0.5 bg-primary rounded-full"
                ></motion.span>
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="absolute top-4 left-0 w-6 h-0.5 bg-primary rounded-full"
                ></motion.span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-5 space-y-5">
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                >
                  <Link
                    to={link.path}
                    className="block text-center py-2"
                    onClick={() => {
                      setActiveLink(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className={`text-base ${
                      activeLink === link.id ? 'text-primary font-medium' : 'text-gray-300'
                    }`}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-2"
              >
                <button className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-yellow-500 
                  text-black font-medium text-sm shadow-lg">
                  Join Us
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 