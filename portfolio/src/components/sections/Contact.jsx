import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { cvData } from '../../data/helpers';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '', // Honeypot field. Real users never fill this.
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const consentRef = useRef(null);
  const statusRef = useRef(null);

  const personalInfo = cvData.personal_info;
  const availability = cvData.availability;

  useEffect(() => {
    if (submitStatus) {
      statusRef.current?.focus();
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '', company: '' });
    setConsent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Silently reject bots that fill the hidden field.
    if (formData.company) {
      setSubmitStatus('success');
      resetForm();
      return;
    }

    if (!consent) {
      setSubmitStatus('consent');
      consentRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error(
          'EmailJS credentials not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env'
        );
        setSubmitStatus('error');
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          consent: 'yes',
        },
        publicKey
      );

      setSubmitStatus('success');
      resetForm();
    } catch (err) {
      console.error('Email send failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: <FaEnvelope aria-hidden="true" />,
      title: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    },
    {
      icon: <FaPhone aria-hidden="true" />,
      title: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    },
    {
      icon: <FaMapMarkerAlt aria-hidden="true" />,
      title: 'Location',
      value: personalInfo.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    },
    {
      icon: <FaLinkedin aria-hidden="true" />,
      title: 'LinkedIn',
      value: 'nadeemsaleem',
      link: personalInfo.linkedin,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    },
    {
      icon: <FaGithub aria-hidden="true" />,
      title: 'GitHub',
      value: 'nadeemsaleem3',
      link: personalInfo.github,
      color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    },
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
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Interested in collaborating or have a project in mind? Feel free to reach out
            through any of the channels below.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full" aria-hidden="true"></div>
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
                  key={item.title}
                  href={item.link}
                  target={item.title === 'Email' || item.title === 'Phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform`}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {item.value}
                    </p>
                  </div>
                  <div className="text-gray-500 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" aria-hidden="true">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
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
                I&apos;m currently open to new opportunities and collaborations. Whether
                it&apos;s a full-time role, contract work, or just a technical discussion,
                I&apos;d love to connect.
              </p>
              {availability && (
                <dl className="mb-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">Open to</dt>
                    <dd>{availability.open_to}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">Work mode</dt>
                    <dd>{availability.work_mode}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">Time zone</dt>
                    <dd>{availability.timezone} — about four hours of overlap with CET/CEST.</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">Work authorization</dt>
                    <dd>{availability.work_authorization}</dd>
                  </div>
                </dl>
              )}
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-600 mr-3 animate-pulse" aria-hidden="true"></div>
                <span className="text-green-800 dark:text-green-300 font-medium">
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

            <form onSubmit={handleSubmit} className="relative space-y-6" aria-busy={isSubmitting}>
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
                    autoComplete="name"
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
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
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
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
                  autoComplete="off"
                  maxLength={150}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
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
                  autoComplete="off"
                  maxLength={2000}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  ref={consentRef}
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  aria-required="true"
                  aria-describedby="privacy-consent-note"
                  className="mt-1 h-5 w-5 rounded border-gray-400 text-blue-700 focus:ring-2 focus:ring-blue-600 dark:border-slate-500 dark:bg-slate-700"
                />
                <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree that my name, email address, subject and message may be stored and
                  used to respond to my enquiry, as described in the{' '}
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 dark:text-blue-300 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    Privacy Policy
                  </Link>
                  . I can withdraw consent at any time by emailing{' '}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-medium text-blue-700 dark:text-blue-300 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    {personalInfo.email}
                  </a>
                  .
                </label>
              </div>
              <p id="privacy-consent-note" className="text-sm text-gray-600 dark:text-gray-400">
                Your message is delivered through EmailJS. I usually reply within 24 hours.
                Please do not include sensitive personal data. Messages are deleted after 12
                months unless we continue the conversation.
              </p>

              {submitStatus === 'success' && (
                <motion.div
                  ref={statusRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg"
                >
                  <p className="text-green-900 dark:text-green-200 font-medium">
                    Message sent successfully. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'consent' && (
                <motion.div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg"
                >
                  <p className="text-amber-900 dark:text-amber-200 font-medium">
                    Please tick the consent checkbox before sending your message.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                >
                  <p className="text-red-900 dark:text-red-200 font-medium">
                    Something went wrong while sending your message. Please try again, or
                    email me directly at{' '}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="underline underline-offset-2"
                    >
                      {personalInfo.email}
                    </a>
                    .
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-800"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-3" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                Prefer email? Write to{' '}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-medium text-blue-700 dark:text-blue-300 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  {personalInfo.email}
                </a>
                . For urgent matters, please call or use LinkedIn.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
