import cvData from './cv.json';
import projectsData from './projects-enhanced.json';

// Add GitHub to personal info
const enhancedCvData = {
  ...cvData,
  personal_info: {
    ...cvData.personal_info,
    github: 'https://github.com/nadeemsaleem3'
  }
};

// Normalize technical skills
const normalizeSkills = (technicalSkills) => {
  return Object.entries(technicalSkills || {}).map(([category, skills]) => ({
    category: category.replace('_', ' ').toUpperCase(),
    skills: typeof skills === 'string' 
      ? skills.split('·').map(s => s.trim()).filter(Boolean) 
      : Array.isArray(skills) ? skills : [skills]
  }));
};

// Normalize project to match what your components expect
const normalizeProject = (project, index) => {
  const currentYear = new Date().getFullYear();
  
  return {
    id: `project-${index + 1}`,
    title: project.name,
    name: project.name,                    // Added for new components
    description: project.description,
    image: project.image,
    imageFallback: project.imageFallback,  // Important for fallback
    genres: project.genres || [],
    featured: project.featured || false,
    video: project.videoUrl || '',         // old field
    videoUrl: project.videoUrl || '',      // new field
    downloads: project.downloads,
    rating: project.rating ? project.rating.replace('★', '').trim() : '4.0',
    role: project.role || 'Unity Developer',
    store: project.store,
    url: project.url,                      // new field
    link: project.url,                     // old field (for backward compatibility)
    platform: project.store === 'Google Play' ? 'Android' : 
              project.store === 'App Store' ? 'iOS' : 'Mobile',
    year: (currentYear - (index % 6)).toString(),
    reviews: project.downloads.includes('M+') ? '50K+' : 
             project.downloads.includes('500K+') ? '25K+' : '10K+',
    technical_highlights: generateTechnicalHighlights(project.genres)
  };
};

// Helper to generate technical highlights
const generateTechnicalHighlights = (genres = []) => {
  const highlights = [];
  
  if (genres.some(g => g.includes('Simulation') || g.includes('Tycoon'))) {
    highlights.push('ScriptableObjects', 'Modular Architecture');
  }
  if (genres.some(g => g.includes('Action') || g.includes('Arcade') || g.includes('Parkour'))) {
    highlights.push('Performance Optimization', 'Physics');
  }
  if (genres.some(g => g.includes('Puzzle'))) {
    highlights.push('Algorithm Design', 'UI/UX');
  }
  if (genres.some(g => g.includes('Horror'))) {
    highlights.push('Atmospheric Lighting', 'Sound Design');
  }

  // Default fallback
  if (highlights.length === 0) {
    highlights.push('Unity Engine', 'C#', 'Mobile Optimization');
  }

  return highlights.slice(0, 3);
};

// Get featured projects (only featured ones)
const getFeaturedProjects = () => {
  return projectsData
    .filter(project => project.featured === true)
    .slice(0, 6)
    .map((project, index) => normalizeProject(project, index));
};

// Get all projects
const getAllProjects = () => {
  return projectsData.map((project, index) => normalizeProject(project, index));
};

// Store info mapping
const getStoreInfo = (store) => {
  const storeMap = {
    'Google Play': { 
      icon: 'FaGooglePlay', 
      color: 'bg-green-500 hover:bg-green-600',
      label: 'Play Store'
    },
    'App Store': { 
      icon: 'FaApple', 
      color: 'bg-gray-800 hover:bg-gray-900',
      label: 'App Store'
    },
    'Amazon': { 
      icon: 'FaAmazon', 
      color: 'bg-orange-500 hover:bg-orange-600',
      label: 'Amazon'
    }
  };
  return storeMap[store] || { 
    icon: 'FaExternalLinkAlt', 
    color: 'bg-blue-500 hover:bg-blue-600',
    label: 'View Project' 
  };
};

const formatPeriod = (period) => period || '';

export {
  enhancedCvData as cvData,
  projectsData,
  normalizeSkills,
  getFeaturedProjects,
  getAllProjects,
  getStoreInfo,
  formatPeriod
};