import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CalendarIcon, MapPinIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import VideoPerformances from './VideoPerformances';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  capacity: string;
  status: 'upcoming' | 'ongoing' | 'past';
  artists?: string[];
  duration?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Romeo and Juliet: Modern Retelling",
    date: "April 15, 2024",
    time: "7:00 PM",
    location: "Main Auditorium",
    description: "Experience Shakespeare's timeless love story reimagined in a contemporary setting. This modern adaptation brings fresh perspective while maintaining the powerful essence of the original tragedy.",
    image: "/images/events/romeo-juliet.jpg",
    category: "Theatre Play",
    capacity: "200 seats",
    status: "upcoming",
    artists: ["John Doe", "Jane Smith", "Robert Johnson"],
    duration: "2 hours 30 minutes"
  },
  {
    id: 2,
    title: "Theatre Workshop: Method Acting",
    date: "April 20, 2024",
    time: "10:00 AM",
    location: "Drama Studio",
    description: "An intensive workshop on method acting techniques led by renowned theatre artist Naseeruddin Shah. Perfect for both beginners and experienced actors.",
    image: "/images/events/workshop.jpg",
    category: "Workshop",
    capacity: "50 participants",
    status: "upcoming",
    artists: ["Naseeruddin Shah"],
    duration: "4 hours"
  },
  {
    id: 3,
    title: "Annual Drama Festival 2024",
    date: "May 1-5, 2024",
    time: "Various timings",
    location: "College Amphitheatre",
    description: "Five days of theatrical excellence featuring performances from top drama clubs across the country. Experience diverse storytelling styles and cultural expressions.",
    image: "/images/events/festival.jpg",
    category: "Festival",
    capacity: "500 attendees",
    status: "upcoming",
    duration: "5 days"
  },
  {
    id: 4,
    title: "Hamlet: The Danish Prince",
    date: "March 1, 2024",
    time: "6:30 PM",
    location: "Main Auditorium",
    description: "A critically acclaimed performance of Shakespeare's masterpiece that left audiences spellbound with its innovative staging and powerful performances.",
    image: "/images/events/hamlet.jpg",
    category: "Theatre Play",
    capacity: "200 seats",
    status: "past",
    artists: ["Michael Brown", "Sarah Wilson"],
    duration: "3 hours"
  }
];

