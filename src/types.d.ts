declare module '*.md' {
  const metadata: {
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
  const default: string;
}

interface Window {
  netlifyIdentity: {
    on: (event: string, callback: (user?: any) => void) => void;
  };
}

declare module '@tailwindcss/*';
declare module 'tailwindcss/*'; 