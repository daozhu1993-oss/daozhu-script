import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://daozhu-script.pages.dev',
  server: {
    port: 3001,
    host: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
