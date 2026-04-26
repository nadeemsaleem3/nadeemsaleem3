import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../../data/helpers';
import TimelineItem from '../ui/TimelineItem';

const Education = () => {
  const education = cvData.education || [];

  return (
    <section id="education" className="py-16 md:py-24 bg-white dark:bg-slate-800">
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
            Education & Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Academic background and professional certifications that complement my technical expertise.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line for mobile - left aligned */}
          <div className="md:hidden absolute left-3 top-0 w-0.5 h-full bg-gray-300 dark:bg-slate-700 -z-10" />

          {/* Vertical line for desktop - centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 -z-10"></div>

          {/* Timeline Items */}
          <div className="space-y-0">
            {education.map((edu, index) => {
              // Alternate sides for desktop: even indices on left, odd on right
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <TimelineItem
                  key={index}
                  item={edu}
                  index={index}
                  type="education"
                  side={side}
                />
              );
            })}
          </div>
        </div>

        {/* Certifications Section */}
        {cvData.certifications && cvData.certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {cert.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {cert.date}
                        </span>
                        {cert.credential_id && (
                          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded">
                            ID: {cert.credential_id}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interests Section */}
        {cvData.interests && cvData.interests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Personal Interests
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cvData.interests.map((interest, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 text-gray-800 dark:text-gray-200 rounded-full border border-blue-100 dark:border-slate-600 shadow-sm"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Education;