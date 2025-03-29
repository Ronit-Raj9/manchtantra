import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const events = [
  {
    id: 1,
    title: 'Annual Theatre Festival',
    date: 'Coming Soon',
    image: '/event1.jpg',
    description: 'A week-long celebration of theatrical excellence featuring original productions.',
  },
  {
    id: 2,
    title: 'Shakespeare Night',
    date: 'Coming Soon',
    image: '/event2.jpg',
    description: "A magical evening bringing the Bard's timeless works to life.",
  },
  {
    id: 3,
    title: 'Modern Drama Workshop',
    date: 'Coming Soon',
    image: '/event3.jpg',
    description: 'Learn contemporary acting techniques from industry professionals.',
  },
  {
    id: 4,
    title: 'Street Theatre',
    date: 'Coming Soon',
    image: '/event4.jpg',
    description: 'Taking drama to the streets with powerful social messages.',
  },
];

const EventsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section id="events" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-title text-center mb-12"
        >
          Upcoming Events
        </motion.h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-primary transition-all duration-300"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-primary transition-all duration-300"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>

          {/* Events Slider */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  className="w-full flex-shrink-0 px-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-secondary/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                          {event.title}
                        </h3>
                        <p className="text-white/80">{event.date}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300">{event.description}</p>
                      <button className="mt-4 btn-primary text-sm">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary scale-125' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection; 