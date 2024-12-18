# Byggfirma i Stockholm - Tech Stack Documentation

## Core Technologies

### Frontend Framework

**SvelteKit**

Why:
- Optimal prestanda med äkta kompilering
- Liten bundle-storlek
- Inbyggd routing och SSR (Server-Side Rendering)
- SEO-vänlig arkitektur

Version: Latest stable
Documentation: SvelteKit Docs

### Content Management

**Netlify CMS**

Why:
- Enkelt att använda för innehållshantering
- Git-baserad CMS-lösning
- Användarvänligt gränssnitt för icke-tekniska användare
- Perfekt för små och medelstora projekt
- Realtidsförhandsgranskning av innehåll

Implementation:
- Netlify CMS integreras via GitHub eller GitLab
- Innehållshantering via markdown-filer
- Realtime previews för innehållsuppdateringar

### Styling

**TailwindCSS**

Why:
- Utility-first approach
- Konsekvent designsystem
- Responsiv design utan extra kod

Version: Latest stable
Custom configuration for Swedish typography

### SEO & Structured Data

**Schema.org Implementation**
- LocalBusiness schema
- Organization schema
- Service schema för byggtjänster

**Meta Tags Management**
- Dynamiska meta tags per route
- Open Graph tags för sociala delningar
- Svenska språkmarkeringar

### Hosting & Deployment

**Netlify**

Why:
- Automatisk HTTPS
- Continuous Deployment via GitHub
- Edge functions
- Analytics och prestandarapporter

Configuration:
- Custom domain setup
- Environment variables
- Build optimizations

## Project Structure

```
byggfirma/
├── src/
│   ├── lib/
│   │   ├── components/  # Svelte-komponenter
│   │   ├── styles/      # Globala stilar
│   │   └── utils/       # Hjälpfunktioner
│   ├── routes/          # SvelteKit sidor
│   ├── data/           # Innehållsfiler (markdown, etc.)
│   │   ├── pages/      # Sidinnehåll i markdown
│   │   ├── services/   # Tjänster i markdown
│   │   └── projects/   # Projekt i markdown
│   └── app.html        # App-mall
├── static/             # ENDAST statiska filer
│   ├── images/         # Bilder
│   ├── fonts/          # Typsnitt
│   ├── admin/          # Netlify CMS admin
│   ├── favicon.png     # Favicon
│   └── robots.txt      # SEO-filer
└── config/             # Konfigurationsfiler
```

### Viktigt om Filstruktur

#### src/ mappen
Innehåller filer som behöver bearbetas:
- Markdown-filer (`.md`) för innehåll
- Svelte-komponenter (`.svelte`)
- TypeScript/JavaScript-filer
- Stilmallar
- Routes och endpoints

#### static/ mappen
ENDAST för filer som ska serveras exakt som de är:
- Bilder (jpg, png, svg, etc.)
- Typsnitt
- Favicon
- robots.txt
- manifest.json
- Admin-gränssnitt för CMS

❌ Placera ALDRIG dessa i static/:
- Markdown-filer
- Källkod
- Komponenter
- Data som behöver bearbetas

#### Viktigt att Notera
- All innehållsdata (markdown) ska ligga i `src/data/`
- Statiska filer som bilder ska ligga i `static/`
- Undvik duplicering mellan `src/` och `static/`
- CMS-konfiguration ligger i `static/admin/`

## Key Features Implementation

### Content Management with Netlify CMS

```yaml
# cms/config.yml
backend:
  name: git-gateway
  branch: main

collections:
  - name: "projects"
    label: "Byggprojekt"
    folder: "src/data/projects"
    create: true
    fields:
      - { label: "Projekttitel", name: "title", widget: "string" }
      - { label: "Beskrivning", name: "description", widget: "markdown" }
      - { label: "Projektbilder", name: "images", widget: "image" }
```

## Development Workflow Guide

### Initial Setup

1. Start Local Development Server
```bash
# Start development server
npm run dev
```
Your site will be available at `localhost:5173`

### Daily Development Process

1. **Before Starting New Changes**
```bash
# Make sure you're on staging branch
git checkout staging

# Get latest changes
git pull origin staging

# Create new feature branch
git checkout -b feature/what-you-are-building
```

2. **During Development**
- Make your changes
- Test locally at `localhost:5173`
- Test on different devices and browsers

3. **Saving Your Changes**
```bash
# See what files you changed
git status

# Add all your changes
git add .

# Save your changes with a description
git commit -m "Describe what you changed"
```

4. **Code Quality Checks**
```bash
# Check code formatting and find potential errors
npm run lint

# Run all tests
npm run test

# If any issues are found:
# 1. Fix the reported problems
# 2. Run the commands again
# 3. Only proceed when all checks pass
```

5. **Testing on Staging**
```bash
# Switch to staging branch
git checkout staging

# Bring in your changes
git merge feature/what-you-are-building

# Push to staging environment
git push origin staging
```
- Test everything on the staging site
- Make sure all changes work as expected

6. **Publishing to Live Site**
```bash
# Switch to main branch
git checkout main

# Bring in staging changes
git merge staging

# Push to live site
git push origin main
```

### Branch Structure
```
main (live site)
├── staging (test site)
└── feature branches
    ├── feature/new-homepage
    ├── feature/contact-form
    └── feature/project-gallery
```

