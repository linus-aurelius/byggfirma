<script>
  import { onMount } from 'svelte';
  import '../app.css';

  // Add Netlify Identity Widget redirect
  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  });
</script>

<svelte:head>
  <title>Byggfirma Stockholm - Professionella Byggtjänster</title>
  <meta name="description" content="Vi levererar högkvalitativa byggtjänster med fokus på hållbarhet och kundnöjdhet i Stockholmsområdet." />
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <section class="hero bg-gray-100 rounded-lg p-8 mb-12">
    <h1 class="text-4xl font-bold mb-4">Välkommen till Byggfirma i Stockholm</h1>
    <p class="text-xl text-gray-700">Vi levererar högkvalitativa byggtjänster med fokus på hållbarhet och kundnöjdhet i Stockholmsområdet.</p>
  </section>
  
  <section class="mb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Våra Tjänster</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>Renovering</li>
          <li>Nybyggnation</li>
          <li>Tillbyggnad</li>
          <li>Ombyggnad</li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Kontakta Oss</h2>
        <div class="space-y-2 text-gray-700">
          <p>📍 Stockholm</p>
          <p>📞 08-XXX XX XX</p>
          <p>✉️ kontakt@byggfirma-stockholm.se</p>
          <p>🕒 Mån-Fre: 07:00-16:00</p>
        </div>
      </div>
    </div>
  </section>

  <section class="projects mb-12">
    <h2 class="text-3xl font-semibold mb-6">Våra Senaste Projekt</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Project cards will be added here -->
    </div>
  </section>
</main>

<style>
  :global(body) {
    @apply bg-gray-50;
  }
</style>
