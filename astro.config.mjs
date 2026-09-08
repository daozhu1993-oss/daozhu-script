import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? 'https://daozhu1993-oss.github.io' : 'https://daozhuai.cn',
  base: isGitHubPages ? '/daozhu-script' : '/',
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
