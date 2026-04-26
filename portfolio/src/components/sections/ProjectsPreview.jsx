import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedProjects, getStoreInfo } from '../../data/helpers';
import { FaExternalLinkAlt, FaGooglePlay, FaApple, FaAmazon, FaVideo } from 'react-icons/fa';

const ProjectsPreview = () => {
  const featuredProjects = getFeaturedProjects();
  
  // React Icons mapping
  const iconComponents = {
    FaGooglePlay,
    FaApple,
    FaAmazon,
    FaExternalLinkAlt,
    FaVideo
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A selection of mobile games and applications I've developed, with millions of downloads across Android and iOS platforms.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => {
            const storeInfo = getStoreInfo(project.store);
            const IconComponent = iconComponents[storeInfo.icon] || FaExternalLinkAlt;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-700"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || '/images/projects/placeholder.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Genre Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.genres.slice(0, 2).map((genre, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  {/* Downloads Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.downloads}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {project.platform} • {project.year}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg ${storeInfo.color.replace('hover:', '')} flex items-center justify-center text-white`}>
                      <IconComponent />
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(project.rating) ? 'fill-current' : 'fill-gray-300 dark:fill-gray-600'}`}
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {project.rating} ({project.reviews} reviews)
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/projects#${project.id}`}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                    
                    <div className="flex space-x-2">
                      {project.video && (
                        <a
                          href={project.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                          title="Watch trailer"
                        >
                          <FaVideo />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 ${storeInfo.color} text-white rounded-lg font-medium transition-colors flex items-center`}
                      >
                        <IconComponent className="mr-2" />
                        {storeInfo.label}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Projects ({getFeaturedProjects().length}+)
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Explore all {getFeaturedProjects().length}+ projects with detailed descriptions, screenshots, and technical insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsPreview;