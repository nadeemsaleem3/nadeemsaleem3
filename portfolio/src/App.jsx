import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';

const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ProjectCaseStudyPage = React.lazy(() => import('./pages/ProjectCaseStudyPage'));
const CVPage = React.lazy(() => import('./pages/CVPage'));
const JourneyPage = React.lazy(() => import('./pages/JourneyPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const AccessibilityPage = React.lazy(() => import('./pages/AccessibilityPage'));
const ImprintPage = React.lazy(() => import('./pages/ImprintPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Layout = () => (
  <ThemeProvider>
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  </ThemeProvider>
);

// Create the router with basename (React Router v7 + createBrowserRouter)
const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/projects',
          element: <ProjectsPage />,
        },
        {
          path: '/projects/:slug',
          element: <ProjectCaseStudyPage />,
        },
        {
          path: '/cv',
          element: <CVPage />,
        },
        {
          path: '/journey',
          element: <JourneyPage />,
        },
        {
          path: '/privacy',
          element: <PrivacyPage />,
        },
        {
          path: '/accessibility',
          element: <AccessibilityPage />,
        },
        {
          path: '/imprint',
          element: <ImprintPage />,
        },
      ],
    },
  ],
  {
    basename: '/nadeemsaleem3',
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;