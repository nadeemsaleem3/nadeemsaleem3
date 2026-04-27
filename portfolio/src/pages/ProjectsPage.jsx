import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllProjects, getStoreInfo } from '../data/helpers';
import { FaFilter, FaSearch, FaExternalLinkAlt, FaGooglePlay, FaApple, FaAmazon, FaVideo, FaStar, FaDownload } from 'react-icons/fa';

const ProjectsPage = () => {
  const allProjects = useMemo(() => getAllProjects(), []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStore, setSelectedStore] = useState('All');

  // Extract unique genres and stores
  const genres = useMemo(() => ['All', ...new Set(allProjects.flatMap(p => p.genres || []))], [allProjects]);
  const stores = useMemo(() => ['All', ...new Set(allProjects.map(p => p.store))], [allProjects]);

  const BASE_URL = import.meta.env.BASE_URL;

  // Image source with fallback logic
  const getProjectImage = (project) => {
    //const localImage = `${BASE_URL}images/projects/${project.image.split('/').pop() || 'game-placeholder.png'}`;
    const localImage = `${BASE_URL}images/projects/game-placeholder.png'; // Default to placeholder for better reliability}`;
    return (
      <img
        src={localImage}
        alt={project.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          const target = e.currentTarget;
          
          // Priority 1: External store/app store fallback
          if (project.imageFallback) {
            target.src = project.imageFallback;
          } 
          // Priority 2: Local placeholder
          else {
            target.src = `${BASE_URL}images/projects/game-placeholder.png`;
          }

          // Final safety net
          target.onerror = () => {
            target.src = "https://picsum.photos/id/1015/600/400";
          };
        }}
      />
    );
  };

  // Compute filtered projects
  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.genres?.some((g) => g.toLowerCase().includes(term))
      );
    }

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(p => p.genres?.includes(selectedGenre));
    }

    if (selectedStore !== 'All') {
      filtered = filtered.filter(p => p.store === selectedStore);
    }

    return filtered;
  }, [searchTerm, selectedGenre, selectedStore, allProjects]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSelectedStore('All');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            All Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Browse through {allProjects.length}+ mobile games and applications I've developed.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProjects.length}</span> of {allProjects.length} projects
              </span>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">No projects found</h3>
            <button onClick={resetFilters} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Reset All Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const storeInfo = getStoreInfo(project.store);
              const IconComponent = storeInfo?.icon ? FaGooglePlay : FaExternalLinkAlt; // fallback icon

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                  whileHover={{ y: -8 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-700"
                >
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    {getProjectImage(project)}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Genre Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.genres?.slice(0, 3).map((genre, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Store Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 ${storeInfo?.color || 'bg-gray-600'} text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center`}>
                        <IconComponent className="mr-1" size={12} />
                        {project.store}
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-between items-center">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 ${storeInfo?.color || 'bg-blue-600'} text-white rounded-lg font-medium transition-colors flex items-center`}
                        >
                          <IconComponent className="mr-2" />
                          View on {project.store}
                        </a>

                        {project.videoUrl && (
                          <a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                            title="Watch trailer"
                          >
                            <FaVideo />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {project.role} • {project.store}
                        </p>
                      </div>
                      {project.featured && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-center text-yellow-500 mb-1">
                          <FaStar />
                          <span className="ml-1 font-bold">{project.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-center text-green-500 mb-1">
                          <FaDownload />
                          <span className="ml-1 font-bold">{project.downloads}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Downloads</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;