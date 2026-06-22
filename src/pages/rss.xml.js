import rss from '@astrojs/rss';
export async function GET(context) {
  const articles = Object.values(import.meta.glob('../content/articles/*.mdx', { eager: true }));
  const items = articles
    .sort((a, b) => new Date(b.frontmatter?.pubDate || b.frontmatter?.date || 0).getTime() - new Date(a.frontmatter?.pubDate || a.frontmatter?.date || 0).getTime())
    .map((article) => {
      const fm = article.frontmatter || {};
      const slug = (article.file?.split('/')?.pop()?.replace(/\.(mdx|md)$/, '')) || '';
      return { title: fm.title, description: fm.metaDescription || fm.description, pubDate: new Date(fm.pubDate || fm.date || Date.now()), link: `/articles/${slug}/` };
    });
  return rss({ title: 'SolarVantage Pro', description: 'Solar energy deals, reviews & guides.', site: context.site || 'https://solarvantagepro.com', items, trailingSlash: true });
}