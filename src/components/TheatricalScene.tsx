import React from 'react';
import { motion } from 'framer-motion';

export default function TheatricalScene() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />
      
      {/* Stage */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gray-900 z-20" />
      
      {/* Curtains */}
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-red-900 z-30" 
      />
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-red-900 z-30" 
      />
      
      {/* Stage Frame */}
      <div className="absolute top-0 left-[5%] right-[5%] h-5 bg-red-900 z-20" />
      <div className="absolute bottom-[30%] left-[5%] w-5 h-[70%] bg-red-900 z-20" />
      <div className="absolute bottom-[30%] right-[5%] w-5 h-[70%] bg-red-900 z-20" />
      
      {/* Stage Lights */}
      {['-20%', '0%', '20%'].map((left, index) => (
        <div key={index} className="absolute top-[5%]" style={{ left }}>
          <motion.div 
            className="w-6 h-6 rounded-full bg-yellow-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.5 
            }}
          />
          <motion.div 
            className="w-24 h-40 bg-gradient-to-b from-yellow-500/50 to-transparent transform -translate-x-1/2 origin-top rotate-45"
            animate={{ opacity: [0.7, 0.3, 0.7] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: index * 0.5 
            }}
          />
        </div>
      ))}
      
      {/* Center Title */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-serif text-primary font-bold mb-4">Manchtantra</h2>
        <p className="text-lg md:text-xl text-gray-300 italic">Where stories come alive</p>
      </motion.div>
    </div>
  );
} 