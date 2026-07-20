import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import ProjectsPreview from './components/sections/ProjectsPreview';
import Contact from './components/sections/Contact';

const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const CVPage = React.lazy(() => import('./pages/CVPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Layout = () => (
  <ThemeProvider>
    <HelmetProvider>
      <ScrollToTop />
      <Helmet>
        <title>Nadeem Saleem - Senior Unity Developer Portfolio</title>
        <meta name="description" content="Senior Unity Developer with 8+ years designing, optimizing, and shipping 50+ mobile games. Portfolio showcasing game development, AI engineering, and technical projects." />
        <meta property="og:title" content="Nadeem Saleem - Senior Unity Developer Portfolio" />
        <meta property="og:description" content="Senior Unity Developer with 8+ years designing, optimizing, and shipping 50+ mobile games. Portfolio showcasing game development, AI engineering, and technical projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nadeemsaleem3.github.io/nadeemsaleem3" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nadeem Saleem - Senior Unity Developer Portfolio" />
        <meta name="twitter:description" content="Senior Unity Developer with 8+ years designing, optimizing, and shipping 50+ mobile games." />
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </HelmetProvider>
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
          element: (
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Education />
              <ProjectsPreview />
              <Contact />
            </main>
          ),
        },
        {
          path: '/projects',
          element: <ProjectsPage />,
        },
        {
          path: '/cv',
          element: <CVPage />,
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