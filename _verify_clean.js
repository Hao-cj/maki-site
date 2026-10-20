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

  await page.goto(`${site}/travel.html`, { waitUntil: "networkidle" });
  const overview = await page.evaluate(() => ({
    destinations: document.querySelectorAll("[data-place-select]").length,
    rows: [...document.querySelectorAll("[data-place-select]")].map((row) =>
      row.innerText.replace(/\s+/g, " ").trim()
    ),
    stats: document.querySelector("[data-travel-stats]")?.textContent,
    fragments: document.querySelectorAll("[data-fragment-grid] > *").length,
    brokenImages: [...document.images].filter(
      (image) =>
        image.getAttribute("src") &&
        image.complete &&
        image.naturalWidth === 0
    ).length,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
  }));

  async function inspectPlace(id) {
    await page.goto(`${site}/travel.html?check=${id}#${id}`, {
      waitUntil: "networkidle"
    });
    await page.waitForSelector('[data-story-id]');
    return page.evaluate(() => ({
      title: document.querySelector("#place-detail-title")?.textContent,
      spots: [...document.querySelectorAll(".spot-card, .scenery-card")].map(
        (card) => ({
          name: card.querySelector("h4")?.textContent,
          image: card.querySelector("img")?.getAttribute("src"),
          loaded: card.querySelector("img")?.naturalWidth > 0
        })
      ),
      foodTabs: document.querySelectorAll('[data-place-view="food"]').length,
      brokenImages: [...document.images].filter(
        (image) =>
          image.getAttribute("src") &&
          image.complete &&
          image.naturalWidth === 0
      ).length
    }));
  }

  const suzhou = await inspectPlace("suzhou");
  const nanjing = await inspectPlace("nanjing");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${site}/travel.html?mobile=1#suzhou`, {
    waitUntil: "networkidle"
  });
  const mobile = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth
  }));

  console.log(
    JSON.stringify({ overview, suzhou, nanjing, mobile, errors }, null, 2)
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
