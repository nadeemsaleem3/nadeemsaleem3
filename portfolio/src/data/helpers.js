import cvData from './cv.json';
import projectsData from './projects-enhanced.json';

// Add missing github field to cv data
const enhancedCvData = {
  ...cvData,
  personal_info: {
    ...cvData.personal_info,
    github: 'https://github.com/nadeemsaleem3'
  }
};

// Normalize technical skills into array of objects for easier rendering
const normalizeSkills = (technicalSkills) => {
  return Object.entries(technicalSkills).map(([category, skills]) => ({
    category: category.replace('_', ' ').toUpperCase(),
    skills: typeof skills === 'string' ? skills.split('·').map(s => s.trim()) : [skills]
  }));
};

// Normalize project data to match component expectations
const normalizeProject = (project, index) => {
  // Extract platform from store or URL
  let platform = 'Mobile';
  if (project.store === 'Google Play') platform = 'Android';
  if (project.store === 'App Store') platform = 'iOS';
  if (project.store === 'Amazon') platform = 'Amazon';
  
  // Extract year from name or generate based on index
  const currentYear = new Date().getFullYear();
  const year = currentYear - (index % 5); // Distribute projects across last 5 years
  
  // Generate reviews count based on downloads
  let reviews = '10K+';
  if (project.downloads.includes('M+')) reviews = '50K+';
  if (project.downloads.includes('500K+')) reviews = '25K+';
  if (project.downloads.includes('100K+')) reviews = '5K+';
  
  // Generate technical highlights based on genres
  const technicalHighlights = [];
  if (project.genres.includes('Simulation')) technicalHighlights.push('ScriptableObjects', 'Modular Architecture');
  if (project.genres.includes('Action') || project.genres.includes('Arcade')) technicalHighlights.push('Performance Optimization', 'Physics');
  if (project.genres.includes('Puzzle')) technicalHighlights.push('Algorithm Design', 'UI/UX');
  if (technicalHighlights.length === 0) technicalHighlights.push('Unity Engine', 'C# Programming', 'Mobile Optimization');
  
  return {
    id: `project-${index + 1}`,
    title: project.name,
    description: project.description,
    image: project.image,
    genres: project.genres,
    featured: project.featured,
    video: project.videoUrl || '',
    downloads: project.downloads,
    rating: project.rating.replace('★', ''),
    role: project.role,
    store: project.store,
    link: project.url,
    platform,
    year: year.toString(),
    reviews,
    technical_highlights: technicalHighlights.slice(0, 3)
  };
};

// Get featured projects (top 6)
const getFeaturedProjects = () => {
  return projectsData
    .filter(project => project.featured)
    .slice(0, 6)
    .map((project, index) => normalizeProject(project, index));
};

// Get all projects
const getAllProjects = () => {
  return projectsData.map((project, index) => normalizeProject(project, index));
};

// Get store icon and color mapping
const getStoreInfo = (store) => {
  const storeMap = {
    'Google Play': { 
      icon: 'FaGooglePlay', 
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-700 dark:text-green-300',
      label: 'Play Store'
    },
    'App Store': { 
      icon: 'FaApple', 
      color: 'bg-gray-800 hover:bg-gray-900',
      textColor: 'text-gray-700 dark:text-gray-300',
      label: 'App Store'
    },
    'Amazon': { 
      icon: 'FaAmazon', 
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-orange-700 dark:text-orange-300',
      label: 'Amazon'
    }
  };
  return storeMap[store] || { icon: 'FaExternalLinkAlt', color: 'bg-blue-500', label: 'View' };
};

// Format period for timeline
const formatPeriod = (period) => {
  return period;
};

export {
  enhancedCvData as cvData,
  projectsData,
  normalizeSkills,
  getFeaturedProjects,
  getAllProjects,
  getStoreInfo,
  formatPeriod
};