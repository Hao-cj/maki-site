const fs = require("node:fs");

const base = "http://127.0.0.1:9233";
const site = "http://127.0.0.1:4173";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  let page;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const targets = await fetch(`${base}/json/list`).then((response) => response.json());
      page = targets.find((target) => target.type === "page");
      if (page) break;
    } catch {
      // Wait for Chrome.
    }
    await sleep(250);
  }
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
    await sleep(1700);
  }

  async function scrollTo(selector, offset = 80) {
    const position = await evaluate(`(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return null;
      const y = Math.max(0, element.getBoundingClientRect().top + window.scrollY - ${offset});
      window.scrollTo(0, y);
      return Math.round(y);
    })()`);
    await sleep(900);
    return position;
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await viewport(1440, 1100, false);

  await navigate("travel.html?v=place-tabs");
  console.log(
    `travel-desktop ${await evaluate(`JSON.stringify({
      places: document.querySelectorAll("[data-place-select]").length,
      tabs: document.querySelectorAll("[data-place-view]").length,
      title: document.querySelector("#place-detail-title")?.textContent,
      foodNav: [...document.querySelectorAll("nav a")].some((link) => link.getAttribute("href") === "./food.html"),
      vertical: [...document.querySelectorAll("[data-place-select]")].every((row, index, rows) => index === 0 || row.getBoundingClientRect().top > rows[index - 1].getBoundingClientRect().top),
      horizontalOverflow: document.body.scrollWidth > window.innerWidth,
      brokenImages: [...document.images].filter((image) => image.getAttribute("src") && image.complete && image.naturalWidth === 0).length
    })`)}`
  );
  await scrollTo("#destinations", 30);
  await screenshot("places-desktop");

  await evaluate("document.querySelector('[data-place-select=\"braies\"]').click()");
  await sleep(700);
  console.log(
    `place-select ${await evaluate(
      "JSON.stringify({title:document.querySelector('#place-detail-title')?.textContent,hash:location.hash,sceneryHidden:document.querySelector('[data-place-panel=\"scenery\"]')?.hidden,foodHidden:document.querySelector('[data-place-panel=\"food\"]')?.hidden})"
    )}`
  );
  await scrollTo("#destinations", 30);
  await screenshot("place-scenery-desktop");

  await evaluate("document.querySelector('[data-place-view=\"food\"]').click()");
  await sleep(500);
  console.log(
    `food-tab ${await evaluate(
      "JSON.stringify({hash:location.hash,selected:document.querySelector('[data-place-view=\"food\"]')?.getAttribute('aria-selected'),foodHidden:document.querySelector('[data-place-panel=\"food\"]')?.hidden,tastes:document.querySelectorAll('[data-place-panel=\"food\"] .place-taste').length})"
    )}`
  );
  await scrollTo("#destinations", 30);
  await screenshot("place-food-desktop");

  await evaluate("document.querySelector('[data-place-view=\"scenery\"]').click()");
  await sleep(250);
  await evaluate("document.querySelector('[data-open-story]').click()");
  await sleep(450);
  console.log(
    `dialog ${await evaluate(
      "JSON.stringify({open:document.querySelector('[data-story-dialog]').open,title:document.querySelector('[data-dialog-title]').textContent})"
    )}`
  );
  await screenshot("place-dialog-desktop");
  await evaluate("document.querySelector('[data-dialog-close]').click()");

  await viewport(390, 844, true);
  await navigate("travel.html?v=place-tabs-mobile");
  console.log(
    `travel-mobile ${await evaluate(`JSON.stringify({
      places: document.querySelectorAll("[data-place-select]").length,
      vertical: [...document.querySelectorAll("[data-place-select]")].every((row, index, rows) => index === 0 || row.getBoundingClientRect().top > rows[index - 1].getBoundingClientRect().top),
      horizontalOverflow: document.body.scrollWidth > window.innerWidth,
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth
    })`)}`
  );
  await scrollTo("#destinations", 24);
  await screenshot("places-mobile");

  const mobileScrollBefore = await evaluate("Math.round(window.scrollY)");
  await evaluate("document.querySelector('[data-place-select=\"braies\"]').click()");
  await sleep(900);
  console.log(
    `mobile-place-jump ${await evaluate(
      `JSON.stringify({before:${mobileScrollBefore},after:Math.round(window.scrollY),title:document.querySelector('#place-detail-title')?.textContent})`
    )}`
  );
  await evaluate("document.querySelector('[data-place-view=\"food\"]').click()");
  await sleep(350);
  await scrollTo(".place-detail", 64);
  await screenshot("place-food-mobile");

  await navigate("index.html?v=place-tabs");
  console.log(
    `home ${await evaluate(
      "JSON.stringify({categories:document.querySelectorAll('.category-row').length,chapters:document.querySelectorAll('[data-home-chapters] a').length,foodNav:[...document.querySelectorAll('nav a')].some((link)=>link.getAttribute('href')==='./food.html'),horizontalOverflow:document.body.scrollWidth>window.innerWidth,bodyWidth:document.body.scrollWidth,viewportWidth:window.innerWidth,brokenImages:[...document.images].filter((image)=>image.getAttribute('src')&&image.complete&&image.naturalWidth===0).length})"
    )}`
  );

  await navigate("recommendations.html?v=place-tabs");
  console.log(
    `feed ${await evaluate(
      "JSON.stringify({items:document.querySelectorAll('[data-feed-category]').length,foodNav:[...document.querySelectorAll('nav a')].some((link)=>link.getAttribute('href')==='./food.html'),brokenImages:[...document.images].filter((image)=>image.getAttribute('src')&&image.complete&&image.naturalWidth===0).length})"
    )}`
  );

  await navigate("food.html?v=place-tabs");
  console.log(`food-redirect ${await evaluate("location.pathname")}`);

  console.log(`exceptions ${JSON.stringify(exceptions)}`);
  ws.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
