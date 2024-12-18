import type { PageLoad } from './$types';

interface HomeContent {
  heroTitle: string;
  heroText: string;
  aboutText: string;
  contactInfo: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface Project {
  title: string;
  date: string;
  description: string;
  images: string[];
  location: string;
  type: string;
}

export const load: PageLoad = async () => {
  try {
    const homeContent = await import('../data/pages/home.md');
    const servicesFiles = import.meta.glob<{ default: Service }>('../data/services/*.md');
    const projectsFiles = import.meta.glob<{ default: Project }>('../data/projects/*.md');

    // Load services
    const services = await Promise.all(
      Object.values(servicesFiles).map(async (loader) => {
        const service = await loader();
        return service.default;
      })
    );

    // Load projects
    const projects = await Promise.all(
      Object.values(projectsFiles).map(async (loader) => {
        const project = await loader();
        return project.default;
      })
    );

    return {
      home: homeContent.default as HomeContent,
      services,
      projects
    };
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