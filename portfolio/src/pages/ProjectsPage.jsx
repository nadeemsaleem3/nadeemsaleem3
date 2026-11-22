import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllProjects, getStoreInfo } from '../data/helpers';
import { getAIProjectDetail } from '../data/aiProjectDetails';
import { getGameCaseStudy } from '../data/gameCaseStudies';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  FaFilter,
  FaSearch,
  FaExternalLinkAlt,
  FaGooglePlay,
  FaApple,
  FaAmazon,
  FaFilm,
  FaStar,
  FaDownload,
  FaTimes,
} from 'react-icons/fa';

const iconComponents = {
  FaGooglePlay,
  FaApple,
  FaAmazon,
  FaExternalLinkAlt,
};

const ProjectsPage = () => {
  const allProjects = useMemo(() => getAllProjects(), []);

  useDocumentMeta({
    title: 'Projects - Nadeem Saleem | Game Development & AI/ML Portfolio',
    description: `Browse ${allProjects.length}+ mobile games, AI/ML applications, and web projects developed by Nadeem Saleem. Unity, C#, Android, iOS game development and AI engineering portfolio.`,
    ogType: 'website',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStore, setSelectedStore] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);

  // Extract unique genres and stores
  const genres = useMemo(() => ['All', ...new Set(allProjects.flatMap(p => p.genres || []))], [allProjects]);
  const stores = useMemo(() => ['All', ...new Set(allProjects.map(p => p.store))], [allProjects]);
  const categories = useMemo(() => ['All', ...new Set(allProjects.map(p => p.category || 'Game'))], [allProjects]);

  const BASE_URL = import.meta.env.BASE_URL;

  // Prefer the locally hosted image, then the remote fallback, then a placeholder.
  const getProjectImage = (project) => {
    const localImage = project.image
      ? `${BASE_URL}${project.image.replace(/^\//, '')}`
      : null;
    const localFallback = `${BASE_URL}images/projects/game-placeholder.png`;
    const initialSrc = localImage || project.imageFallback || localFallback;
    let fallbackUsed = false;

    return (
      <img
        src={initialSrc}
        alt={`${project.name} store artwork`}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          const target = e.currentTarget;

          if (!fallbackUsed) {
            fallbackUsed = true;
            target.src = project.imageFallback || localFallback;
          } else {
            target.src = localFallback;
          }
        }}
      />
    );
  };

  // Compute filtered projects
  const categoryProjects = useMemo(() => {
    if (selectedCategory === 'All') return allProjects;
    return allProjects.filter(p => p.category === selectedCategory);
  }, [selectedCategory, allProjects]);

  const filteredProjects = useMemo(() => {
    let filtered = categoryProjects;

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
  }, [searchTerm, selectedGenre, selectedStore, categoryProjects]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSelectedStore('All');
    setSelectedCategory('All');
  };

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus();
      lastTriggerRef.current = null;
    }
  }, []);

  const openVideo = (project, event) => {
    lastTriggerRef.current = event.currentTarget;
    setActiveVideo({ url: project.videoUrl, name: project.name });
  };

  // Focus the close button when the dialog opens and close it with Escape.
  useEffect(() => {
    if (!activeVideo) return undefined;

    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeVideo();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button, a[href], iframe, video[controls], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo, closeVideo]);

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
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full" aria-hidden="true"></div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8" role="group" aria-label="Filter by category">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <label htmlFor="project-search" className="sr-only">
                Search projects by title, description, or genre
              </label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                <input
                  id="project-search"
                  type="search"
                  placeholder="Search projects by title, description, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="genre-filter" className="sr-only">
                  Filter by genre
                </label>
                <select
                  id="genre-filter"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre === 'All' ? 'All genres' : genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="store-filter" className="sr-only">
                  Filter by store
                </label>
                <select
                  id="store-filter"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                >
                  {stores.map(store => (
                    <option key={store} value={store}>{store === 'All' ? 'All stores' : store}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-500 dark:text-gray-400" aria-hidden="true" />
              <p className="text-gray-700 dark:text-gray-300" role="status" aria-live="polite">
                Showing <span className="font-bold text-blue-700 dark:text-blue-300">{filteredProjects.length}</span> of {categoryProjects.length} projects
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400" aria-hidden="true">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">No projects found</h2>
            <button type="button" onClick={resetFilters} className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
              Reset All Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const storeInfo = getStoreInfo(project.store);
              const IconComponent = iconComponents[storeInfo?.icon] || FaExternalLinkAlt;
              const detail = getAIProjectDetail(project.slug);
              const gameDetail = getGameCaseStudy(project.slug);
              const hasDetail = Boolean(detail || gameDetail);

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-700"
                >
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    {getProjectImage(project)}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

                    {/* Genre Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.genres?.slice(0, 3).map((genre, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-700/95 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Store Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 ${storeInfo?.color?.replace('hover:', '') || 'bg-gray-700'} text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center`}>
                        <IconComponent className="mr-1" size={12} aria-hidden="true" />
                        {project.store}
                      </div>
                    </div>

                    {/* Actions: always visible so they work for keyboard and touch users. */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                      <div className="flex justify-between items-center gap-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 ${storeInfo?.color || 'bg-blue-700'} text-white rounded-lg font-medium transition-colors flex items-center`}
                          aria-label={`Open ${project.name} on ${project.store}`}
                        >
                          <IconComponent className="mr-2" aria-hidden="true" />
                          View on {project.store}
                        </a>

                        {project.videoUrl && (
                          <button
                            type="button"
                            onClick={(event) => openVideo(project, event)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2"
                            aria-label={`Watch the ${project.name} trailer`}
                          >
                            <FaFilm className="w-4 h-4" aria-hidden="true" />
                            <span className="text-sm font-medium hidden sm:inline">Trailer</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {project.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {project.role} • {project.store}
                        </p>
                      </div>
                      {project.featured && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium whitespace-nowrap">
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
                        <div className="flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-1">
                          <FaStar aria-hidden="true" />
                          <span className="ml-1 font-bold">
                            <span className="sr-only">Rated </span>
                            {project.rating}
                            <span className="sr-only"> out of 5</span>
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-center text-green-700 dark:text-green-400 mb-1">
                          <FaDownload aria-hidden="true" />
                          <span className="ml-1 font-bold">{project.downloads}</span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Downloads</div>
                      </div>
                    </div>

                    {hasDetail && (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="mt-auto inline-flex w-full items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-700 to-purple-700 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        See More Details
                      </Link>
                    )}
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

      {/* Video Player Modal - rendered at root level */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-dialog-title"
          onClick={closeVideo}
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="video-dialog-title" className="sr-only">
              {activeVideo.name} trailer
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2 rounded-lg px-2 py-1"
              onClick={closeVideo}
              aria-label="Close trailer"
            >
              <span className="text-sm font-medium">Close</span>
              <FaTimes className="w-5 h-5" aria-hidden="true" />
            </button>
            {(() => {
              let embedUrl = activeVideo.url;
              if (activeVideo.url.includes('youtube.com/watch')) {
                const videoId = new URL(activeVideo.url).searchParams.get('v');
                if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
              } else if (activeVideo.url.includes('youtu.be/')) {
                const videoId = activeVideo.url.split('youtu.be/')[1]?.split('?')[0];
                if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
              } else if (activeVideo.url.includes('drive.google.com') && !activeVideo.url.includes('/preview')) {
                const fileId = activeVideo.url.match(/\/d\/([\w-]+)/)?.[1];
                if (fileId) embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
              }
              const isIframe = embedUrl.includes('youtube.com/embed') || embedUrl.includes('drive.google.com');
              return isIframe ? (
                <iframe
                  src={embedUrl}
                  title={`${activeVideo.name} trailer`}
                  className="w-full aspect-video rounded-lg shadow-2xl"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full rounded-lg shadow-2xl"
                  controls
                  autoPlay
                  playsInline
                  aria-label={`${activeVideo.name} trailer`}
                >
                  <source src={embedUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
