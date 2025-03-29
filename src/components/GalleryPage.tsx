import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Gallery item type definition
interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  location: string;
  participants: string[];
}

// Sample gallery data
const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Annual Theatre Festival 2024",
    description: "A spectacular showcase of theatrical talent featuring original productions from our members. The festival included dramatic performances, monologues, and experimental theatre pieces.",
    category: "Festivals",
    date: "March 15, 2024",
    image: "/gallery/festival1.jpg",
    location: "Main Auditorium",
    participants: ["Drama Club", "Guest Artists", "Student Performers"]
  },
  {
    id: 2,
    title: "Shakespeare's Macbeth",
    description: "A modern interpretation of the classic tragedy, featuring innovative staging and contemporary costume design while maintaining the original's powerful themes.",
    category: "Productions",
    date: "February 20, 2024",
    image: "/gallery/macbeth.jpg",
    location: "Open Air Theatre",
    participants: ["Senior Drama Team", "Technical Crew"]
  },
  {
    id: 3,
    title: "Street Theatre Workshop",
    description: "An intensive workshop focusing on the art of street theatre and its role in social change, led by renowned theatre activist Maya Rao.",
    category: "Workshops",
    date: "January 10, 2024",
    image: "/gallery/workshop1.jpg",
    location: "Campus Grounds",
    participants: ["Students", "Faculty", "Guest Speaker"]
  },
  // Add more gallery items as needed
];

// Available categories
const categories = ["All", "Festivals", "Productions", "Workshops", "Behind the Scenes"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filteredItems, setFilteredItems] = useState(galleryData);

  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(galleryData);
    } else {
      setFilteredItems(galleryData.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-secondary pt-24 px-4 md:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-serif font-bold text-primary text-center mb-8"
        >
          Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-center max-w-3xl mx-auto mb-12"
        >
          Explore our theatrical journey through captivating moments, productions, and events that define Manchtantra's artistic legacy.
        </motion.p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category
                  ? "border-primary text-primary"
                  : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-${item.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/50 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{item.date}</p>
                <p className="text-gray-300 line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            layoutId={`gallery-${selectedItem.id}`}
            className="bg-secondary max-w-4xl w-full rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-[400px] object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                {selectedItem.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 mb-6">{selectedItem.description}</p>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <span className="text-primary font-semibold">Date:</span> {selectedItem.date}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-primary font-semibold">Location:</span> {selectedItem.location}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-primary font-semibold">Category:</span> {selectedItem.category}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Participants</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {selectedItem.participants.map((participant, index) => (
                      <li key={index}>{participant}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 