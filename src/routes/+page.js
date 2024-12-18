/** @type {import('./$types').PageLoad} */
export const load = async () => {
  try {
    const homeContent = await import('../data/pages/home.md');
    const servicesFiles = import.meta.glob('../data/services/*.md');
    const projectsFiles = import.meta.glob('../data/projects/*.md');

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
      home: homeContent.default,
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