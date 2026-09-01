import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaPaintBrush, FaLaptopCode, FaGraduationCap, FaBrain, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cvData } from '../data/helpers';

const iconMap = {
  'bg-orange-500': <FaPaintBrush />,
  'bg-green-500': <FaGraduationCap />,
  'bg-blue-500': <FaLaptopCode />,
  'bg-purple-500': <FaBrain />,
};

const JourneyPage = () => {
  const { journey } = cvData;

  return (
    <>
      <Helmet>
        <title>{journey.title} - Nadeem Saleem</title>
        <meta name="description" content="From paint and brushes to Unity and AI — the professional journey of Nadeem Saleem." />
      </Helmet>

      <section className="section-container pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {journey.title.split(' ').map((word, i) =>
                word === 'Journey' ? (
                  <span key={i} className="text-blue-500 dark:text-blue-400">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {journey.subtitle}
            </p>
          </motion.div>

          {/* Origin Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 mb-16"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
              {journey.origin}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2" />

            {journey.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500 transform -translate-x-1/2 z-10 mt-6" />

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`${milestone.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                        {iconMap[milestone.color]}
                      </div>
                      <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
                        {milestone.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              {journey.closing}
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <span>See My Work</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default JourneyPage;
