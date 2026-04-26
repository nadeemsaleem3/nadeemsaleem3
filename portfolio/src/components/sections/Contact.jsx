import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../../data/helpers';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const personalInfo = cvData.personal_info;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactItems = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: personalInfo.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      value: 'nadeemsaleem',
      link: personalInfo.linkedin,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      value: 'nadeemsaleem3',
      link: personalInfo.github,
      color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Interested in collaborating or have a project in mind? Feel free to reach out through any of the channels below.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.title === 'Email' || item.title === 'Phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {item.value}
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border border-blue-100 dark:border-slate-700"
            >
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Availability
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I'm currently open to new opportunities and collaborations. Whether it's a full-time role, contract work, or just a technical discussion, I'd love to connect.
              </p>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                <span className="text-green-700 dark:text-green-400 font-medium">
                  Available for new projects
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-green-800 dark:text-green-300 font-medium">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-3" />
                    Send Message
                  </>
                )}
              </motion.button>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                I typically respond within 24 hours. For urgent matters, please call or use LinkedIn.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;