import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';
import { cvData } from '../../data/helpers';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { email, linkedin, github } = cvData.personal_info;

  const socialLinks = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      href: `mailto:${email}`,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: github,
      color: 'bg-gray-800 hover:bg-gray-900',
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-heading font-bold text-gray-800 dark:text-white mb-2">
              Nadeem Saleem
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Senior Unity Developer & AI Engineering student passionate about creating immersive games and intelligent systems.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
          <p className="mb-4 md:mb-0">
            © {currentYear} Nadeem Saleem. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-red-500 mx-1"
            >
              <FaHeart />
            </motion.span>
            <span>using React, Tailwind CSS & Framer Motion</span>
          </div>
          <p className="mt-4 md:mt-0">
            <a
              href="mailto:nadeemsaleem.bwp@gmail.com"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              nadeemsaleem.bwp@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;