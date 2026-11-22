import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const LegalPage = ({ title, description, lastUpdated, children }) => {
  useDocumentMeta({
    title: `${title} - Nadeem Saleem`,
    description,
    ogType: 'website',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" aria-hidden="true" /> Back to home
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          )}
        </header>

        <div className="legal-content">{children}</div>
      </div>
    </div>
  );
};

export default LegalPage;
