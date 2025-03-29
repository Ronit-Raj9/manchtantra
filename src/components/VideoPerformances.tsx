import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface VideoPerformance {
  id: string;
  title: string;
  description: string;
  videoId: string;
  date: string;
  category: string;
}

// Actual videos from your YouTube channel
const videoPerformances: VideoPerformance[] = [
  {
    id: "1",
    title: "Nukkad Natak - Manchtantra IIITM Gwalior",
    description: "A powerful street play performance addressing social issues through theatrical expression.",
    videoId: "VIDEO_ID_1",
    date: "March 15, 2024",
    category: "Street Play"
  },
  // Add more videos here
];

const VideoPerformances: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoPerformance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle YouTube iframe load error
  const handleIframeError = () => {
    setError("Failed to load video. Please try again later.");
    setIsLoading(false);
  };

  // Handle YouTube iframe successful load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            Featured Performances
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our latest street plays, theatrical performances, and behind-the-scenes moments
          </p>
        </motion.div>

        {/* Main Channel Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black/40">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-gray-300">
                <ExclamationCircleIcon className="w-16 h-16 text-primary mb-4" />
                <p>{error}</p>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setError(null);
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
            <iframe
              src="https://www.youtube.com/embed?listType=user&list=manchtantraiiitmgwalior5161"
              title="Manchtantra YouTube Channel"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://www.youtube.com/@manchtantraiiitmgwalior5161"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-lg font-medium">Visit Our YouTube Channel</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h6zm11-3v8h-2V6.413l-7.293 7.294-1.414-1.414L17.585 5H13V3h8z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Featured Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoPerformances.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail if maxresdefault fails
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <PlayIcon className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {video.date} • {video.category}
                </p>
                <p className="text-gray-300 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default VideoPerformances; 