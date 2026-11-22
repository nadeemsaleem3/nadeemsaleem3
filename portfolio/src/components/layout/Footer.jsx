import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';
import { cvData } from '../../data/helpers';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { email, linkedin, github } = cvData.personal_info;
  const availability = cvData.availability;

  const socialLinks = [
    {
      icon: <FaEnvelope aria-hidden="true" />,
      label: 'Email',
      href: `mailto:${email}`,
      color: 'bg-red-600 hover:bg-red-700',
      external: false,
    },
    {
      icon: <FaLinkedin aria-hidden="true" />,
      label: 'LinkedIn',
      href: linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      external: true,
    },
    {
      icon: <FaGithub aria-hidden="true" />,
      label: 'GitHub',
      href: github,
      color: 'bg-gray-800 hover:bg-gray-900',
      external: true,
    },
  ];

  const legalLinks = [
    { to: '/privacy', label: 'Privacy' },
    { to: '/accessibility', label: 'Accessibility' },
    { to: '/imprint', label: 'Imprint' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-heading font-bold text-gray-800 dark:text-white mb-2">
              Nadeem Saleem
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Senior Unity Developer & AI Engineering student passionate about creating
              immersive games and intelligent systems.
            </p>
            {availability && (
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 max-w-md">
                Open to {availability.open_to} — {availability.work_mode}.
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`${link.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-300 dark:border-slate-700" />

        {/* Legal links */}
        <nav aria-label="Legal" className="mb-6">
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-2 hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
          <p className="mb-4 md:mb-0">
            © {currentYear} Nadeem Saleem. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-red-600 mx-1"
              aria-hidden="true"
            >
              <FaHeart />
            </motion.span>
            <span>using React, Tailwind CSS & Framer Motion</span>
          </div>
          <p className="mt-4 md:mt-0">
            <a
              href={`mailto:${email}`}
              className="text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
            >
              {email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
