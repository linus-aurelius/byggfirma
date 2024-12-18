import type { PageLoad } from './$types';

interface HomeContent {
  metadata: {
    heroTitle: string;
    heroText: string;
    aboutText: string;
    contactInfo: string;
  }
}

interface Service {
  metadata: {
    title: string;
    description: string;
    icon: string;
    order: number;
  }
}

interface Project {
  metadata: {
    title: string;
    date: string;
    description: string;
    images: string[];
    location: string;
    type: string;
  }
}

export const load: PageLoad = async () => {
  try {
    // Add a cache-busting timestamp to force reload of content
    const timestamp = new Date().getTime();
    console.log('Attempting to load home content at timestamp:', timestamp);
    
    // Import all markdown files in the pages directory
    const pages = import.meta.glob('../data/pages/*.md');
    console.log('Available page files:', Object.keys(pages));
    
    // Load the home page specifically
    const homeLoader = pages['../data/pages/home.md'];
    if (!homeLoader) {
      throw new Error('Home page markdown file not found');
    }
    
    const homeModule = await homeLoader();
    console.log('Raw homeModule:', homeModule);
    console.log('Loaded home content metadata:', homeModule.metadata);
    console.log('Loaded home content default:', homeModule.default);

    const servicesFiles = import.meta.glob<Service>('../data/services/*.md');
    const projectsFiles = import.meta.glob<Project>('../data/projects/*.md');

    // Load services
    const services = await Promise.all(
      Object.values(servicesFiles).map(async (loader) => {
        const module = await loader();
        return module.metadata;
      })
    );

    // Load projects
    const projects = await Promise.all(
      Object.values(projectsFiles).map(async (loader) => {
        const module = await loader();
        return module.metadata;
      })
    );

    const data = {
      home: homeModule.metadata || homeModule.default?.metadata,
      services,
      projects
    };
    
    console.log('Final data being returned:', data);
    return data;
  } catch (error) {
    console.error('Error loading content:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return {
      home: {
        heroTitle: 'Välkommen till Byggfirma Stockholm',
        heroText: 'Vi levererar högkvalitativa byggtjänster med fokus på hållbarhet och kundnöjdhet i Stockholmsområdet.',
        aboutText: '',
        contactInfo: ''
      },
      services: [],
      projects: []
    };
  }
};