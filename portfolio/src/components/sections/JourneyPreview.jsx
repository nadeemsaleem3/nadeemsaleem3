import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPaintBrush, FaLaptopCode, FaBrain, FaArrowRight } from 'react-icons/fa';
import { cvData } from '../../data/helpers';

const highlights = [
  { icon: <FaPaintBrush />, label: 'Visual Artist' },
  { icon: <FaLaptopCode />, label: 'Unity Developer' },
  { icon: <FaBrain />, label: 'AI Engineer' },
];

const JourneyPreview = () => {
  const { journey } = cvData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-3xl p-8 text-white mt-12"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{journey.title}</h2>
      <p className="opacity-90 leading-relaxed text-sm md:text-base mb-6">
        {journey.teaser}
      </p>

      {/* Timeline Icons */}
      <div className="flex items-center gap-4 mb-6">
        {highlights.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {i < highlights.length - 1 && (
              <div className="w-8 h-0.5 bg-white/40 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>

      <Link
        to="/journey"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
      >
        <span>Read the full story</span>
        <FaArrowRight />
      </Link>
    </motion.div>
  );
};

export default JourneyPreview;
