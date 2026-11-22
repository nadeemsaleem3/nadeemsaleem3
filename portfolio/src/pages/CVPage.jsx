import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from 'react-icons/fa';
import { cvData, normalizeSkills } from '../data/helpers';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const Section = ({ id, title, children }) => (
  <section aria-labelledby={`${id}-heading`} className="mb-10">
    <h2
      id={`${id}-heading`}
      className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white border-b-2 border-blue-600 dark:border-blue-400 pb-2 mb-5"
    >
      {title}
    </h2>
    {children}
  </section>
);

const CVPage = () => {
  const {
    personal_info: personal,
    professional_summary: summary,
    technical_skills: technicalSkills,
    work_experience: workExperience,
    education,
    certifications,
    core_competencies: coreCompetencies,
    availability,
  } = cvData;

  const skillGroups = normalizeSkills(technicalSkills);
  const cvUrl = `${import.meta.env.BASE_URL}Nadeem_Saleem_CV.pdf`;

  useDocumentMeta({
    title: 'CV - Nadeem Saleem | Senior Unity Developer',
    description:
      'Accessible HTML CV of Nadeem Saleem, Senior Unity Developer with 8+ years of experience shipping mobile games. Available as HTML and PDF.',
    ogTitle: 'CV - Nadeem Saleem | Senior Unity Developer',
  });

  const contactLinks = [
    {
      icon: <FaEnvelope aria-hidden="true" />,
      label: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: <FaPhone aria-hidden="true" />,
      label: personal.phone,
      href: `tel:${personal.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: <FaMapMarkerAlt aria-hidden="true" />,
      label: personal.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personal.location)}`,
    },
    {
      icon: <FaLinkedin aria-hidden="true" />,
      label: 'linkedin.com/in/nadeemsaleem',
      href: personal.linkedin,
    },
    {
      icon: <FaGithub aria-hidden="true" />,
      label: 'github.com/nadeemsaleem3',
      href: personal.github,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-16 print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Page header / actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 print:hidden"
        >
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <FaArrowLeft className="mr-2" aria-hidden="true" /> Back to home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Curriculum Vitae
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                This page is the primary, screen-reader-friendly version of my CV. A PDF
                copy is available if you need a file to forward or print.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={cvUrl}
                download="Nadeem_Saleem_CV.pdf"
                className="inline-flex items-center px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors"
              >
                <FaDownload className="mr-2" aria-hidden="true" /> Download PDF
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center px-5 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <FaPrint className="mr-2" aria-hidden="true" /> Print this page
              </button>
            </div>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Curriculum Vitae of Nadeem Saleem"
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6 md:p-10 print:shadow-none print:border-0 print:p-0"
        >
          {/* Identity */}
          <header className="mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
              {personal.name}
            </h2>
            <p className="mt-2 text-lg text-blue-800 dark:text-blue-300 font-medium">
              {personal.title}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              {contactLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className="text-blue-700 dark:text-blue-300">{item.icon}</span>
                  <a
                    href={item.href}
                    className="hover:text-blue-700 dark:hover:text-blue-300 underline-offset-2 hover:underline break-all"
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {availability && (
              <div className="mt-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-4 text-sm text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-1">Availability</p>
                <p>
                  {availability.open_to}. {availability.work_mode}.{' '}
                  {availability.work_authorization}.
                </p>
              </div>
            )}
          </header>

          <Section id="summary" title="Professional Summary">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
          </Section>

          {coreCompetencies?.length > 0 && (
            <Section id="competencies" title="Core Competencies">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                {coreCompetencies.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-700 dark:text-blue-300 mt-1" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section id="skills" title="Technical Skills">
            <dl className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                    {group.category}
                  </dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-300">
                    {group.skills.join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="experience" title="Professional Experience">
            <ol className="space-y-8">
              {workExperience.map((job) => (
                <li key={`${job.company}-${job.period}`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                      {job.position}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {job.period}
                    </p>
                  </div>
                  <p className="text-blue-800 dark:text-blue-300 font-medium mt-1">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ''}
                  </p>
                  <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className="text-blue-700 dark:text-blue-300 mt-1"
                          aria-hidden="true"
                        >
                          •
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="education" title="Education">
            <ul className="space-y-5">
              {education.map((item) => (
                <li key={`${item.degree}-${item.institution}`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-base font-heading font-bold text-gray-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {item.period}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.institution}
                    {item.cgpa ? ` · CGPA ${item.cgpa}` : ''}
                  </p>
                  {item.focus && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Focus: {item.focus}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          {certifications?.length > 0 && (
            <Section id="certifications" title="Certifications">
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.credential_id || cert.name}>
                    <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer} · {cert.date}
                      {cert.credential_id ? ` · ID ${cert.credential_id}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </motion.article>

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center print:hidden">
          <FaGlobe className="inline mr-2" aria-hidden="true" />
          Prefer a file? Use the <strong>Download PDF</strong> button above. If the PDF does
          not work for your assistive technology, this HTML page contains the same content.
        </p>
      </div>
    </div>
  );
};

export default CVPage;
