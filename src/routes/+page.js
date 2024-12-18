export const load = async () => {
  const homeContent = await import('../data/pages/home.md');
  const services = await import.meta.glob('../data/services/*.md');
  const projects = await import.meta.glob('../data/projects/*.md');
  
  return {
    home: homeContent.default,
    services,
    projects
  };
}; 