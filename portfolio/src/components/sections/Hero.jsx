import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowRight, FaDownload, FaGamepad } from 'react-icons/fa';
import { cvData } from '../../data/helpers';

const Hero = () => {
  const { name, title, location } = cvData.personal_info;
  const { professional_summary } = cvData;

  return (
    <section className="section-container pt-24 md:pt-32">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm <span className="text-blue-500 dark:text-blue-400">{name}</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              <span className="font-medium">{title}</span>
              <span className="mx-2">•</span>
              <span>{location}</span>
            </div>
          </motion.div>

          {/* Typewriter Tagline */}
          <div className="mb-8 h-20 md:h-24">
            <div className="font-mono text-lg md:text-xl text-gray-700 dark:text-gray-300">
              <TypeAnimation
                sequence={[
                  professional_summary.substring(0, 126) + '...',
                  2000,
                  'Building immersive games with Unity3D & AI.',
                  1500,
                  'Optimizing mobile performance for millions of users.',
                  1500,
                  'Leading teams to ship successful titles.',
                  1500,
                ]}
                speed={50}
                deletionSpeed={40}
                repeat={Infinity}
                className="typewriter-caret"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              to="/projects"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <span>View Projects</span>
              <FaGamepad />
            </Link>
            <Link
              to="/cv"
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <span>View CV</span>
              <FaDownload />
            </Link>
            <a
              href="#contact"
              className="px-6 py-3 bg-transparent text-blue-500 dark:text-blue-400 hover:underline font-medium rounded-lg flex items-center justify-center space-x-2"
            >
              <span>Get in Touch</span>
              <FaArrowRight />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">8+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Games Shipped</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">5M+</div>
              <div className="text-gray-600 dark:text-gray-400">Downloads</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="lg:w-1/2 flex justify-center"
        >
          <div className="relative">
            {/* Circular Photo Container */}
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
             <img
                src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                alt="Nadeem Saleem"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 bg-blue-500 text-white p-4 rounded-2xl shadow-xl"
            >
              <div className="text-sm font-bold">Unity Expert</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-4 rounded-2xl shadow-xl"
            >
              <div className="text-sm font-bold">AI Engineering</div>
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute -inset-8 border-4 border-dashed border-blue-300 dark:border-blue-700 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;