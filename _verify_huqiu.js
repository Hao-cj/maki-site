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

  await page.goto(`${site}/travel.html#suzhou`, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-story-id="suzhou-huqiu"]');
  await page.locator('[data-story-id="suzhou-huqiu"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "previews/huqiu-card-desktop.png" });

  const cards = await page.locator(".spot-card").evaluateAll((elements) =>
    elements.map((card) => ({
      id: card.dataset.storyId,
      title: card.querySelector("h4")?.textContent,
      image: card.querySelector("img")?.getAttribute("src"),
      width: card.querySelector("img")?.naturalWidth,
      height: card.querySelector("img")?.naturalHeight
    }))
  );

  await page.locator('[data-story-id="suzhou-huqiu"] [data-open-story]').click();
  await page.waitForTimeout(800);
  const dialogFirst = await page.evaluate(() => ({
    open: document.querySelector("[data-story-dialog]")?.open,
    title: document.querySelector("[data-dialog-title]")?.textContent,
    meta: document.querySelector("[data-dialog-meta]")?.textContent,
    count: document.querySelector("[data-dialog-count]")?.textContent,
    caption: document.querySelector("[data-dialog-caption]")?.textContent,
    image: document
      .querySelector("[data-dialog-image].is-visible")
      ?.getAttribute("src")
  }));
  await page.screenshot({ path: "previews/huqiu-dialog-desktop.png" });
  await page.locator("[data-dialog-next]").click();
  await page.waitForTimeout(650);
  const dialogSecond = await page.evaluate(() => ({
    count: document.querySelector("[data-dialog-count]")?.textContent,
    caption: document.querySelector("[data-dialog-caption]")?.textContent,
    image: document
      .querySelector("[data-dialog-image].is-visible")
      ?.getAttribute("src")
  }));
  await page.locator('[data-gallery-index="7"]').click();
  await page.waitForTimeout(650);
  const dialogPortrait = await page.evaluate(() => ({
    count: document.querySelector("[data-dialog-count]")?.textContent,
    caption: document.querySelector("[data-dialog-caption]")?.textContent,
    image: document
      .querySelector("[data-dialog-image].is-visible")
      ?.getAttribute("src"),
    thumbsLoaded: [...document.querySelectorAll(".story-dialog__thumb img")].every(
      (image) => image.complete && image.naturalWidth > 0
    )
  }));
  await page.screenshot({ path: "previews/huqiu-dialog-portrait.png" });

  await page.locator("[data-dialog-close]").click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${site}/travel.html#suzhou`, { waitUntil: "networkidle" });
  await page.locator('[data-story-id="suzhou-huqiu"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const mobile = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    cards: document.querySelectorAll(".spot-card").length,
    gridColumns: getComputedStyle(document.querySelector(".spot-grid")).gridTemplateColumns,
    cardWidth: Math.round(
      document.querySelector('[data-story-id="suzhou-huqiu"]').getBoundingClientRect().width
    )
  }));
  await page.screenshot({ path: "previews/huqiu-card-mobile.png" });

  console.log(
    JSON.stringify(
      { cards, dialogFirst, dialogSecond, dialogPortrait, mobile, errors },
      null,
      2
    )
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
