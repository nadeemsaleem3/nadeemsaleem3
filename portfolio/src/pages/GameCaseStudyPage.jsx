import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaArrowRight,
  FaBullseye,
  FaTools,
  FaChartLine,
  FaCode,
  FaCheckCircle,
} from 'react-icons/fa';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const SectionHeading = ({ icon: Icon, eyebrow, title, description }) => (
  <div className="mb-8 md:mb-10">
    <div className="flex items-center gap-3 mb-3">
      <span
        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-purple-700 text-white flex items-center justify-center shadow-lg"
        aria-hidden="true"
      >
        <Icon />
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
        {eyebrow}
      </span>
    </div>
    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
        {description}
      </p>
    )}
  </div>
);

const GameCaseStudyPage = ({ project }) => {
  const BASE_URL = import.meta.env.BASE_URL;
  const imageSrc = project.image
    ? `${BASE_URL}${project.image.replace(/^\//, '')}`
    : project.imageFallback;

  const facts = [
    { label: 'Platform', value: project.platform },
    { label: 'Genre', value: project.genre },
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.team },
    { label: 'Scale', value: project.scale },
    { label: 'Rating', value: project.rating },
  ];

  useDocumentMeta({
    title: `${project.name} Case Study - Nadeem Saleem`,
    description: project.tagline,
    ogTitle: `${project.name} Case Study - Nadeem Saleem`,
    ogType: 'article',
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
          >
            <FaArrowLeft className="mr-2" aria-hidden="true" /> Back to all projects
          </Link>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.accentSoft}`}>
                  {project.genre}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-200">
                  {project.platform}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {project.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {project.tagline}
              </p>

              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-8">
                {project.role} · {project.scale} · {project.rating}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${project.accent} text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900`}
                >
                  <FaExternalLinkAlt className="mr-2" aria-hidden="true" /> Open on {project.store}
                </a>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  More projects <FaArrowRight className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className={`absolute -inset-3 bg-gradient-to-tr ${project.accent} rounded-3xl opacity-20 blur-2xl`} aria-hidden="true" />
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-2xl">
                <img
                  src={imageSrc}
                  alt={`${project.name} store artwork`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = project.imageFallback;
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* At a glance */}
          <motion.dl
            {...fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
                  {fact.label}
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Context */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaBullseye}
              eyebrow="Context"
              title="What the game is"
            />
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              {project.context}
            </p>
          </motion.section>

          {/* Challenge */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaTools}
              eyebrow="Challenge"
              title="The hardest part"
            />
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              {project.challenge}
            </p>
          </motion.section>

          {/* What I did */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaCode}
              eyebrow="What I did"
              title="My contribution, end to end"
            />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.actions.map((action) => (
                <li
                  key={action}
                  className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm"
                >
                  <FaCheckCircle className={`mt-1 flex-shrink-0 ${project.accentText}`} aria-hidden="true" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {action}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Result */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaChartLine}
              eyebrow="Result"
              title="What shipped"
            />
            <ul className="space-y-3">
              {project.results.map((result) => (
                <li
                  key={result}
                  className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm"
                >
                  <FaCheckCircle className={`mt-1 flex-shrink-0 ${project.accentText}`} aria-hidden="true" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {result}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Stack */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading icon={FaCode} eyebrow="Stack" title="Tools and systems" />
            <ul className="flex flex-wrap gap-3">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 p-8 md:p-10 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Want the full picture?
            </h2>
            <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
              Browse the rest of the portfolio or get in touch to talk about Unity,
              mobile performance, and shipped games.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                All projects <FaArrowRight className="ml-2" aria-hidden="true" />
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GameCaseStudyPage;
