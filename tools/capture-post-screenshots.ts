import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

interface PostCapture {
  campaign: string;
  index: number;
  url: string;
  platform: 'instagram' | 'tiktok';
  success: boolean;
  filepath?: string;
  error?: string;
}

// Load case studies from work.ts
const workTsPath = join(process.cwd(), 'src', 'data', 'work.ts');
const workTsContent = readFileSync(workTsPath, 'utf-8');

// Parse postUrls from work.ts (manual approach for now)
const caseStudies = [
  {
    slug: 'ryder-cup',
    postUrls: [
      'https://www.tiktok.com/@ralphlauren/photo/7555162888525106445?lang=en',
      'https://www.tiktok.com/@ralphlauren/video/7555306097914006798?lang=en',
      'https://www.instagram.com/p/DO_7EFjD8_l/',
    ],
  },
  // Add other campaigns here when scaling beyond PoC
];

const results: PostCapture[] = [];

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const screenshotDir = join(process.cwd(), 'src', 'assets', 'case-studies');

  // Ensure screenshot directory exists
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    for (const caseStudy of caseStudies) {
      for (let i = 0; i < caseStudy.postUrls.length; i++) {
        const url = caseStudy.postUrls[i];
        const platform = url.includes('tiktok') ? 'tiktok' : 'instagram';

        await capturePost(browser, screenshotDir, caseStudy.slug, i + 1, url, platform);
      }
    }
  } finally {
    await browser.close();
  }

  // Print results summary
  console.log('\n=== Capture Results ===');
  console.log(`Total: ${results.length} | Success: ${results.filter(r => r.success).length} | Failed: ${results.filter(r => !r.success).length}\n`);

  results.forEach(r => {
    if (r.success) {
      console.log(`✅ ${r.campaign}-${r.index}: ${r.filepath}`);
    } else {
      console.log(`❌ ${r.campaign}-${r.index}: ${r.error}`);
    }
  });
}

async function capturePost(
  browser: any,
  screenshotDir: string,
  campaign: string,
  index: number,
  url: string,
  platform: 'instagram' | 'tiktok'
) {
  // Implementation in next tasks
}

captureScreenshots().catch(console.error);
