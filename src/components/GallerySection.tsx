import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const galleryItems = [
  {
    id: 1,
    image: '/gallery1.jpg',
    title: 'Romeo & Juliet',
    category: 'Performance',
    height: 'h-64',
  },
  {
    id: 2,
    image: '/gallery2.jpg',
    title: 'Backstage Moments',
    category: 'Behind the Scenes',
    height: 'h-96',
  },
  {
    id: 3,
    image: '/gallery3.jpg',
    title: 'Street Play',
    category: 'Performance',
    height: 'h-72',
  },
  {
    id: 4,
    image: '/gallery4.jpg',
    title: 'Workshop',
    category: 'Workshop',
    height: 'h-80',
  },
  {
    id: 5,
    image: '/gallery5.jpg',
    title: 'Annual Day',
    category: 'Event',
    height: 'h-64',
  },
  {
    id: 6,
    image: '/gallery6.jpg',
    title: 'Rehearsal',
    category: 'Behind the Scenes',
    height: 'h-96',
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Performance', 'Behind the Scenes', 'Workshop', 'Event'];

  const filteredGallery = selectedFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-title text-center mb-12"
        >
          Our Gallery
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-primary text-secondary'
                  : 'bg-secondary/50 text-white hover:bg-primary/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className={`relative ${item.height} group cursor-pointer overflow-hidden rounded-lg`}
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-xl font-serif font-bold text-primary">{item.title}</h3>
                <p className="text-white/80">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={galleryItems.find(item => item.id === selectedImage)?.image}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GallerySection; 