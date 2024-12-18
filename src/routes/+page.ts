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
    
    // Clear module cache if it exists
    if (import.meta.hot) {
      import.meta.hot.invalidate();
    }
    
    const homeModule = await import(`../data/pages/home.md?update=${timestamp}`);
    console.log('Loaded home content:', homeModule.metadata);

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
      home: homeModule.metadata,
      services,
      projects
    };
    
    console.log('Returning data:', data);
    return data;
  } catch (error) {
    console.error('Error loading content:', error);
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