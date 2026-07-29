import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used. Do not remove them.
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    watch: {
      // These two are planning documents, not source. Without this, editing them
      // triggers a full page reload in any open browser tab, which restarts the
      // hero animation for no reason.
      //
      // Named explicitly rather than globbed by extension, and that matters.
      // An earlier version used ['**/*.txt', '**/*.pdf', '**/*.md'], which broke
      // asset serving: Vite keeps a cached set of public/ files and updates it
      // from watcher events, so any PDF added after server start was never
      // registered and requests for it fell through to the SPA fallback,
      // returning index.html instead of the file. Production was unaffected,
      // which is exactly what makes that class of bug easy to miss.
      ignored: ['**/cv-data.txt', '**/portfolio-change-plan.txt'],
    },
  },
})
