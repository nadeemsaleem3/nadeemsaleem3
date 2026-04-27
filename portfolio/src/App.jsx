import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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
import ProjectsPage from './pages/ProjectsPage';
import CVPage from './pages/CVPage';
import './App.css';

// Layout wrapper shared by all routes
const Layout = () => (
  <ThemeProvider>
    <ScrollToTop />
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
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