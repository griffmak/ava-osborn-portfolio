export interface Metric {
  value: string;
  unit: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  brand: string;
  role: string;
  platforms: string[];
  thumbnail: string;
  year: string;
  summary: string;
  challenge: string;
  strategy: string;
  results: string;
  metrics: Metric[];
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'paris-fashion-week',
    title: 'Paris Fashion Week',
    brand: 'Ralph Lauren',
    role: 'Social Strategy Lead',
    platforms: ['Instagram', 'TikTok', 'YouTube', '+5 platforms'],
    thumbnail: '/src/assets/case-studies/paris-fw.jpg',
    year: '2025',
    summary:
      "Architected real-time social execution across 8 platforms for the season's biggest cultural moment.",
    challenge: '[Ava to fill in]',
    strategy: '[Ava to fill in]',
    results: '[Ava to fill in]',
    metrics: [
      { value: '61M', unit: 'Total Reach' },
      { value: '74M', unit: 'Video Views' },
      { value: '#1', unit: 'Among Competitive Set for Video Views' },
    ],
    featured: true,
  },
  {
    slug: 'oak-bluffs',
    title: 'Oak Bluffs 2025',
    brand: 'Ralph Lauren',
    role: 'Campaign Strategist',
    platforms: ['Instagram', 'TikTok'],
    thumbnail: '/src/assets/case-studies/oak-bluffs.jpg',
    year: '2025',
    summary:
      'Led end-to-end social strategy for a phased brand campaign designed to drive cultural conversation and community growth.',
    challenge: '[Ava to fill in]',
    strategy: '[Ava to fill in]',
    results: '[Ava to fill in]',
    metrics: [
      { value: '62K', unit: 'New Followers' },
      { value: '1.5M', unit: 'Total Engagements' },
      { value: '22M', unit: 'Total Reach' },
    ],
    featured: true,
  },
  {
    slug: 'ryder-cup',
    title: 'Ryder Cup',
    brand: 'Ralph Lauren',
    role: 'Social Strategy & Content',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    thumbnail: '/src/assets/case-studies/ryder-cup.jpg',
    year: '2024',
    summary:
      'Built a platform-tailored strategy to capture golf audiences, earning #1 social SOV among all competing brand sponsors.',
    challenge: '[Ava to fill in]',
    strategy: '[Ava to fill in]',
    results: '[Ava to fill in]',
    metrics: [
      { value: '39M', unit: 'Total Reach' },
      { value: '14.5M', unit: 'Non-Followers Reached' },
      { value: '#1', unit: 'Earned Social SOV Among Brand Sponsors' },
    ],
    featured: false,
  },
  {
    slug: 'australian-open',
    title: 'Australian Open',
    brand: 'Ralph Lauren',
    role: 'Real-Time Content Strategy',
    platforms: ['TikTok', 'Instagram'],
    thumbnail: '/src/assets/case-studies/australian-open.jpg',
    year: '2025',
    summary:
      "Identified a live cultural moment and executed the brand's highest-ever performing post.",
    challenge: '[Ava to fill in]',
    strategy: '[Ava to fill in]',
    results: '[Ava to fill in]',
    metrics: [
      { value: '2.4M', unit: 'Video Views' },
      { value: '1.4M', unit: 'Total Engagements' },
      { value: '48%', unit: 'Of Total Earned Brand Conversation' },
    ],
    featured: false,
  },
];
