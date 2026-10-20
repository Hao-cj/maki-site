const { chromium } = require(
  "C:/Users/35727/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"
);

const site = "http://127.0.0.1:4173";
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

(async () => {
  const browser = await chromium.launch({
    executablePath: chrome,
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`${site}/travel.html#shanghai`, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-story-id="shanghai-pudong-museum"]');
  await page.locator('[data-story-id="shanghai-pudong-museum"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  const overview = await page.evaluate(() => ({
    destinations: document.querySelectorAll("[data-place-select]").length,
    selectedRows: [...document.querySelectorAll("[data-place-select]")].map((row) =>
      row.innerText.replace(/\s+/g, " ").trim()
    ),
    stats: document.querySelector("[data-travel-stats]")?.textContent,
    tabs: [...document.querySelectorAll("[data-place-view]")].map(
      (tab) => tab.textContent.replace(/\s+/g, " ").trim()
    ),
    cardTitle: document.querySelector('[data-story-id="shanghai-pudong-museum"] h4')
      ?.textContent,
    cardImage: document
      .querySelector('[data-story-id="shanghai-pudong-museum"] img')
      ?.getAttribute("src"),
    cardWidth: document
      .querySelector('[data-story-id="shanghai-pudong-museum"] img')
      ?.naturalWidth,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
  }));
  await page.screenshot({ path: "previews/shanghai-card-desktop.png" });

  await page
    .locator('[data-story-id="shanghai-pudong-museum"] [data-open-story]')
    .click();
  await page.waitForTimeout(800);
  const dialog = await page.evaluate(() => ({
    open: document.querySelector("[data-story-dialog]")?.open,
    title: document.querySelector("[data-dialog-title]")?.textContent,
    meta: document.querySelector("[data-dialog-meta]")?.textContent,
    count: document.querySelector("[data-dialog-count]")?.textContent,
    caption: document.querySelector("[data-dialog-caption]")?.textContent,
    thumbs: document.querySelectorAll(".story-dialog__thumb").length,
    thumbsLoaded: [...document.querySelectorAll(".story-dialog__thumb img")].every(
      (image) => image.complete && image.naturalWidth > 0
    )
  }));
  await page.screenshot({ path: "previews/shanghai-dialog-desktop.png" });
  await page.locator("[data-dialog-close]").click();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${site}/travel.html#shanghai`, { waitUntil: "networkidle" });
  await page.locator('[data-story-id="shanghai-pudong-museum"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const mobile = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    cardWidth: Math.round(
      document
        .querySelector('[data-story-id="shanghai-pudong-museum"]')
        .getBoundingClientRect().width
    )
  }));
  await page.screenshot({ path: "previews/shanghai-card-mobile.png" });

  console.log(JSON.stringify({ overview, dialog, mobile, errors }, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
