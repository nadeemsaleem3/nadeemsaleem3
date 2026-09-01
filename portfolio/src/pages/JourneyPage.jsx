import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaPaintBrush, FaLaptopCode, FaGraduationCap, FaBrain, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const milestones = [
  {
    icon: <FaPaintBrush />,
    period: 'Early 2000s – 2016',
    title: 'Commercial Visual Artist',
    description:
      'Created handwritten and screen-printed banners, board writing, name plates, wall chalking, and outdoor advertising. Travelled extensively across Punjab, Sindh, Khyber Pakhtunkhwa, and Azad Jammu & Kashmir — learning to understand clients, adapt to different markets, manage logistics under pressure, and deliver visual communication that worked in the real world.',
    color: 'bg-orange-500',
  },
  {
    icon: <FaGraduationCap />,
    period: '2005 – 2016',
    title: 'Formal Education',
    description:
      'Completed Matric, D.Com, and B.Com in commerce between 2005 and 2010. Later earned a Master\'s in Information Technology from the Virtual University of Pakistan (2014–2016) — all funded through my own earnings.',
    color: 'bg-green-500',
  },
  {
    icon: <FaLaptopCode />,
    period: '2016 – Present',
    title: 'Unity Developer & Game Designer',
    description:
      'Made a deliberate transition from physical media to digital environments. Over the following decade designed, developed, and shipped more than 50 games and interactive projects that collectively reached multi-million downloads. The same discipline learned while painting walls and boards — composition, clarity, client focus, and reliable delivery — became the foundation for building three-dimensional virtual worlds.',
    color: 'bg-blue-500',
  },
  {
    icon: <FaBrain />,
    period: '2026',
    title: 'MSAIE Scholarship – Quantic School of Business and Technology',
    description:
      'Awarded a fully funded scholarship for the MSAIE program. My aim is to add artificial intelligence to everything I have built so far — combining commercial understanding, long-form Unity production experience, and AI systems to create intelligent spatial experiences for games, simulations, digital twins, and other immersive applications.',
    color: 'bg-purple-500',
  },
];

const JourneyPage = () => {
  return (
    <>
      <Helmet>
        <title>My Journey - Nadeem Saleem</title>
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
              My <span className="text-blue-500 dark:text-blue-400">Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              From paint and brushes to Unity and AI — a path shaped by discipline, self-reliance, and a constant drive to build things that are clear, functional, and useful.
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
              I come from a modest family background. After Matric, my parents told me they could no longer support my further education, so I began working and funded my own studies and living expenses. All of my early education was completed in government institutions. These circumstances shaped my discipline and self-reliance from an early age.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
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
                        {milestone.icon}
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
              I am not only a technical developer. I am someone who has moved step by step from limited resources and physical street work to virtual environments and now into intelligent systems — always with the same focus: building things that are clear, functional, and useful through my own effort.
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
