import React from 'react';
import { motion } from 'framer-motion';
import { FaUnity, FaCode, FaMobileAlt, FaChartBar, FaServer, FaCogs, FaRobot, FaLayerGroup } from 'react-icons/fa';
import { normalizeSkills } from '../../data/helpers';

const Skills = () => {
  const skillCategories = normalizeSkills({
    engine: 'Unity3D · URP · ShaderGraph · Addressables · ScriptableObjects · Object Pooling · IL2CPP · DOTS (familiar)',
    languages: 'C# · C++ · Python · JavaScript',
    mobile: 'Android & iOS — full App Store / Play Store publishing, compliance & build automation',
    performance: 'Mobile GPU optimisation · memory profiling · IL2CPP · asset bundling · CI/CD for Unity',
    multiplayer: 'Photon Engine · Firebase Realtime DB · prototype-level (2 prototypes built)',
    monetization: 'Unity Ads · AdMob · IAP · KPI-driven monetisation · Firebase & Unity Analytics',
    architecture: 'SOLID · MVC · Design Patterns · Modular Systems · Plugin Development · Git workflows',
    ai_ml: 'Agentic AI · Procedural Generation · Intelligent NPCs (MSAIE active) · REST APIs',
  });

  const categoryIcons = {
    ENGINE: <FaUnity />,
    LANGUAGES: <FaCode />,
    MOBILE: <FaMobileAlt />,
    PERFORMANCE: <FaChartBar />,
    MULTIPLAYER: <FaServer />,
    MONETIZATION: <FaCogs />,
    ARCHITECTURE: <FaLayerGroup />,
    AI_ML: <FaRobot />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="section-heading">Technical Skills</h2>
          <p className="section-subheading">
            A comprehensive toolkit for building high-performance, scalable games and applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                  {categoryIcons[category.category] || <FaCode />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Levels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Proficiency Focus
          </h3>
          <div className="space-y-6">
            {[
              { skill: 'Unity3D & Game Development', level: 95, color: 'bg-blue-500' },
              { skill: 'Mobile Optimization (Android/iOS)', level: 90, color: 'bg-green-500' },
              { skill: 'C# & Software Architecture', level: 88, color: 'bg-purple-500' },
              { skill: 'Team Leadership & Mentoring', level: 85, color: 'bg-orange-500' },
              { skill: 'AI/ML Integration in Games', level: 75, color: 'bg-pink-500' },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{item.skill}</span>
                  <span className="font-bold text-gray-800 dark:text-white">{item.level}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;