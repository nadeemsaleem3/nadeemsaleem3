import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import ProjectsPreview from '../components/sections/ProjectsPreview';
import AIMLProjects from '../components/sections/AIMLProjects';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  useDocumentMeta({
    title: 'Nadeem Saleem — Senior Unity Developer | Mobile Games & AI',
    description:
      'Portfolio of Nadeem Saleem, a senior Unity developer with 8+ years shipping mobile games for Android and iOS. Case studies, CV and contact details.',
    ogType: 'website',
  });

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <ProjectsPreview />
      <AIMLProjects />
      <Contact />
    </>
  );
};

export default HomePage;
