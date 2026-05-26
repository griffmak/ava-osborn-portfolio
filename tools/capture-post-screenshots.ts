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
  const page = await browser.newPage();
  const result: PostCapture = {
    campaign,
    index,
    url,
    platform,
    success: false,
  };

  try {
    // Navigate to URL
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Platform-specific wait
    if (platform === 'instagram') {
      // Dismiss the login/signup modal if present
      const closeBtn = page.locator('[aria-label="Close"]');
      if (await closeBtn.count() > 0) {
        await closeBtn.first().click();
        await page.waitForTimeout(500);
      }

      // Remove any remaining overlay/modal via DOM manipulation
      await page.evaluate(() => {
        document.querySelectorAll('[role="dialog"], [aria-modal="true"]').forEach((el) => el.remove());
        (document.querySelectorAll('div') as NodeListOf<HTMLElement>).forEach((el) => {
          if (el.innerText && el.innerText.includes('Never miss a post')) el.remove();
        });
      });

      await page.waitForTimeout(500);

      // Find the post image and derive a clip region covering header + image + engagement
      const region: { x: number; y: number; width: number; height: number } | null =
        await page.evaluate(() => {
          const main = document.querySelector('[role="main"]');
          if (!main) return null;
          const imgs = main.querySelectorAll('img');
          let postImg: Element | null = null;
          for (const img of imgs) {
            const r = img.getBoundingClientRect();
            if (r.width > 200) { postImg = img; break; }
          }
          if (!postImg) return null;
          const r = postImg.getBoundingClientRect();
          return {
            x: Math.max(0, r.x - 2),
            y: Math.max(0, r.y - 60),    // include header row above image
            width: Math.min(1280 - r.x + 2, r.width + 340), // image + right caption panel
            height: r.height + 200,       // image height + header + engagement bar
          };
        });

      if (!region) throw new Error('Could not locate post image in page');

      // Screenshot the post region as PNG
      const filename = `${campaign}-${index}.png`;
      const filepath = join(screenshotDir, filename);

      await page.screenshot({
        path: filepath,
        clip: region,
      });

      result.success = true;
      result.filepath = filepath;
      results.push(result);
      console.log(`📸 Captured Instagram: ${filename}`);
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    results.push(result);
    console.error(`❌ Error capturing ${campaign}-${index}: ${result.error}`);
  } finally {
    await page.close();
  }
}

captureScreenshots().catch(console.error);