// Combined options for filtering
const eventCategories = ["All", "Theatre Play", "Workshop", "Festival"];
const eventStatuses = ["Upcoming", "Ongoing", "Past"];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  },
  hover: {
    y: -15,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

// Image hover variants
const imageHoverVariants: Variants = {
  hover: { 
    scale: 1.15,
    filter: "brightness(1.1) contrast(1.1)",
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Show filters with animation after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFilterVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || event.status === selectedStatus.toLowerCase();
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-secondary pt-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[50vh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/events/hero-bg.jpg"
            alt="Events"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary mb-6"
          >
            Events & Performances
          </motion.h1>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl font-serif italic">
              "Theatre is not just entertainment, it's a mirror to society"
            </p>
            <p className="text-lg text-gray-300 max-w-2xl">
              Discover our upcoming shows and relive our past performances
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Performances Section */}
      <VideoPerformances />

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence>
          {isFilterVisible && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 24 
              }}
              className="mb-16"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center space-y-3"
              >
                <motion.div 
                  className="w-20 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full mb-2"
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">
                  Upcoming & Past Events
                </h2>
                <p className="text-gray-400 text-center max-w-xl mb-10">
                  Browse our theatrical performances, workshops, and festivals
                </p>
              </motion.div>

              {/* Filter Tabs - Combined into one unified row */}
              <motion.div 
                className="relative mt-8 flex flex-wrap justify-center gap-2 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Active filter indicator (glowing backdrop) */}
                <div className="absolute -inset-1 rounded-full blur-md bg-primary/5 -z-10" />

                {/* Category filters */}
                {eventCategories.map((category) => (
                  <motion.button
                    key={`category-${category}`}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                      selectedCategory === category
                        ? "border-primary bg-primary text-black font-medium shadow-lg shadow-primary/20"
                        : "border-gray-700 bg-black/40 text-gray-300 hover:border-primary/50 hover:bg-black/60"
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(255, 214, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {category}
                  </motion.button>
                ))}

                {/* Divider */}
                <motion.div 
                  className="h-8 w-px bg-gray-700 mx-2"
                  variants={itemVariants}
                />

                {/* Status filters */}
                {eventStatuses.map((status) => (
                  <motion.button
                    key={`status-${status}`}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                      selectedStatus === status
                        ? "border-primary bg-primary text-black font-medium shadow-lg shadow-primary/20"
                        : "border-gray-700 bg-black/40 text-gray-300 hover:border-primary/50 hover:bg-black/60"
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(255, 214, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layoutId={`event-card-${event.id}`}
                className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border border-gray-800 hover:border-primary/30"
                onClick={() => setSelectedEvent(event)}
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    variants={imageHoverVariants}
                  />
                  {/* Cinematic overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"
                    whileHover={{ 
                      background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.5), transparent)",
                      opacity: 0.8
                    }}
                  />
                  
                  {/* Spotlight effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,216,0,0.1) 0%, transparent 70%)',
                    }}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.span 
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        event.status === 'upcoming' ? 'border-green-500 bg-green-500/10 text-green-400' :
                        event.status === 'ongoing' ? 'border-blue-500 bg-blue-500/10 text-blue-400' :
                        'border-gray-500 bg-gray-500/10 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </motion.span>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <motion.span 
                      className="px-3 py-1 rounded-full text-sm font-medium border border-primary text-primary bg-black/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {event.category}
                    </motion.span>
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                  </motion.div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-gray-300">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <MapPinIcon className="w-5 h-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <ClockIcon className="w-5 h-5 text-primary" />
                    <span>{event.duration}</span>
                  </div>
                  
                  {/* View Details Button with glow effect */}
                  <motion.button
                    className="mt-4 w-full py-2 rounded-lg bg-black/50 text-primary border border-primary/30 hover:bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(255, 214, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">View Details</span>
                    {/* Button glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-primary/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ 
                        scale: 1.5, 
                        opacity: 0.5,
                        transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
                      }}
                      style={{ 
                        background: 'radial-gradient(circle, rgba(255,214,0,0.3) 0%, transparent 70%)',
                      }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TagIcon className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-2xl font-medium text-gray-400 mb-2">No events found</h3>
              <p className="text-gray-500 max-w-md">
                No events match your current filter selection. Try adjusting your filters.
              </p>
              <motion.button
                className="mt-6 px-6 py-2 bg-primary/10 border border-primary rounded-full text-primary"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              layoutId={`event-card-${selectedEvent.id}`}
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="relative aspect-video">
                <motion.img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "rgba(255, 214, 0, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                  className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full p-2 text-white hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedEvent(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                
                <motion.div 
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      selectedEvent.status === 'upcoming' ? 'border-green-500 bg-green-500/10 text-green-400' :
                      selectedEvent.status === 'ongoing' ? 'border-blue-500 bg-blue-500/10 text-blue-400' :
                      'border-gray-500 bg-gray-500/10 text-gray-400'
                    }`}>
                      {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium border border-primary text-primary bg-black/50 backdrop-blur-sm">
                      {selectedEvent.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-white">{selectedEvent.title}</h2>
                </motion.div>
              </div>
              
              <motion.div 
                className="p-6 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-300">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.date} • {selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <MapPinIcon className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <ClockIcon className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.duration}</span>
                    </div>
                  </div>
                  <div>
                    {selectedEvent.artists && selectedEvent.artists.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-primary">Featured Artists</h3>
                        <ul className="list-disc list-inside text-gray-300">
                          {selectedEvent.artists.map((artist, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              {artist}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-primary">About this Event</h3>
                  <motion.p 
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {selectedEvent.description}
                  </motion.p>
                </div>
                
                <div className="pt-4 flex justify-between items-center border-t border-gray-800">
                  <div>
                    <p className="text-sm text-gray-400">Capacity</p>
                    <p className="text-gray-300">{selectedEvent.capacity}</p>
                  </div>
                  <motion.button
                    className={`px-6 py-3 rounded-lg font-medium ${
                      selectedEvent.status === 'upcoming'
                        ? 'bg-primary text-black hover:bg-primary/90'
                        : 'bg-gray-800 text-gray-300 cursor-not-allowed'
                    }`}
                    whileHover={selectedEvent.status === 'upcoming' ? { 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(255, 214, 0, 0.3)"
                    } : {}}
                    whileTap={selectedEvent.status === 'upcoming' ? { scale: 0.98 } : {}}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {selectedEvent.status === 'upcoming' ? 'Book Tickets' : 
                     selectedEvent.status === 'ongoing' ? 'In Progress' : 'Event Ended'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 