import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const TimelineItem = ({ item, index, type = 'experience', side = 'left' }) => {
  const isExperience = type === 'experience';
  const Icon = isExperience ? FaBriefcase : FaGraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* === MOBILE LAYOUT: Dot on left, content on right === */}
      <div className="flex md:hidden items-start">
        {/* Left: Timeline line + dot */}
        <div className="flex flex-col items-center mr-4">
          <div className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-slate-900 z-10 flex-shrink-0" />
          <div className="w-0.5 flex-1 bg-gray-300 dark:bg-slate-700" />
        </div>

        {/* Right: Content Card */}
        <div className="flex-1 pb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {isExperience ? item.position : item.degree}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isExperience ? item.company : item.institution}
                  {item.location && ` • ${item.location}`}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {item.period}
              </span>
              {item.cgpa && (
                <span className="ml-2 inline-block px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  GPA: {item.cgpa}
                </span>
              )}
            </div>

            {isExperience && item.responsibilities && (
              <ul className="space-y-2">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            )}

            {!isExperience && item.focus && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Focus:</span> {item.focus}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* === DESKTOP LAYOUT: Alternating left/right === */}
      <div className={`hidden md:flex ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
        {/* Content Card */}
        <div className={`w-5/12 ${side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 ${side === 'left' ? 'md:order-2' : ''}`}>
                <Icon />
              </div>
              <div className={`flex-1 ${side === 'left' ? 'md:text-right' : ''}`}>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {isExperience ? item.position : item.degree}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {isExperience ? item.company : item.institution}
                  {item.location && ` • ${item.location}`}
                </p>
              </div>
            </div>

            {isExperience && item.responsibilities && (
              <ul className="space-y-2">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className={`flex items-start space-x-2 text-gray-700 dark:text-gray-300 ${side === 'left' ? 'md:justify-end' : ''}`}>
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            )}

            {!isExperience && item.focus && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Focus:</span> {item.focus}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Center: Dot */}
        <div className="w-2/12 flex justify-center">
          <div className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-slate-900 z-10" />
        </div>

        {/* Date on opposite side */}
        <div className={`w-5/12 ${side === 'left' ? 'pl-12' : 'pr-12 text-right'}`}>
          <div className="text-gray-500 dark:text-gray-400 font-medium">
            {item.period}
          </div>
          {item.cgpa && (
            <div className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {item.cgpa}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
