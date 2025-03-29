import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface VideoPerformance {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  date: string;
  category: string;
}

const VideoPerformances: React.FC = () => {
  const [videos, setVideos] = useState<VideoPerformance[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoPerformance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredVideoId, setFeaturedVideoId] = useState<string | null>(null);

  // Directly use the specific video IDs provided
  const videoIds = [
    'XdKY5q7KG2c',
    'y8Q0MyQKmiM',
    'AHwMBbddrVM',
    'hzcLaEVz9ek',
    'wDr9pKSG8ok',
    'g7tZUDW7dmA',
  ];

  // Initialize videos directly with the provided IDs
  useEffect(() => {
    console.log("Initializing videos with provided IDs");
    
    // Create video objects from the IDs
    const videosList = videoIds.map((id, index) => ({
      id: id,
      title: `Manchtantra Performance ${index + 1}`,
      description: 'Manchtantra IIITM Gwalior performance',
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      videoId: id,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: "Theatre Performance"
    }));
    
    console.log("Created video list:", videosList);
    setVideos(videosList);
    
    // Set the first video as featured
    if (videoIds.length > 0) {
      setFeaturedVideoId(videoIds[0]);
    }
    
    // Simulation of data loading complete
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Handle YouTube iframe load error
  const handleIframeError = () => {
    console.error("iframe loading error");
    setError("Failed to load video. Please try again later.");
    setIsLoading(false);
  };

  // Handle YouTube iframe successful load
  const handleIframeLoad = () => {
    console.log("iframe loaded successfully");
    setIsLoading(false);
    setError(null);
  };

  // When setting the selected video
  const handleSelectVideo = (video: VideoPerformance) => {
    console.log("Selected video for playback:", video);
    setSelectedVideo(video);
    setIsLoading(true); // Reset loading state for the modal
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
            {/* Using the first video as featured */}
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideoId || videoIds[0]}?rel=0&modestbranding=1`}
              title="Manchtantra Featured Performance"
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

        {/* Videos Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-serif font-bold text-primary mb-8 text-center"
          >
            Our Performances
          </motion.h3>

          {/* Loading State - only show briefly during initial mount */}
          {isLoading && videos.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Videos Grid */}
          {videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                  onClick={() => handleSelectVideo(video)}
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.log(`Thumbnail load error for video ${video.videoId}, trying different resolution`);
                        // Try medium quality if high quality fails
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
                    <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      Performance {index + 1}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Manchtantra IIITM Gwalior
                    </p>
                    <p className="text-gray-300 line-clamp-2">
                      Click to watch this captivating performance by Manchtantra IIITM Gwalior.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
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