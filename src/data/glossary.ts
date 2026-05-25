export interface GlossaryArticle {
  slug: string;
  title: string;
  company: string;
  period: string;
  excerpt: string | null;
  body: string | null;
}

export const glossaryArticles: GlossaryArticle[] = [
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    company: 'Azul Systems',
    period: 'Jan 2023–Apr 2024',
    excerpt: null,
    body: null,
  },
  {
    slug: 'platform-strategy',
    title: 'Platform Strategy',
    company: 'Azul Systems',
    period: 'Jan 2023–Apr 2024',
    excerpt: null,
    body: null,
  },
  {
    slug: 'community-engagement',
    title: 'Community Engagement',
    company: 'Azul Systems',
    period: 'Jan 2023–Apr 2024',
    excerpt: null,
    body: null,
  },
];
