const fs = require("node:fs");

const base = "http://127.0.0.1:9233";
const site = "http://127.0.0.1:4173";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const targets = await fetch(`${base}/json/list`).then((response) => response.json());
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error("No DevTools page target.");

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  const exceptions = [];
  let id = 0;

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") {
      exceptions.push(message.params.exceptionDetails.text);
    }
    if (!message.id || !pending.has(message.id)) return;
    const promise = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) promise.reject(new Error(JSON.stringify(message.error)));
    else promise.resolve(message.result);
  });

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  function send(method, params = {}) {
    id += 1;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const result = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  }

  async function screenshot(name) {
    const result = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false
    });
    fs.writeFileSync(`D:/website_jh/previews/${name}.png`, Buffer.from(result.data, "base64"));
  }

  async function viewport(width, height, mobile) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
      screenWidth: width,
      screenHeight: height
    });
  }

  async function navigate(path) {
    await send("Page.navigate", { url: `${site}/${path}` });
    await sleep(2200);
  }

  async function scrollTo(selector, offset = 80) {
    await evaluate(`(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return null;
      const y = Math.max(0, element.getBoundingClientRect().top + window.scrollY - ${offset});
      window.scrollTo(0, y);
      return Math.round(y);
    })()`);
    await sleep(500);
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await viewport(1440, 1100, false);
  await navigate("travel.html?v=wuxing-desktop");

  console.log(
    `initial ${await evaluate(`JSON.stringify({
      liuzhouRow: [...document.querySelectorAll("[data-place-select]")].find((row) => row.dataset.placeSelect === "liuzhou")?.innerText.replace(/\\s+/g, " ").trim(),
      stats: document.querySelector("[data-travel-stats]")?.textContent,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    })`)}`
  );

  await evaluate(`document.querySelector('[data-place-select="liuzhou"]').click()`);
  await sleep(450);
  console.log(
    `liuzhou ${await evaluate(`JSON.stringify({
      tab: document.querySelector('[data-place-view="scenery"]')?.innerText.replace(/\\s+/g, " ").trim(),
      spotCards: document.querySelectorAll(".spot-card").length,
      spots: [...document.querySelectorAll(".spot-card")].map((card) => ({
        id: card.dataset.storyId,
        title: card.querySelector("h4")?.textContent,
        place: card.querySelector(".spot-card__place")?.textContent.replace(/\\s+/g, " ").trim(),
        image: card.querySelector("img")?.getAttribute("src"),
        imageWidth: card.querySelector("img")?.naturalWidth,
        imageHeight: card.querySelector("img")?.naturalHeight
      })),
      foodMeta: document.querySelector(".place-taste__meta")?.textContent.replace(/\\s+/g, " ").trim()
    })`)}`
  );

  await scrollTo(".spot-grid", 90);
  await screenshot("_wuxing-desktop");

  await evaluate(`document.querySelector('[data-story-id="liuzhou-wuxing-street"] [data-open-story]').click()`);
  await sleep(450);
  console.log(
    `dialog ${await evaluate(`JSON.stringify({
      open: document.querySelector("[data-story-dialog]")?.open,
      title: document.querySelector("[data-dialog-title]")?.textContent,
      meta: document.querySelector("[data-dialog-meta]")?.textContent
    })`)}`
  );
  await screenshot("_wuxing-dialog");
  await evaluate(`document.querySelector("[data-dialog-close]").click()`);

  await viewport(390, 844, true);
  await navigate("travel.html?v=wuxing-mobile");
  await evaluate(`document.querySelector('[data-place-select="liuzhou"]').click()`);
  await sleep(900);
  await scrollTo(".spot-grid", 70);
  await evaluate(`document.querySelector('[data-story-id="liuzhou-wuxing-street"]').scrollIntoView({ block: "center" })`);
  await sleep(350);
  console.log(
    `mobile ${await evaluate(`JSON.stringify({
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      spotCards: document.querySelectorAll(".spot-card").length,
      gridColumns: getComputedStyle(document.querySelector(".spot-grid")).gridTemplateColumns
    })`)}`
  );
  await screenshot("_wuxing-mobile");

  console.log(`exceptions ${JSON.stringify(exceptions)}`);
  ws.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