### Important Rules
1. Never make changes directly on `main` branch
2. Always test changes on `staging` first
3. Create new feature branch for each change
4. Use descriptive names for feature branches
5. Test thoroughly before pushing to live site

### Common Commands Reference

**Navigation**
```bash
# See what branch you're on
git branch

# Switch to a branch
git checkout branch-name

# Create and switch to new branch
git checkout -b feature/new-branch
```

**Saving Changes**
```bash
# See what you changed
git status

# Save changes
git add .
git commit -m "Description of changes"
```

**Updating & Publishing**
```bash
# Get latest changes
git pull origin branch-name

# Push your changes
git push origin branch-name
```

### Troubleshooting

If something goes wrong:
1. Don't panic
2. Make note of any error messages
3. Don't make more changes
4. Contact technical support

### Environment Variables
- Development variables are in `.env`
- Example variables are in `.env.example`
- Never commit real credentials to Git
- Update both files when adding new variables

### Code Quality Tools

**What These Tools Do:**

1. `npm run lint`
   - Checks code formatting
   - Finds potential errors
   - Ensures consistent code style
   - Helps prevent common mistakes
   - Must pass before pushing to staging

2. `npm run test`
   - Runs automated tests
   - Checks if features work correctly
   - Verifies site functionality
   - Must pass before pushing to staging

**When to Run These Commands:**
- Before pushing any changes
- After making significant changes
- When something stops working
- Before merging to staging

**If You Get Errors:**
1. Read the error message carefully
2. Look for:
   - Line numbers
   - File names
   - Error descriptions
3. Fix one error at a time
4. Run commands again until all pass

**Common Issues:**
- Missing semicolons
- Incorrect indentation
- Unused variables
- Failed tests
- Formatting issues

## Best Practices

### SEO Optimization
- Implementera schema.org markup
- Optimera för lokala sökningar i Stockholm
- Skapa sitemap.xml
- Implementera robots.txt
- Säkerställ korrekt hantering av hreflang

### Performance
- Bildoptimering via Netlify's bildoptimeringstjänst
- Lazy loading av innehåll
- Preload kritiska resurser
- Implementera caching strategier

### Content Strategy
- Strukturerat innehåll i markdown-filer via Netlify CMS
- Återanvändbara innehållsblock
- SEO-optimerade URL-strukturer
- Automatisk bildoptimering

### Maintenance
- Regelbundna säkerhetsuppdateringar
- Content backup via GitHub
- Prestandaövervakning via Netlify
- SEO-rapportering och optimering

## Resources
- SvelteKit Documentation
- Netlify CMS Documentation
- Netlify Documentation
- Schema.org LocalBusiness

#### Important: Markdown Content Loading Configuration
För att säkerställa att innehåll från markdown-filer laddas korrekt krävs följande konfiguration:

1. **Vite Configuration** (`vite.config.ts`):
```typescript
export default defineConfig({
  plugins: [sveltekit()],
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    include: ['**/*.md']
  }
});
```

2. **Page Loading Pattern** (`+page.ts`):
```typescript
export const load: PageLoad = async () => {
  try {
    // Import all markdown files in the directory
    const pages = import.meta.glob('../data/pages/*.md');
    console.log('Available page files:', Object.keys(pages));
    
    // Load specific page
    const pageLoader = pages['../data/pages/your-page.md'];
    if (!pageLoader) {
      throw new Error('Page markdown file not found');
    }
    
    const pageModule = await pageLoader();
    console.log('Raw pageModule:', pageModule);
    
    return {
      pageData: pageModule.metadata || pageModule.default?.metadata
    };
  } catch (error) {
    console.error('Error loading content:', error);
    return {
      pageData: {
        // Define your fallback structure here
        title: 'Default Title',
        content: 'Default Content'
      }
    };
  }
};
```

3. **Component Usage Pattern** (`+page.svelte`):
```typescript
<script>
  export let data;
  
  // Always provide empty fallback values to prevent undefined errors
  $: pageContent = data?.pageData || {
    title: '',
    content: ''
  };
  
  // Log data changes to help with debugging
  $: {
    console.log('Data changed:', data);
    console.log('pageContent value:', pageContent);
  }
</script>

<h1>{pageContent.title || 'Default Title'}</h1>
<div>{@html pageContent.content || 'Default Content'}</div>
```

Denna konfiguration säkerställer:
- Korrekt importering av markdown-filer
- Korrekt extrahering av metadata
- Fallback-innehåll om laddningen misslyckas
- Fungerar för alla sidor som använder markdown-innehåll
- Förhindrar undefined-fel genom tomma fallback-värden

När du lägger till nya sidor:
1. Placera markdown-filer i `src/data/pages/`
2. Använd samma laddningsmönster i sidans `+page.ts`
3. Kom åt data i komponenten med det reaktiva mönstret ovan
4. Använd ALLTID tomma strängar som fallback-värden för att undvika undefined-fel
5. Lägg till console.log för att underlätta felsökning
6. Testa alltid att innehållet uppdateras korrekt via CMS

Viktigt att notera:
- Markdown-filer måste ha korrekt frontmatter-format
- Använd alltid tomma strängar som fallback, inte null eller undefined
- Kontrollera webbläsarens konsol för felmeddelanden
- Rensa webbläsarens cache om ändringar inte syns