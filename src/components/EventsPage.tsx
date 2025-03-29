import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
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

const filterOptions = ["All", "Theatre Play", "Workshop", "Festival"];
const statusOptions = ["All", "Upcoming", "Ongoing", "Past"];

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedFilter === "All" || event.category === selectedFilter;
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
            className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6"
          >
            Events & Past Performances
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center space-y-8 mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-primary">Upcoming & Past Events</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex flex-wrap justify-center gap-4">
              {filterOptions.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                    selectedFilter === filter
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {statusOptions.map((status) => (
                <motion.button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                    selectedStatus === status
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              layoutId={`event-${event.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                    event.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-primary font-medium mb-2">{event.category}</p>
                  <h3 className="text-xl font-serif font-bold text-white">{event.title}</h3>
                </div>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            layoutId={`event-${selectedEvent.id}`}
            className="bg-secondary max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[21/9]">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedEvent.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                    selectedEvent.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </span>
                  <span className="text-primary font-medium">{selectedEvent.category}</span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-white mb-4">
                  {selectedEvent.title}
                </h2>
                <div className="flex items-center gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>{selectedEvent.date} • {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-primary" />
                    <span>{selectedEvent.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-primary mb-4">About the Event</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedEvent.description}
                  </p>
                  {selectedEvent.artists && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-primary mb-3">Featured Artists</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.artists.map((artist, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Event Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-gray-300">
                        <MapPinIcon className="w-5 h-5 text-primary" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-300">
                        <UserGroupIcon className="w-5 h-5 text-primary" />
                        <span>{selectedEvent.capacity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 