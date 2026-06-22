import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://solarvantagepro.com',
  trailingSlash: 'always',
  output: 'static',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404'), changefreq: 'daily', priority: 0.7 })],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});