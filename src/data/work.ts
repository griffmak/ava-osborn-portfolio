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
  year: number;
  summary: string;
  description: string | null;
  postUrls: string[];
  postImages: string[];
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
    thumbnail: 'paris-fw.jpg',
    year: 2025,
    summary:
      "Architected real-time social execution across 8 platforms for the season's biggest cultural moment.",
    description:
      'I developed the messaging framework and publishing calendar for the SP26 and FA26 Women\'s Polo Presentations, serving as the primary point of contact for 12+ cross-functional and external teams including legal, paid media, and agency partners to drive brand alignment across all content. During the shows, I managed real-time publishing across 8 platforms, making platform-specific decisions on copy, carousels, and video selection throughout to optimize asset performance.',
    postUrls: [
      'https://www.instagram.com/p/DPcVeIBDyKB/',
      'https://www.instagram.com/p/DVjVhmpDha7/',
      'https://www.tiktok.com/@ralphlauren/video/7614505394664213773?lang=en',
      'https://www.tiktok.com/@ralphlauren/photo/7614839280220851469?lang=en',
    ],
    postImages: [
      'paris-fashion-week-1.png',
      'paris-fashion-week-2.png',
      'paris-fashion-week-3.png',
      'paris-fashion-week-4.png',
    ],
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
    thumbnail: 'oak-bluffs.jpg',
    year: 2025,
    summary:
      'Led end-to-end social strategy for a phased brand campaign designed to drive cultural conversation and community growth.',
    description:
      'I orchestrated the social content strategy for Oak Bluffs 2025, a campaign that became a viral moment for the brand. I architected a phased messaging rollout, opening with a teaser to build buzz around the collection and sustaining through in-depth storytelling. I wrote copy across every platform, developed narrative-driven carousels to deepen engagement, and worked cross-functionally with paid media to amplify content and shape distribution strategy. The result was one of the brand\'s most impactful campaigns to date.',
    postUrls: [
      'https://www.instagram.com/p/DMcxB0NgW_w/',
      'https://www.instagram.com/p/DMfWAcjARYX/',
      'https://www.instagram.com/p/DMgo2HsAcIw/',
      'https://www.tiktok.com/@ralphlauren/video/7530842739248778551',
    ],
    postImages: ['oak-bluffs-1.jpg', 'oak-bluffs-2.jpg', 'oak-bluffs-3.jpg', 'oak-bluffs-4.png'],
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
    thumbnail: 'ryder-cup.jpg',
    year: 2024,
    summary:
      'Built a platform-tailored strategy to capture golf audiences, earning #1 social SOV among all competing brand sponsors.',
    description:
      'I contributed to the Ryder Cup 2025 campaign from strategy through live execution, helping architect a phased messaging framework and coordinating cross-functionally with agency, design, and legal teams to ensure brand alignment across all content. During the tournament, I owned publishing across TikTok, Instagram, and YouTube for a full week, overseeing copy and carousel strategy, managing influencer self-capture briefings, and coordinating directly with the PGA and Ryder Cup on partnership moments in real time. Most notably, during a production delay I identified a TikTok opportunity around platform-relevant celebrities and executed an exclusive post optimized for TikTok\'s algorithm, becoming the tournament\'s highest-performing organic post.',
    postUrls: [
      'https://www.tiktok.com/@ralphlauren/photo/7555162888525106445?lang=en',
      'https://www.tiktok.com/@ralphlauren/video/7555306097914006798?lang=en',
      'https://www.instagram.com/p/DO_7EFjD8_l/',
    ],
    postImages: ['ryder-cup-1.png', 'ryder-cup-3.png', 'ryder-cup-2.png', 'ryder-cup-4.png'],
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
    thumbnail: 'australian-open.jpg',
    year: 2025,
    summary:
      "Identified a live cultural moment and executed the brand's highest-ever performing post.",
    description:
      'I worked on-site at the Australian Open to develop the strategic content rollout and manage publishing across 8 platforms for the entire tournament. I developed a platform-tailored approach to differentiate messaging across channels and worked directly with production partners and talent at the suite to oversee capture of key moments. For the finals, I identified buzz surrounding Becky Armstrong\'s upcoming attendance and pitched a dedicated suite capture deliverable of her. I ideated the creative execution of the content, which became Ralph Lauren\'s highest-ever performing Instagram post.',
    postUrls: [
      'https://www.instagram.com/p/DUP-wekj9uZ/',
      'https://www.instagram.com/p/DUNTsMij7gn/',
      'https://www.tiktok.com/@ralphlauren/video/7602315170400029966?lang=en',
    ],
    postImages: ['australian-open-1.png', 'australian-open-2.png', 'australian-open-3.png'],
    metrics: [
      { value: '2.4M', unit: 'Video Views' },
      { value: '1.4M', unit: 'Total Engagements' },
      { value: '48%', unit: 'Of Total Earned Brand Conversation' },
    ],
    featured: false,
  },
];
