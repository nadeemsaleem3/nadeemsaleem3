import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaRocket, FaUsers, FaChartLine } from 'react-icons/fa';
import { cvData } from '../../data/helpers';

const About = () => {
  const { professional_summary, core_competencies } = cvData;

  const competencies = [
    {
      icon: <FaGamepad />,
      title: 'Gameplay Programming',
      description: 'Casual, Hyper-Casual, Puzzle, RPG/RTS exposure',
      color: 'bg-purple-500',
    },
    {
      icon: <FaRocket />,
      title: 'Mobile Optimization',
      description: 'IL2CPP, GPU optimization, memory profiling',
      color: 'bg-blue-500',
    },
    {
      icon: <FaUsers />,
      title: 'Team Leadership',
      description: 'Mentoring junior developers, code reviews',
      color: 'bg-green-500',
    },
    {
      icon: <FaChartLine />,
      title: 'Monetization & Analytics',
      description: 'Unity Ads, IAP, Firebase Analytics, KPIs',
      color: 'bg-orange-500',
    },
  ];

  return (
    <section id="about" className="section-container bg-gray-50 dark:bg-slate-800/50 rounded-3xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="section-heading">About Me</h2>
          <p className="section-subheading">
            Senior Unity Developer with a passion for creating engaging gaming experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {professional_summary}
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Core Competencies
              </h3>
              <ul className="space-y-2">
                {core_competencies.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Competencies Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {competencies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700"
              >
                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Beyond Code</h3>
              <p className="opacity-90">
                When I'm not developing games, I'm exploring AI technologies, playing cricket, or cycling through new trails.
              </p>
            </div>
            <div className="flex space-x-4 mt-6 md:mt-0">
              {cvData.interests.map((interest, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;