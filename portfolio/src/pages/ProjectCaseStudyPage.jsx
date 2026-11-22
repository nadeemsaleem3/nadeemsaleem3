import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaBullseye,
  FaTools,
  FaChartLine,
  FaSitemap,
  FaCode,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import { getAIProjectDetail } from '../data/aiProjectDetails';
import { getGameCaseStudy } from '../data/gameCaseStudies';
import GameCaseStudyPage from './GameCaseStudyPage';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 }
};

const SectionHeading = ({ icon: Icon, eyebrow, title, description }) => (
  <div className="mb-8 md:mb-10">
    <div className="flex items-center gap-3 mb-3">
      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
        <Icon />
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
        {eyebrow}
      </span>
    </div>
    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
        {description}
      </p>
    )}
  </div>
);

const ProjectCaseStudyPage = () => {
  const { slug } = useParams();
  const gameProject = getGameCaseStudy(slug);
  const project = getAIProjectDetail(slug);
  const BASE_URL = import.meta.env.BASE_URL;

  useDocumentMeta({
    title: (gameProject || project)
      ? `${(gameProject || project).name} Case Study - Nadeem Saleem`
      : 'Project not found - Nadeem Saleem',
    description:
      (gameProject || project)?.summary ||
      (gameProject || project)?.tagline ||
      'The requested case study could not be found.',
    ogType: 'article',
  });

  if (gameProject) {
    return <GameCaseStudyPage project={gameProject} />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Project not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The case study you are looking for does not exist or has moved.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
          >
            <FaArrowLeft className="mr-2" /> Back to all projects
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
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300">
                  {project.type}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {project.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {project.tagline}
              </p>

              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
                {project.role}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${project.accent} text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity`}
                >
                  <FaExternalLinkAlt className="mr-2" /> Open live app
                </a>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  More projects <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className={`absolute -inset-3 bg-gradient-to-tr ${project.accent} rounded-3xl opacity-20 blur-2xl`} />
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-2xl">
                <img
                  src={project.imageFallback || `${BASE_URL}images/projects/game-placeholder.png`}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `${BASE_URL}images/projects/game-placeholder.png`;
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* At a glance */}
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {project.atAGlance.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 text-center shadow-sm"
              >
                <div className={`text-2xl md:text-3xl font-heading font-bold ${project.accentText}`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Summary */}
          <motion.div
            {...fadeUp}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 md:p-8 mb-16 shadow-sm"
          >
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.summary}
            </p>
          </motion.div>

          {/* The requirement */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaBullseye}
              eyebrow="The requirement"
              title="What the project had to solve"
              description={project.requirement.intro}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.requirement.items.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* What was built */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaTools}
              eyebrow="What was built"
              title="The solution, end to end"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.solution.map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm"
                >
                  <FaCheckCircle className={`mb-3 ${project.accentText}`} />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* XYZ accomplishments */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaChartLine}
              eyebrow="Accomplishments"
              title="Measured outcomes, in XYZ form"
              description="Each result follows the formula: Accomplished [X] as measured by [Y], by doing [Z]."
            />
            <div className="space-y-4">
              {project.achievements.map((item, index) => (
                <motion.div
                  key={item.headline}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 md:p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {item.headline}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'X', label: 'Accomplished', value: item.x },
                      { key: 'Y', label: 'As measured by', value: item.y },
                      { key: 'Z', label: 'By doing', value: item.z }
                    ].map((part) => (
                      <div
                        key={part.key}
                        className="rounded-lg bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-700"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${project.accentSoft}`}>
                            {part.key}
                          </span>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {part.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {part.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Architecture */}
          <motion.section {...fadeUp} className="mb-16">
            <SectionHeading
              icon={FaSitemap}
              eyebrow="Architecture"
              title="How the pieces fit together"
              description={project.architecture.summary}
            />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-3">
                {project.architecture.flow.map((step, index) => (
                  <div key={step.title} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${project.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                        {index + 1}
                      </span>
                      {index < project.architecture.flow.length - 1 && (
                        <span className="w-px flex-1 bg-gray-300 dark:bg-slate-600 my-1" />
                      )}
                    </div>
                    <div className="pb-5">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm h-fit">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Key engineering decisions
                </h3>
                <ul className="space-y-3">
                  {project.architecture.decisions.map((decision) => (
                    <li key={decision} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      <FaCheckCircle className={`mt-0.5 flex-shrink-0 ${project.accentText}`} />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Stack + evaluation */}
          <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <FaCode className={project.accentText} />
                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                  Tech stack
                </h2>
              </div>
              <div className="space-y-4">
                {project.stack.map((group) => (
                  <div key={group.group}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      {group.group}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <FaChartLine className={project.accentText} />
                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                  Evaluation
                </h2>
              </div>
              <dl className="divide-y divide-gray-100 dark:divide-slate-700">
                {project.evaluation.map((row) => (
                  <div key={row.label} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:w-2/5">
                      {row.label}
                    </dt>
                    <dd className="text-sm text-gray-700 dark:text-gray-300 sm:w-3/5">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className={`rounded-2xl bg-gradient-to-r ${project.accent} p-8 md:p-10 text-center text-white shadow-xl`}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Try {project.name} live
            </h2>
            <p className="text-white/85 mb-6 max-w-2xl mx-auto">
              The deployed application is publicly accessible. Free-tier hosting may take a moment to wake from a cold start.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" /> Open live app
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-white/15 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/25 transition-colors"
              >
                Back to all projects
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectCaseStudyPage;
