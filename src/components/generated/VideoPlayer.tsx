import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Filter, Search } from 'lucide-react';
interface VideoRecording {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
  module: string;
  type: 'lecture' | 'workshop' | 'review';
}
export function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState<VideoRecording | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'espacio' | 'video' | 'modulo'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const videoRecordings: VideoRecording[] = [{
    id: '1',
    title: 'JavaScript Fundamentals - Variables and Data Types',
    date: '08/08/2025',
    duration: '45:30',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'lecture'
  }, {
    id: '2',
    title: 'DOM Manipulation Workshop',
    date: '07/08/2025',
    duration: '1:12:45',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'workshop'
  }, {
    id: '3',
    title: 'Code Review Session - Week 2',
    date: '06/08/2025',
    duration: '38:20',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'review'
  }, {
    id: '4',
    title: 'Event Handling Deep Dive',
    date: '05/08/2025',
    duration: '52:15',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'lecture'
  }, {
    id: '5',
    title: 'Async Programming Introduction',
    date: '04/08/2025',
    duration: '1:05:30',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 2',
    type: 'lecture'
  }];
  const filteredVideos = videoRecordings.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.module.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'video') return matchesSearch && video.type === 'lecture';
    if (activeFilter === 'modulo') return matchesSearch && video.module.includes('Module');
    return matchesSearch;
  });
  const filterOptions = [{
    id: 'all',
    label: 'All Content',
    count: videoRecordings.length
  }, {
    id: 'espacio',
    label: 'Espacio',
    count: 0
  }, {
    id: 'video',
    label: 'Video',
    count: videoRecordings.filter(v => v.type === 'lecture').length
  }, {
    id: 'modulo',
    label: 'Módulo',
    count: videoRecordings.length
  }];
  return <div className="max-w-7xl mx-auto">
      {/* Header with Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Video Feed</h2>
          
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search videos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent w-64" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map(filter => <button key={filter.id} onClick={() => setActiveFilter(filter.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === filter.id ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'}`}>
              <span>{filter.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {filter.count}
              </span>
            </button>)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative">
            {selectedVideo ? <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Simulated Video Player */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{selectedVideo.title}</h3>
                  <p className="text-slate-300 text-sm">Duration: {selectedVideo.duration}</p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
                
                {/* Floating Keyboard */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-30">
                  <div className="w-48 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg shadow-lg"></div>
                </div>
              </div> : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="text-slate-300">Select a video to start watching</p>
                </div>
              </div>}
          </div>

          {/* Video Info */}
          {selectedVideo && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mt-4 bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{selectedVideo.title}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {selectedVideo.date}
                </span>
                <span>{selectedVideo.duration}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedVideo.type === 'lecture' ? 'bg-blue-100 text-blue-700' : selectedVideo.type === 'workshop' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                  {selectedVideo.type.charAt(0).toUpperCase() + selectedVideo.type.slice(1)}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  {selectedVideo.module}
                </span>
              </div>
            </motion.div>}
        </div>

        {/* Video List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Recordings ({filteredVideos.length})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredVideos.map(video => <motion.button key={video.id} onClick={() => setSelectedVideo(video)} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className={`w-full text-left p-4 rounded-xl border transition-all ${selectedVideo?.id === video.id ? 'border-[#06b6d4] bg-[#06b6d4]/5' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="w-20 h-12 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play size={16} className="text-slate-400" />
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 line-clamp-2 mb-1">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {video.date}
                      </span>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${video.type === 'lecture' ? 'bg-blue-100 text-blue-700' : video.type === 'workshop' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                        {video.type}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs">
                        {video.module}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>)}
          </div>

          {filteredVideos.length === 0 && <div className="text-center py-8 text-slate-500">
              <p>No videos found matching your search.</p>
            </div>}
        </div>
      </div>

      {/* Graduation Date Info */}
      <div className="mt-8 bg-white rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar size={16} />
          <span>Fecha de graduación: 07/08/2025</span>
        </div>
      </div>
    </div>;
}