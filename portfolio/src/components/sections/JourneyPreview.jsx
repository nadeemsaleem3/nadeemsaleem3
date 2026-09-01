import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPaintBrush, FaLaptopCode, FaBrain, FaArrowRight } from 'react-icons/fa';

const highlights = [
  { icon: <FaPaintBrush />, label: 'Visual Artist' },
  { icon: <FaLaptopCode />, label: 'Unity Developer' },
  { icon: <FaBrain />, label: 'AI Engineer' },
];

const JourneyPreview = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left: Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">My Journey</h2>
              <p className="opacity-90 leading-relaxed text-sm md:text-base mb-6">
                I started as a commercial visual artist creating hand-painted banners and outdoor advertising across Pakistan. After years of field work and formal education in commerce and IT, I moved into Unity development and spent the next decade shipping 50+ games and interactive projects. Today I am adding artificial intelligence to this foundation, building the bridge between physical commerce, 3D environments, and intelligent systems.
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyPreview;
