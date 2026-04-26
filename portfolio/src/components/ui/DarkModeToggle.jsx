import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 p-1 flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-white dark:bg-yellow-300 shadow-md"
        animate={{ x: theme === 'light' ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <FaSun className="w-3 h-3 text-yellow-500" />
        <FaMoon className="w-3 h-3 text-blue-300" />
      </div>
    </motion.button>
  );
};

export default DarkModeToggle;