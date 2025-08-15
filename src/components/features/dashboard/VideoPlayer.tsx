import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Filter, Search } from 'lucide-react';
import { videoRecordings } from '../../../data/videos';
import { VideoRecording } from '../../../types';

export function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState<VideoRecording | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'espacio' | 'video' | 'modulo'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoRecordings.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.module.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    
    const filterMap = {
      'espacio': ['workshop', 'review'],
      'video': ['lecture'],
      'modulo': [] // This would filter by specific modules
    };
    
    const allowedTypes = filterMap[activeFilter] || [];
    return matchesSearch && (allowedTypes.length === 0 || allowedTypes.includes(video.type));
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-500';
      case 'workshop': return 'bg-green-500';
      case 'review': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture': return 'Lecture';
      case 'workshop': return 'Workshop';
      case 'review': return 'Review';
      default: return 'Video';
    }
  };

  return (
    <div className="flex h-full">
      {/* Video List Sidebar */}
      <div className="w-96 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Video Feed</h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {['all', 'espacio', 'video', 'modulo'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Video List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {filteredVideos.map(video => (
              <motion.div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                  selectedVideo?.id === video.id
                    ? 'border-blue-500 bg-gray-800'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="p-3">
                  {/* Video Thumbnail */}
                  <div className="w-full h-32 bg-gray-700 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"></div>
                    <Play size={24} className="text-white z-10" />
                    <div className={`absolute bottom-2 right-2 ${getTypeColor(video.type)} text-white px-2 py-1 rounded text-xs font-medium`}>
                      {getTypeLabel(video.type)}
                    </div>
                  </div>

                  {/* Video Info */}
                  <h3 className="text-white font-medium text-sm leading-tight mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{video.date}</span>
                    </div>
                    <span>{video.duration}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{video.module}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 bg-black flex items-center justify-center">
        {selectedVideo ? (
          <div className="w-full max-w-4xl mx-auto p-6">
            {/* Video Player Container */}
            <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <Play size={64} className="text-white mx-auto mb-4" />
                  <p className="text-white text-lg">Video Player</p>
                  <p className="text-gray-400 text-sm">Playing: {selectedVideo.title}</p>
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{selectedVideo.date}</span>
                    </div>
                    <span>Duración: {selectedVideo.duration}</span>
                    <span>{selectedVideo.module}</span>
                  </div>
                </div>
                <div className={`${getTypeColor(selectedVideo.type)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {getTypeLabel(selectedVideo.type)}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-300 text-sm">
                  Esta sesión cubre los conceptos fundamentales necesarios para avanzar en el módulo. 
                  Asegúrate de tomar notas y revisar el material complementario.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Selecciona un video</h2>
            <p className="text-gray-400">Elige un video de la lista para comenzar a reproducir</p>
          </div>
        )}
      </div>
    </div>
  );
}
