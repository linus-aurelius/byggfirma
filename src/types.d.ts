declare module '*.md' {
  const attributes: {
    heroTitle?: string;
    heroText?: string;
    aboutText?: string;
    contactInfo?: string;
    title?: string;
    description?: string;
    icon?: string;
    order?: number;
    date?: string;
    images?: string[];
    location?: string;
    type?: string;
  };
  const html: string;
  const toc: { level: string; content: string }[];
  
  export { attributes as default, html, toc };
}

interface Window {
  netlifyIdentity: {
    on: (event: string, callback: (user?: any) => void) => void;
  };
}

declare module '@tailwindcss/*';
declare module 'tailwindcss/*'; 