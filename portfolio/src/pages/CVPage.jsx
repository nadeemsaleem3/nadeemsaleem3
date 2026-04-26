import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaDownload, FaPrint, FaArrowLeft, FaExpand, FaCompress, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// Import CSS for react-pdf text layer and annotation layer
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const CVPage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Set up PDF worker - react-pdf v10 uses pdf.js v4.x which requires .mjs extension
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  const cvUrl = '/Nadeem_Saleem_CV.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      if (newPage < 1 || newPage > numPages) return prevPageNumber;
      return newPage;
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  }

  function zoomOut() {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  }

  function resetZoom() {
    setScale(1.0);
  }

  function toggleFullscreen() {
    setIsFullscreen(!isFullscreen);
  }

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Nadeem_Saleem_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printCV = () => {
    window.open(cvUrl, '_blank');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-16 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900' : ''}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isFullscreen ? 'h-full' : ''}`}>
        {/* Page Header */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Curriculum Vitae
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Download or view my detailed professional CV with 8+ years of game development experience.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </motion.div>
        )}

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-slate-700 mb-6 ${isFullscreen ? 'rounded-t-none border-t-0' : ''}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {!isFullscreen && (
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Home
                </Link>
              )}
              
              <button
                onClick={downloadCV}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={printCV}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <FaPrint className="mr-2" />
                Print
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Zoom Out"
                >
                  <span className="text-lg font-bold">-</span>
                </button>
                
                <span className="w-20 text-center font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(scale * 100)}%
                </span>
                
                <button
                  onClick={zoomIn}
                  disabled={scale >= 3.0}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Zoom In"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
                
                <button
                  onClick={resetZoom}
                  className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                {isFullscreen ? (
                  <>
                    <FaCompress className="mr-2" />
                    Exit Fullscreen
                  </>
                ) : (
                  <>
                    <FaExpand className="mr-2" />
                    Fullscreen
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Page Navigation */}
          {numPages && (
            <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={previousPage}
                disabled={pageNumber <= 1}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft className="mr-2" />
                Previous
              </button>
              
              <div className="mx-6 text-gray-700 dark:text-gray-300 font-medium">
                Page <span className="font-bold text-blue-600 dark:text-blue-400">{pageNumber}</span> of <span className="font-bold">{numPages}</span>
              </div>
              
              <button
                onClick={nextPage}
                disabled={pageNumber >= numPages}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <FaChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden ${isFullscreen ? 'h-[calc(100vh-200px)]' : ''}`}
        >
          <div className={`flex justify-center items-center p-4 ${isFullscreen ? 'h-full' : 'min-h-[600px]'}`}>
            <Document
              file={cvUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading CV document...</p>
                </div>
              }
              error={
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 text-red-400">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Failed to load CV
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    The CV document could not be loaded. Please try downloading it instead.
                  </p>
                  <button
                    onClick={downloadCV}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaDownload className="inline mr-2" />
                    Download CV
                  </button>
                </div>
              }
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                className="shadow-lg"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        </motion.div>

        {/* Quick Info */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Professional Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Senior Unity Developer with 8+ years designing, optimizing, and shipping 15+ Android & iOS games (5M+ downloads, 4.2★+ ratings).
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Key Skills
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Unity3D & Mobile Game Development</li>
                <li>• Performance Optimization & IL2CPP</li>
                <li>• Team Leadership & Mentoring</li>
                <li>• Game Monetization & Analytics</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-2xl border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Contact Info
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>📧 nadeemsaleem.bwp@gmail.com</li>
                <li>📱 +92-344-7166460</li>
                <li>📍 Lahore, Pakistan</li>
                <li>🔗 linkedin.com/in/nadeemsaleem</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Footer Note */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-slate-700"
          >
            <p className="text-gray-500 dark:text-gray-400">
              This CV is updated as of April 2026. For the most current version, please contact me directly.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CVPage;