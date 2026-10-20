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

  async function revealExhibition() {
    for (let index = 0; index < 7; index += 1) {
      await page.locator(`[data-story-start="${index}"]`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(180);
    }
    await page.locator("#fragments").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
  }

  await page.goto(`${site}/travel.html?exhibition=1#fragments`, {
    waitUntil: "networkidle"
  });
  await page.waitForSelector('[data-story-start="6"]');
  await revealExhibition();
  const section = page.locator("#fragments");
  await section.screenshot({ path: "previews/exhibition-desktop.png" });

  const desktop = await page.evaluate(() => ({
    title: document.querySelector("#fragments-title")?.textContent
      .replace(/\s+/g, " ")
      .trim(),
    figures: document.querySelectorAll("[data-fragment-grid] .fragment").length,
    imagesLoaded: [...document.querySelectorAll("[data-fragment-grid] img")].every(
      (image) => image.complete && image.naturalWidth > 0
    ),
    layouts: [...document.querySelectorAll("[data-fragment-grid] .fragment")].map(
      (figure) => getComputedStyle(figure).gridColumn
    ),
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
  }));

  await page.locator('[data-story-start="3"]').click();
  await page.waitForTimeout(750);
  const dialogFirst = await page.evaluate(() => ({
    open: document.querySelector("[data-story-dialog]")?.open,
    photoMode: document.querySelector("[data-story-dialog]")?.classList.contains("is-photo"),
    title: document.querySelector("[data-dialog-title]")?.textContent,
    meta: document.querySelector("[data-dialog-meta]")?.textContent,
    kicker: document.querySelector("[data-dialog-kicker]")?.textContent,
    count: document.querySelector("[data-dialog-count]")?.textContent,
    thumbs: document.querySelectorAll(".story-dialog__thumb").length
  }));
  await page.screenshot({ path: "previews/exhibition-dialog.png" });
  await page.locator("[data-dialog-next]").click();
  await page.waitForTimeout(650);
  const dialogSecond = await page.evaluate(() => ({
    title: document.querySelector("[data-dialog-title]")?.textContent,
    count: document.querySelector("[data-dialog-count]")?.textContent,
    caption: document.querySelector("[data-dialog-caption]")?.textContent
  }));
  await page.locator("[data-dialog-close]").click();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${site}/travel.html?exhibition=mobile#fragments`, {
    waitUntil: "networkidle"
  });
  await page.waitForSelector('[data-story-start="6"]');
  await revealExhibition();
  await page.locator("#fragments").screenshot({
    path: "previews/exhibition-mobile.png"
  });
  const mobile = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    gridDisplay: getComputedStyle(document.querySelector("[data-fragment-grid]"))
      .display,
    works: [...document.querySelectorAll("[data-fragment-grid] .fragment")].map(
      (figure) => ({
        index: figure.dataset.storyStart,
        visible: figure.classList.contains("is-visible"),
        loaded: figure.querySelector("img")?.naturalWidth > 0,
        height: Math.round(figure.getBoundingClientRect().height)
      })
    )
  }));

  console.log(
    JSON.stringify({ desktop, dialogFirst, dialogSecond, mobile, errors }, null, 2)
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
