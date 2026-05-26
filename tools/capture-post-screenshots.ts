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
  {
    slug: 'australian-open',
    postUrls: [
      'https://www.instagram.com/p/DUP-wekj9uZ/',
      'https://www.instagram.com/p/DUNTsMij7gn/',
      'https://www.tiktok.com/@ralphlauren/video/7602315170400029966?lang=en',
    ],
  },
  {
    slug: 'oak-bluffs',
    postUrls: [
      'https://www.instagram.com/p/DMcxB0NgW_w/',
      'https://www.instagram.com/p/DMfWAcjARYX/',
      'https://www.instagram.com/p/DMgo2HsAcIw/',
    ],
  },
  {
    slug: 'paris-fashion-week',
    postUrls: [
      'https://www.instagram.com/p/DPcVeIBDyKB/',
      'https://www.instagram.com/p/DVjVhmpDha7/',
      'https://www.tiktok.com/@ralphlauren/video/7614505394664213773?lang=en',
    ],
  },
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

      // Find the post media element (img or video) and derive a clip region
      // Instagram photo posts use <img>, video posts use <video>
      const region: { x: number; y: number; width: number; height: number } | null =
        await page.evaluate(() => {
          const viewH = window.innerHeight;
          const viewW = window.innerWidth;

          // 1. Try video elements first (Instagram video/reel posts)
          const videos = Array.from(document.querySelectorAll('video'));
          for (const vid of videos) {
            const r = vid.getBoundingClientRect();
            if (r.width > 200 && r.y >= 0 && r.y < viewH) {
              return {
                x: Math.max(0, r.x - 2),
                y: Math.max(0, r.y - 60),
                width: Math.min(viewW - r.x + 2, r.width + 340),
                height: Math.min(r.height + 200, viewH - Math.max(0, r.y - 60)),
              };
            }
          }

          // 2. Try img elements (photo posts)
          const main = document.querySelector('[role="main"]');
          const imgs = main ? main.querySelectorAll('img') : document.querySelectorAll('img');
          for (const img of Array.from(imgs)) {
            const r = img.getBoundingClientRect();
            if (r.width > 200 && r.y >= 0 && r.y < viewH) {
              return {
                x: Math.max(0, r.x - 2),
                y: Math.max(0, r.y - 60),
                width: Math.min(viewW - r.x + 2, r.width + 340),
                height: Math.min(r.height + 200, viewH - Math.max(0, r.y - 60)),
              };
            }
          }

          return null;
        });

      if (!region) throw new Error('Could not locate post image or video in page');

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
    } else if (platform === 'tiktok') {
      // TikTok strategy: dismiss the "Got it" tutorial overlay (which dims the
      // video), then clip TIGHTLY to the largest visible media element. Tight
      // clipping makes DOM stripping unnecessary because the side nav, search,
      // and comments column fall outside the bounding rect.

      // Wait for any image to attach — works for both video posts (poster <img>
      // appears before <video>) and photo posts (carousel uses <img>).
      try {
        await page.waitForSelector('img, video', { timeout: 15000, state: 'attached' });
      } catch {
        throw new Error('TikTok post content never rendered (no img/video)');
      }

      // Generous wait for the video to start painting and lazy assets to load.
      await page.waitForTimeout(4000);

      // Dismiss the feed tutorial overlay if present (it dims the video).
      const gotItBtn = page.getByRole('button', { name: /got it/i });
      if (await gotItBtn.count() > 0) {
        try {
          await gotItBtn.first().click({ timeout: 2000 });
          await page.waitForTimeout(500);
        } catch {
          /* keep going — clip is tight enough that the overlay text is outside */
        }
      }

      // Dismiss the TikTok Shop promo toast if it has a close button.
      const closeBtn = page.locator('button[aria-label*="lose" i], [data-e2e*="close" i]');
      if (await closeBtn.count() > 0) {
        try {
          await closeBtn.first().click({ timeout: 1500 });
          await page.waitForTimeout(300);
        } catch {
          /* non-fatal */
        }
      }

      // Find the largest visible media element (video preferred over img).
      // The center-stage post is always the largest media node on the page;
      // side-nav icons and toast images are tiny by comparison.
      const region: { x: number; y: number; width: number; height: number } | null =
        await page.evaluate(() => {
          const viewH = window.innerHeight;
          const viewW = window.innerWidth;

          type Cand = { x: number; y: number; w: number; h: number; area: number; isVideo: boolean };
          const cands: Cand[] = [];

          for (const el of Array.from(document.querySelectorAll('video, img'))) {
            const r = (el as HTMLElement).getBoundingClientRect();
            // Must be reasonably sized and at least partially in viewport.
            if (r.width < 250 || r.height < 250) continue;
            if (r.y + r.height < 0 || r.y > viewH) continue;
            if (r.x + r.width < 0 || r.x > viewW) continue;
            cands.push({
              x: r.x,
              y: r.y,
              w: r.width,
              h: r.height,
              area: r.width * r.height,
              isVideo: el.tagName === 'VIDEO',
            });
          }

          if (cands.length === 0) return null;

          // Pick the largest; break ties by preferring <video>.
          cands.sort((a, b) => (b.area - a.area) || (Number(b.isVideo) - Number(a.isVideo)));
          const top = cands[0];

          // Reference framing (Griffin 2026-05-25): show video + right-side
          // action rail (likes/comments/shares/bookmarks) + bottom caption.
          // Extend the clip rect to include those zones without spilling into
          // the left side nav or the right comments column.
          const RAIL_RIGHT = 90;   // action rail sits ~80–100px right of video
          const CAPTION_BOTTOM = 70; // caption strip is ~60–80px below video
          const PAD_LEFT = 4;

          const x = Math.max(0, Math.floor(top.x - PAD_LEFT));
          const y = Math.max(0, Math.floor(top.y));
          const width = Math.min(viewW - x, Math.ceil(top.w + PAD_LEFT + RAIL_RIGHT));
          const height = Math.min(viewH - y, Math.ceil(top.h + CAPTION_BOTTOM));

          return { x, y, width, height };
        });

      if (!region) throw new Error('Could not locate TikTok post media (no large enough media element)');

      const filename = `${campaign}-${index}.png`;
      const filepath = join(screenshotDir, filename);

      await page.screenshot({
        path: filepath,
        type: 'png',
        clip: region,
      });

      result.success = true;
      result.filepath = filepath;
      results.push(result);
      console.log(`📸 Captured TikTok: ${filename} (${region.width}×${region.height})`);
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
