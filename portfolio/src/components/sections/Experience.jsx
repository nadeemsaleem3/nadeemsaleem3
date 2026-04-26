import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../../data/helpers';
import TimelineItem from '../ui/TimelineItem';

const Experience = () => {
  const experiences = cvData.work_experience || [];

  return (
    <section id="experience" className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900">
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
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Over 8 years of professional game development experience across multiple studios, 
            shipping 15+ mobile titles with millions of downloads.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line for mobile - left aligned */}
          <div className="md:hidden absolute left-3 top-0 w-0.5 h-full bg-gray-300 dark:bg-slate-700 -z-10" />

          {/* Vertical line for desktop - centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 -z-10" />

          {/* Timeline Items */}
          <div className="space-y-0">
            {experiences.map((exp, index) => {
              // Alternate sides for desktop: even indices on left, odd on right
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <TimelineItem
                  key={index}
                  item={exp}
                  index={index}
                  type="experience"
                  side={side}
                />
              );
            })}
          </div>

          {/* Timeline End Marker */}
          <div className="hidden md:flex justify-center mt-12">
            <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-slate-900"></div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2 ml-4">
              Present
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
