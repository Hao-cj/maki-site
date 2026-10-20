const content = window.SITE_CONTENT || {};
const categories = Array.isArray(content.categories) ? content.categories : [];
const foodContent = content.food || {};
const travelContent = content.travel || {};
const recommendationContent = content.recommendations || {};
const stories = Array.isArray(travelContent.stories) ? travelContent.stories : [];
const destinations = Array.isArray(travelContent.destinations)
  ? travelContent.destinations
  : [];
const fragments = Array.isArray(travelContent.fragments) ? travelContent.fragments : [];
const destinationStories = destinations.flatMap((destination) =>
  getDestinationSpots(destination).map((spot) => ({
    id: spotStoryId(destination, spot),
    title: spot.scenery?.title || spot.name || destination.name,
    location:
      spot.name && spot.name !== destination.name
        ? `${destination.name} · ${spot.name}`
        : destination.region || destination.name,
    date: spot.scenery?.date || destination.date,
    coords: destination.coords,
    image: spot.scenery?.image,
    alt: spot.scenery?.alt || spot.name || destination.name,
    gallery: spot.scenery?.gallery || [],
    paragraphs: spot.scenery?.paragraphs || []
  }))
);
const foodStories = destinations.flatMap((destination) =>
  getDestinationFoodItems(destination).flatMap((item, index) => {
    const gallery = Array.isArray(item.gallery)
      ? item.gallery.filter((galleryItem) => galleryItem?.image)
      : [];
    const image = item.image || gallery[0]?.image;
    const detailGallery =
      gallery.length > 0
        ? gallery
        : image
          ? [{ image, alt: item.alt || item.title, caption: "" }]
          : [];

    return [
      {
        id: foodStoryId(destination, index),
        title: item.title,
        location: `${destination.name} · 美食`,
        date: destination.date,
        coords: destination.coords,
        image,
        alt: item.alt || gallery[0]?.alt || item.title,
        gallery: detailGallery,
        paragraphs: item.note ? [item.note] : [],
        kind: "food"
      }
    ];
  })
);
const photoExhibitionStory = fragments.length
  ? {
      id: "photo-exhibition",
      title: "光的余温",
      location: "PHOTO EXHIBITION",
      date: "07 FRAMES · 黄昏之后",
      coords: "AN EXHIBITION IN STILLNESS",
      image: fragments[0].image,
      alt: fragments[0].alt || fragments[0].caption || "",
      gallery: fragments
        .filter((fragment) => fragment?.image)
        .map((fragment) => ({
          title: fragment.caption || "",
          image: fragment.image,
          alt: fragment.alt || fragment.caption || "",
          caption: fragment.caption || ""
        })),
      paragraphs: [
        "日落以后，光没有立刻离开。它在芦苇、屋檐和水面上多停了一会儿，也留在那些还不想回家的人身上。"
      ],
      kind: "photo"
    }
  : null;
const storyLookup = Object.fromEntries(
  [
    ...stories,
    ...destinationStories,
    ...foodStories,
    ...(photoExhibitionStory ? [photoExhibitionStory] : [])
  ].map((story) => [story.id, story])
);

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector("[data-header]");
const progressBar = document.querySelector("[data-progress-bar]");
const hero = document.querySelector("[data-hero]");
const heroImage = document.querySelector("[data-hero-image]");

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]
  );
}

function pageNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function formatCount(value) {
  return String(value).padStart(2, "0");
}

function renderCategories() {
  const categoryList = document.querySelector("[data-category-list]");
  const chapterNav = document.querySelector("[data-home-chapters]");

  if (categoryList) {
    categoryList.innerHTML = categories
      .map(
        (category, index) => `
          <a
            class="category-row"
            href="${escapeHtml(category.href)}"
            data-preview="${escapeHtml(category.image)}"
            data-preview-alt="${escapeHtml(category.imageAlt || "")}"
            data-preview-index="${escapeHtml(category.previewIndex || pageNumber(index))}"
            data-preview-caption="${escapeHtml(category.previewCaption || category.english || "")}"
          >
            <span class="category-row__number">${pageNumber(index)}</span>
            <span class="category-row__title">
              ${escapeHtml(category.label)}
              <small>${escapeHtml(category.english || "")}</small>
            </span>
            <span class="category-row__desc">${escapeHtml(category.description || "")}</span>
            <span class="category-row__meta">${escapeHtml(category.meta || "")}</span>
            <span class="category-row__arrow" aria-hidden="true">↗</span>
          </a>
        `
      )
      .join("");
  }

  if (chapterNav) {
    chapterNav.innerHTML = categories
      .map(
        (category, index) => `
          <a href="${escapeHtml(category.href)}">
            <span>${pageNumber(index)}</span>${escapeHtml(category.label)}
          </a>
        `
      )
      .join("");
  }
}

function renderFood() {
  const filterRoot = document.querySelector("[data-food-filters]");
  const grid = document.querySelector("[data-food-grid]");
  const filters = Array.isArray(foodContent.filters) ? foodContent.filters : [];
  const items = Array.isArray(foodContent.items) ? foodContent.items : [];

  if (filterRoot) {
    filterRoot.innerHTML = filters
      .map(
        (filter) => `
          <button
            class="${filter.value === "all" ? "is-active" : ""}"
            type="button"
            data-food-filter="${escapeHtml(filter.value)}"
            aria-pressed="${filter.value === "all" ? "true" : "false"}"
          >${escapeHtml(filter.label)}</button>
        `
      )
      .join("");
  }

  if (grid) {
    grid.innerHTML = items
      .map(
        (item, index) => `
          <article
            class="food-card${index === 2 ? " food-card--tall" : ""}"
            data-food-category="${escapeHtml(item.category)}"
            data-reveal
          >
            <div class="food-card__image">
              <img
                src="${escapeHtml(item.image)}"
                alt="${escapeHtml(item.alt || item.title)}"
                loading="lazy"
              />
              <span class="food-card__number" aria-hidden="true">${pageNumber(index)}</span>
            </div>
            <div class="food-card__body">
              <div>
                <p class="food-card__meta">
                  ${escapeHtml(item.location || "")} / ${escapeHtml(item.categoryLabel || "")}
                </p>
                <h3>${escapeHtml(item.title)}</h3>
                <p class="food-card__note">${escapeHtml(item.note || "")}</p>
              </div>
              <span class="food-card__repeat">${escapeHtml(item.repeat || "")}</span>
            </div>
          </article>
        `
      )
      .join("");
  }
}

function renderRecommendations() {
  const filterRoot = document.querySelector("[data-feed-filters]");
  const list = document.querySelector("[data-feed-list]");
  const filters = Array.isArray(recommendationContent.filters)
    ? recommendationContent.filters
    : [];
  const items = Array.isArray(recommendationContent.items)
    ? recommendationContent.items
    : [];

  if (filterRoot) {
    filterRoot.innerHTML = filters
      .map(
        (filter) => `
          <button
            class="${filter.value === "all" ? "is-active" : ""}"
            type="button"
            data-feed-filter="${escapeHtml(filter.value)}"
            aria-pressed="${filter.value === "all" ? "true" : "false"}"
          >${escapeHtml(filter.label)}</button>
        `
      )
      .join("");
  }

  if (!list) return;

  list.innerHTML = items
    .map((item) => {
      if (item.type === "quote") {
        return `
          <article
            class="feed-item feed-item--quote"
            data-feed-category="${escapeHtml(item.category)}"
            data-reveal
          >
            <div class="feed-item__meta">
              <span>${escapeHtml(item.categoryLabel || "")}</span>
              <time>${escapeHtml(item.date || "")}</time>
            </div>
            <div>
              <blockquote>${escapeHtml(item.quote || "")}</blockquote>
              <div class="feed-item__quote-foot">
                <span>${escapeHtml(item.attribution || "")}</span>
                <span>${escapeHtml(item.note || "")}</span>
              </div>
            </div>
          </article>
        `;
      }

      return `
        <article
          class="feed-item"
          data-feed-category="${escapeHtml(item.category)}"
          data-reveal
        >
          <div class="feed-item__meta">
            <span>${escapeHtml(item.categoryLabel || "")}</span>
            <time>${escapeHtml(item.date || "")}</time>
          </div>
          <a
            class="feed-item__main"
            href="${escapeHtml(item.url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.description || "")}</p>
            </div>
            <span class="feed-item__source">${escapeHtml(item.source || "")} ↗</span>
          </a>
        </article>
      `;
    })
    .join("");
}

function renderTravel() {
  const track = document.querySelector("[data-journey-track]");
  const fragmentGrid = document.querySelector("[data-fragment-grid]");

  if (track) {
    track.innerHTML = stories
      .map(
        (story) => `
          <article
            class="story-card"
            data-story-id="${escapeHtml(story.id)}"
            tabindex="0"
            aria-label="阅读${escapeHtml(story.title)}的旅行故事"
          >
            <img
              src="${escapeHtml(story.image)}"
              alt="${escapeHtml(story.alt || story.title)}"
              loading="lazy"
            />
            <div class="story-card__shade" aria-hidden="true"></div>
            <span class="story-card__number" aria-hidden="true">${escapeHtml(story.number || "")}</span>
            <div class="story-card__meta">
              <span>${escapeHtml(story.location || "")}</span>
              <span>${escapeHtml(story.date || "")}</span>
            </div>
            <div class="story-card__content">
              <p class="story-card__location">${escapeHtml(story.coords || "")}</p>
              <h3>${escapeHtml(story.title)}</h3>
              <p class="story-card__excerpt">${escapeHtml(story.excerpt || "")}</p>
              <button class="story-open" type="button" data-open-story>
                <span>阅读这段旅程</span>
                <span class="story-open__icon" aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        `
      )
      .join("");
  }

  if (fragmentGrid) {
    const layoutClasses = ["lead", "stack-a", "stack-b", "pair", "pair", "pair", "pair"];
    fragmentGrid.innerHTML = fragments
      .map(
        (fragment, index) => `
          ${
            fragment.chapter
              ? `<div class="fragment-chapter" data-reveal>
                  <span>${escapeHtml(fragment.chapter)}</span>
                  <i aria-hidden="true"></i>
                </div>`
              : ""
          }
          <figure
            class="fragment fragment--${layoutClasses[index] || "pair"}"
            data-story-id="photo-exhibition"
            data-story-start="${index}"
            tabindex="0"
            role="button"
            aria-label="查看摄影作品 ${index + 1}：${escapeHtml(fragment.caption || "")}"
            data-reveal
          >
            <div class="fragment__image">
              <picture>
                ${
                  fragment.preview
                    ? `<source srcset="${escapeHtml(fragment.preview)}" type="image/webp" />`
                    : ""
                }
                <img
                  src="${escapeHtml(fragment.image)}"
                  alt="${escapeHtml(fragment.alt || fragment.caption)}"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption>
              <span>${escapeHtml(
                `${String(index + 1).padStart(2, "0")} / ${fragment.caption || ""}`
              )}</span>
              <span>${escapeHtml(fragment.location || "")}</span>
            </figcaption>
          </figure>
        `
      )
      .join("");
  }
}

let activeDestinationId = destinations[0]?.id || "";
let activeDestinationView = "scenery";

function findDestination(id) {
  return destinations.find((destination) => destination.id === id);
}

function getDestinationSpots(destination) {
  if (Array.isArray(destination.spots) && destination.spots.length) {
    return destination.spots;
  }

  if (!destination.scenery) return [];

  return [
    {
      id: destination.id,
      name: destination.name,
      scenery: destination.scenery
    }
  ];
}

function getDestinationFoodItems(destination) {
  return Array.isArray(destination.food?.items) ? destination.food.items : [];
}

function spotStoryId(destination, spot) {
  return spot.id === destination.id ? destination.id : `${destination.id}-${spot.id}`;
}

function foodStoryId(destination, index) {
  return `food-${destination.id}-${index}`;
}

function renderPlaceList() {
  const list = document.querySelector("[data-place-list]");
  if (!list) return;

  list.innerHTML = destinations
    .map((destination, index) => {
      const spots = getDestinationSpots(destination);
      const foodItems = getDestinationFoodItems(destination);
      const hasFood = foodItems.length > 0;

      return `
        <a
          class="place-row"
          href="#${escapeHtml(destination.id)}"
          data-place-select="${escapeHtml(destination.id)}"
          aria-label="查看${escapeHtml(destination.name)}的${hasFood ? "景色与美食" : "景色记录"}"
        >
          <span class="place-row__num" aria-hidden="true">${escapeHtml(destination.number || pageNumber(index))}</span>
          <span class="place-row__main">
            <strong>${escapeHtml(destination.name)}</strong>
            <small>${escapeHtml(destination.region || "")}</small>
          </span>
          <span class="place-row__date">${escapeHtml(destination.date || "")}</span>
          <span class="place-row__counts">
            <span>景色 ${formatCount(spots.length)}</span>
            <span>${hasFood ? `美食 ${formatCount(foodItems.length)}` : "美食 —"}</span>
          </span>
          <span class="place-row__arrow" aria-hidden="true">↗</span>
        </a>
      `;
    })
    .join("");
}

function updatePlaceListSelection() {
  document.querySelectorAll("[data-place-select]").forEach((link) => {
    const active = link.dataset.placeSelect === activeDestinationId;
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderPlaceDetail() {
  const detail = document.querySelector("[data-place-detail]");
  const destination = findDestination(activeDestinationId);
  if (!detail || !destination) return;

  const spots = getDestinationSpots(destination);
  const food = destination.food || {};
  const foodItems = getDestinationFoodItems(destination);
  const hasFood = foodItems.length > 0;
  const foodTitle = destination.foodTitle || "美食";
  if (!hasFood) activeDestinationView = "scenery";
  const sceneryActive = activeDestinationView !== "food";
  const foodActive = hasFood && activeDestinationView === "food";

  const sceneryMarkup =
    spots.length === 1
      ? (() => {
          const spot = spots[0];
          const scenery = spot.scenery || {};

          return `
            <article
              class="scenery-card"
              data-story-id="${escapeHtml(spotStoryId(destination, spot))}"
              tabindex="0"
              aria-label="阅读${escapeHtml(spot.name || destination.name)}的景色笔记"
            >
              <img
                src="${escapeHtml(scenery.image || "")}"
                alt="${escapeHtml(scenery.alt || spot.name || destination.name)}"
                loading="lazy"
              />
              <div class="scenery-card__shade" aria-hidden="true"></div>
              <div class="scenery-card__label">
                <span>01 / SCENERY</span>
                <span>${escapeHtml(spot.foodNote || "景色")}</span>
              </div>
              <div class="scenery-card__content">
                <p class="scenery-card__meta">
                  ${escapeHtml(destination.coords || "")} / ${escapeHtml(scenery.note || "")}
                </p>
                <h4>${escapeHtml(scenery.title || spot.name || destination.name)}</h4>
                <p class="scenery-card__excerpt">${escapeHtml(scenery.excerpt || "")}</p>
                <button class="scenery-open" type="button" data-open-story>
                  <span>翻开景色笔记</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          `;
        })()
      : `
        <div class="spot-grid">
          ${spots
            .map((spot, index) => {
              const scenery = spot.scenery || {};
              const galleryCount = Array.isArray(scenery.gallery) ? scenery.gallery.length : 0;
              const featureClass =
                spots.length > 1 && spots.length % 2 === 1 && index === spots.length - 1
                  ? " spot-card--feature"
                  : "";

              return `
                <article
                  class="spot-card${featureClass}"
                  data-story-id="${escapeHtml(spotStoryId(destination, spot))}"
                  tabindex="0"
                  aria-label="阅读${escapeHtml(spot.name || destination.name)}的景色笔记"
                >
                  <div class="spot-card__image">
                    <img
                      src="${escapeHtml(scenery.image || "")}"
                      alt="${escapeHtml(scenery.alt || spot.name || destination.name)}"
                      loading="lazy"
                    />
                    <span class="spot-card__number" aria-hidden="true">${formatCount(index + 1)}</span>
                    ${
                      spot.foodNote
                        ? `<span class="spot-card__badge">${escapeHtml(spot.foodNote)}</span>`
                        : galleryCount > 1
                          ? `<span class="spot-card__badge">${formatCount(galleryCount)} PHOTOS</span>`
                        : ""
                    }
                  </div>
                  <div class="spot-card__body">
                    <p class="spot-card__meta">
                      ${escapeHtml(destination.coords || "")} / ${escapeHtml(scenery.note || "")}
                    </p>
                    <p class="spot-card__place">
                      ${escapeHtml(destination.name)} · ${escapeHtml(spot.name || "")}
                    </p>
                    <h4>${escapeHtml(scenery.title || spot.name || destination.name)}</h4>
                    <p class="spot-card__excerpt">${escapeHtml(scenery.excerpt || "")}</p>
                    <button class="spot-card__open" type="button" data-open-story>
                      <span>${galleryCount > 1 ? `翻开相册 · ${formatCount(galleryCount)} 张` : "翻开景色笔记"}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      `;

  detail.innerHTML = `
    <article class="place-detail__card${destination.heroImage ? " place-detail__card--media" : ""}"${destination.heroImage ? ` style="--place-hero-image: url('${escapeHtml(destination.heroImage)}')"` : ""}>
      <header class="place-detail__head">
        <div class="place-detail__meta">
          <span>${escapeHtml(destination.number || "")} / ${formatCount(destinations.length)}</span>
          <span>${escapeHtml(destination.region || "")} / ${escapeHtml(destination.date || "")}</span>
        </div>
        <h3 id="place-detail-title">${escapeHtml(destination.name)}</h3>
        <p>${escapeHtml(destination.intro || "")}</p>
      </header>

      <div class="place-tabs" role="tablist" aria-label="${escapeHtml(destination.name)}内容">
        <button
          class="place-tab${sceneryActive ? " is-active" : ""}"
          type="button"
          role="tab"
          id="place-tab-scenery"
          aria-controls="place-panel-scenery"
          aria-selected="${sceneryActive}"
          tabindex="${sceneryActive ? "0" : "-1"}"
          data-place-view="scenery"
        >
          <span class="place-tab__index">01</span>
          <span class="place-tab__label">景色<small>SCENERY · ${formatCount(spots.length)}</small></span>
          <span class="place-tab__arrow" aria-hidden="true">↘</span>
        </button>
        ${
          hasFood
            ? `
              <button
                class="place-tab${foodActive ? " is-active" : ""}${foodTitle.length > 3 ? " place-tab--long" : ""}"
                type="button"
                role="tab"
                id="place-tab-food"
                aria-controls="place-panel-food"
                aria-selected="${foodActive}"
                tabindex="${foodActive ? "0" : "-1"}"
                data-place-view="food"
              >
                <span class="place-tab__index">02</span>
                <span class="place-tab__label">${escapeHtml(foodTitle)}<small>TASTE · ${formatCount(foodItems.length)}</small></span>
                <span class="place-tab__arrow" aria-hidden="true">↘</span>
              </button>
            `
            : ""
        }
      </div>

      <div
        class="place-panel"
        id="place-panel-scenery"
        role="tabpanel"
        aria-labelledby="place-tab-scenery"
        data-place-panel="scenery"
        ${sceneryActive ? "" : "hidden"}
      >
        ${sceneryMarkup}
      </div>

      ${
        hasFood
          ? `
            <div
              class="place-panel"
              id="place-panel-food"
              role="tabpanel"
              aria-labelledby="place-tab-food"
              data-place-panel="food"
              ${foodActive ? "" : "hidden"}
            >
              <div class="place-food place-food--detail">
                <div class="place-food__head">
                  <div>
                    <span class="place-food__label">02 / TASTE</span>
                    <h4>${escapeHtml(foodTitle)}</h4>
                  </div>
                  <p>${escapeHtml(food.note || "")}</p>
                </div>

                <div class="place-food__list">
                  ${foodItems
                    .map((item, foodIndex) => {
                      const meta = [item.place, item.type, item.near ? `近${item.near}` : ""]
                        .filter(Boolean)
                        .join(" / ");
                      const galleryCount = Array.isArray(item.gallery) ? item.gallery.length : 0;
                      const hasGallery = galleryCount > 1;
                      const isFeature =
                        foodItems.length % 2 === 1 && foodIndex === foodItems.length - 1;

                      return `
                        <article
                          class="place-taste place-taste--interactive${isFeature ? " place-taste--feature" : ""}"
                          data-story-id="${escapeHtml(foodStoryId(destination, foodIndex))}"
                          tabindex="0"
                          aria-label="展开${escapeHtml(item.title)}详情"
                        >
                          <div class="place-taste__image">
                            <img
                              src="${escapeHtml(item.image || "")}"
                              alt="${escapeHtml(item.alt || item.title)}"
                              loading="lazy"
                            />
                            <span aria-hidden="true">${pageNumber(foodIndex)}</span>
                            ${
                              hasGallery
                                ? `<small class="place-taste__badge">${formatCount(galleryCount)} PHOTOS</small>`
                                : ""
                            }
                          </div>
                          <div class="place-taste__body">
                            <p class="place-taste__meta">${escapeHtml(meta)}</p>
                            <h5>${escapeHtml(item.title)}</h5>
                            <p class="place-taste__note">${escapeHtml(item.note || "")}</p>
                            ${
                              item.repeat
                                ? `<span class="place-taste__repeat">${escapeHtml(item.repeat)}</span>`
                                : ""
                            }
                            <button class="place-taste__open" type="button" data-open-story>
                              <span>${hasGallery ? `翻开这顿的味道 · ${formatCount(galleryCount)} 张` : "展开这顿的味道"}</span>
                              <span aria-hidden="true">↗</span>
                            </button>
                          </div>
                        </article>
                      `;
                    })
                    .join("")}
                </div>
              </div>
            </div>
          `
          : ""
      }
    </article>
  `;
}

function destinationHash(view = activeDestinationView) {
  if (!activeDestinationId) return "";
  return view === "food" ? `${activeDestinationId}-food` : activeDestinationId;
}

function parseDestinationHash(hash = window.location.hash) {
  const raw = decodeURIComponent(hash.replace(/^#/, ""));
  if (!raw) return null;

  const foodRoute = raw.endsWith("-food");
  const id = foodRoute ? raw.slice(0, -5) : raw;
  const destination = findDestination(id);
  if (!destination) return null;

  return { id: destination.id, view: foodRoute ? "food" : "scenery" };
}

function writeDestinationHash(view, mode) {
  if (!mode || !activeDestinationId) return;
  const url = `${window.location.pathname}${window.location.search}#${destinationHash(view)}`;
  const state = { destinationId: activeDestinationId, view };

  if (mode === "push") {
    window.history.pushState(state, "", url);
  } else if (mode === "replace") {
    window.history.replaceState(state, "", url);
  }
}

function scrollToPlaceDetail() {
  if (!window.matchMedia("(max-width: 980px)").matches) return;
  const detail = document.querySelector("[data-place-detail]");
  if (!detail) return;
  const top = detail.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}

function setPlaceView(view, options = {}) {
  const detail = document.querySelector("[data-place-detail]");
  const destination = findDestination(activeDestinationId);
  if (!detail || !destination) return;

  const canShowFood = getDestinationFoodItems(destination).length > 0;
  const nextView = view === "food" && canShowFood ? "food" : "scenery";
  activeDestinationView = nextView;

  detail.querySelectorAll("[data-place-view]").forEach((tab) => {
    const active = tab.dataset.placeView === nextView;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  detail.querySelectorAll("[data-place-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.placePanel !== nextView;
  });

  writeDestinationHash(nextView, options.historyMode);

  if (options.focusTab) {
    detail.querySelector(`[data-place-view="${nextView}"]`)?.focus();
  }
}

function selectDestination(id, view = "scenery", options = {}) {
  const destination = findDestination(id);
  if (!destination) return;

  const canShowFood = getDestinationFoodItems(destination).length > 0;
  const nextView = view === "food" && canShowFood ? "food" : "scenery";
  const changed = activeDestinationId !== id;
  activeDestinationId = id;
  activeDestinationView = nextView;

  if (changed || !document.querySelector("[data-place-detail]")?.children.length) {
    renderPlaceDetail();
    updatePlaceListSelection();
  } else {
    setPlaceView(nextView, { historyMode: false });
  }

  writeDestinationHash(nextView, options.historyMode);

  if (options.scroll) {
    scrollToPlaceDetail();
  }
}

function renderTravelStats() {
  if (!destinations.length) return;

  const spotCount = destinations.reduce(
    (total, destination) => total + getDestinationSpots(destination).length,
    0
  );
  const foodCount = destinations.reduce(
    (total, destination) => total + getDestinationFoodItems(destination).length,
    0
  );
  const destinationLabel = `${formatCount(destinations.length)} DESTINATIONS`;
  const stats = `${destinationLabel} / ${formatCount(spotCount)} SCENERIES / ${formatCount(foodCount)} TASTES`;

  document.querySelectorAll("[data-travel-stats]").forEach((element) => {
    element.textContent = stats;
  });
  document.querySelectorAll("[data-destination-count]").forEach((element) => {
    element.textContent = destinationLabel;
  });
  document.querySelectorAll("[data-destinations-stats]").forEach((element) => {
    element.textContent = `${destinationLabel} / 2023—2026`;
  });
}

function renderDestinations() {
  if (!destinations.length) return;

  const initialRoute = parseDestinationHash();
  activeDestinationId = initialRoute?.id || destinations[0].id;
  activeDestinationView = initialRoute?.view || "scenery";
  const initialDestination = findDestination(activeDestinationId);
  if (
    activeDestinationView === "food" &&
    initialDestination &&
    !getDestinationFoodItems(initialDestination).length
  ) {
    activeDestinationView = "scenery";
  }

  renderTravelStats();
  renderPlaceList();
  updatePlaceListSelection();
  renderPlaceDetail();
}

renderCategories();
renderFood();
renderRecommendations();
renderTravel();
renderDestinations();

function updateScroll() {
  const scrollTop = window.scrollY;
  const scrollable = root.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

  if (progressBar) {
    progressBar.style.transform = `scaleX(${progress})`;
  }

  if (header) {
    header.classList.toggle("is-scrolled", scrollTop > 48);
  }

  if (heroImage && !reduceMotion) {
    heroImage.style.transform = `scale(1.055) translate3d(0, ${Math.min(scrollTop * 0.11, 90)}px, 0)`;
  }
}

let scrollTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  },
  { passive: true }
);

if (hero) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--mx", `${x}%`);
    hero.style.setProperty("--my", `${y}%`);
  });
}

const categoryRows = document.querySelectorAll("[data-preview]");
const categoryPreview = document.querySelector(".category-preview");
const categoryPreviewImage = document.querySelector("[data-category-preview]");
const categoryPreviewIndex = document.querySelector("[data-category-index]");
const categoryPreviewCaption = document.querySelector("[data-category-caption]");
let categorySwitchTimer;

function applyCategoryPreview(row) {
  if (!row) return;
  if (categoryPreviewImage) {
    categoryPreviewImage.src = row.dataset.preview;
    categoryPreviewImage.alt = row.dataset.previewAlt || "";
  }
  if (categoryPreviewIndex) {
    categoryPreviewIndex.textContent = row.dataset.previewIndex || "";
  }
  if (categoryPreviewCaption) {
    categoryPreviewCaption.textContent = row.dataset.previewCaption || "";
  }
}

function updateCategoryPreview(row) {
  if (!categoryPreview || !categoryPreviewImage) return;
  window.clearTimeout(categorySwitchTimer);
  categoryPreview.classList.add("is-switching");
  categorySwitchTimer = window.setTimeout(() => {
    applyCategoryPreview(row);
    categoryPreview.classList.remove("is-switching");
  }, 130);
}

if (categoryRows.length) {
  applyCategoryPreview(categoryRows[0]);
}

categoryRows.forEach((row) => {
  row.addEventListener("pointerenter", () => updateCategoryPreview(row));
  row.addEventListener("focus", () => updateCategoryPreview(row));
});

const foodFilterButtons = document.querySelectorAll("[data-food-filter]");
const foodCards = document.querySelectorAll("[data-food-category]");

foodFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.foodFilter;
    foodFilterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    foodCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.foodCategory !== filter;
    });
  });
});

const feedFilterButtons = document.querySelectorAll("[data-feed-filter]");
const feedItems = document.querySelectorAll("[data-feed-category]");

feedFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.feedFilter;
    feedFilterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    feedItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.feedCategory !== filter;
    });
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const placeList = document.querySelector("[data-place-list]");

if (placeList) {
  document.addEventListener("click", (event) => {
    const placeLink = event.target.closest("[data-place-select]");
    if (placeLink) {
      event.preventDefault();
      selectDestination(placeLink.dataset.placeSelect, "scenery", {
        historyMode: "push",
        scroll: true
      });
      return;
    }

    const viewTab = event.target.closest("[data-place-view]");
    if (viewTab) {
      event.preventDefault();
      setPlaceView(viewTab.dataset.placeView, { historyMode: "replace" });
    }
  });

  document.addEventListener("keydown", (event) => {
    const viewTab = event.target.closest("[data-place-view]");
    if (!viewTab) return;

    const detail = viewTab.closest("[data-place-detail]");
    const viewOrder = detail
      ? [...detail.querySelectorAll("[data-place-view]")].map((tab) => tab.dataset.placeView)
      : ["scenery"];
    if (!viewOrder.length) return;

    const currentIndex = viewOrder.indexOf(viewTab.dataset.placeView);
    let nextView = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextView = viewOrder[(currentIndex + 1) % viewOrder.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextView = viewOrder[(currentIndex - 1 + viewOrder.length) % viewOrder.length];
    } else if (event.key === "Home") {
      nextView = viewOrder[0];
    } else if (event.key === "End") {
      nextView = viewOrder[viewOrder.length - 1];
    }

    if (!nextView) return;
    event.preventDefault();
    setPlaceView(nextView, { historyMode: "replace", focusTab: true });
  });

  function applyDestinationRoute() {
    const route = parseDestinationHash();
    if (!route) return;
    selectDestination(route.id, route.view, { historyMode: false });
  }

  window.addEventListener("popstate", applyDestinationRoute);
  window.addEventListener("hashchange", applyDestinationRoute);
}

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });
}

const track = document.querySelector("[data-track]");
const previousButton = document.querySelector("[data-track-prev]");
const nextButton = document.querySelector("[data-track-next]");

function trackStep() {
  if (!track) return 0;
  const card = track.querySelector(".story-card");
  return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
}

if (track) {
  previousButton?.addEventListener("click", () => {
    track.scrollBy({ left: -trackStep(), behavior: "smooth" });
  });

  nextButton?.addEventListener("click", () => {
    track.scrollBy({ left: trackStep(), behavior: "smooth" });
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      track.scrollBy({ left: -trackStep(), behavior: "smooth" });
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      track.scrollBy({ left: trackStep(), behavior: "smooth" });
    }
  });

  let pointerDown = false;
  let pointerId = null;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.target.closest("button")) return;
    pointerDown = true;
    moved = false;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!pointerDown || event.pointerId !== pointerId) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 4) moved = true;
    track.scrollLeft = startScroll - distance;
  });

  function endPointer(event) {
    if (!pointerDown || event.pointerId !== pointerId) return;
    pointerDown = false;
    track.classList.remove("is-dragging");
    if (moved) {
      track.dataset.suppressClick = "true";
      window.setTimeout(() => {
        delete track.dataset.suppressClick;
      }, 0);
    }
    if (track.hasPointerCapture(pointerId)) {
      track.releasePointerCapture(pointerId);
    }
    pointerId = null;
  }

  track.addEventListener("pointerup", endPointer);
  track.addEventListener("pointercancel", endPointer);
}

const dialog = document.querySelector("[data-story-dialog]");
const dialogStage = document.querySelector("[data-dialog-stage]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogImageNext = document.querySelector("[data-dialog-image-next]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogMeta = document.querySelector("[data-dialog-meta]");
const dialogCoords = document.querySelector("[data-dialog-coords]");
const dialogKicker = document.querySelector("[data-dialog-kicker]");
const dialogText = document.querySelector("[data-dialog-text]");
const dialogPrev = document.querySelector("[data-dialog-prev]");
const dialogNext = document.querySelector("[data-dialog-next]");
const dialogCount = document.querySelector("[data-dialog-count]");
const dialogCaption = document.querySelector("[data-dialog-caption]");
const dialogThumbs = document.querySelector("[data-dialog-thumbs]");
const dialogClose = document.querySelector("[data-dialog-close]");
let dialogGallery = [];
let dialogGalleryIndex = 0;
let galleryPointerStart = null;
let activeDialogLayer = 0;
let dialogImageRequest = 0;
const galleryPreloadCache = new Map();

function getStoryGallery(story) {
  const gallery = Array.isArray(story.gallery)
    ? story.gallery.filter((item) => item?.image)
    : [];

  if (gallery.length) return gallery;

  return story.image
    ? [{ image: story.image, alt: story.alt || story.title, caption: "" }]
    : [];
}

function preloadGalleryItem(item) {
  if (!item?.image || galleryPreloadCache.has(item.image)) return;

  const preload = new Image();
  preload.decoding = "async";
  preload.src = item.image;
  preload.decode?.().catch(() => {});
  galleryPreloadCache.set(item.image, preload);
}

function resetDialogImages() {
  dialogImageRequest += 1;
  [dialogImage, dialogImageNext].filter(Boolean).forEach((layer, index) => {
    layer.classList.remove("is-visible");
    layer.removeAttribute("src");
    layer.alt = "";
    if (index === 0) {
      layer.removeAttribute("aria-hidden");
    } else {
      layer.setAttribute("aria-hidden", "true");
    }
  });
  activeDialogLayer = 0;
}

function showDialogImage(item, { immediate = false } = {}) {
  const layers = [dialogImage, dialogImageNext].filter(Boolean);
  if (!layers.length) return;

  const requestId = ++dialogImageRequest;
  const currentLayer = layers[activeDialogLayer] || layers[0];
  const incomingIndex = layers.length > 1 ? 1 - activeDialogLayer : 0;
  const incomingLayer = layers[incomingIndex] || currentLayer;

  incomingLayer.src = item.image;
  incomingLayer.alt = item.alt || dialogTitle?.textContent || "";
  incomingLayer.removeAttribute("aria-hidden");

  const reveal = () => {
    if (requestId !== dialogImageRequest) return;
    incomingLayer.classList.add("is-visible");
    currentLayer?.classList.remove("is-visible");
    currentLayer?.setAttribute("aria-hidden", "true");
    activeDialogLayer = incomingIndex;
  };

  if (immediate || layers.length === 1) {
    reveal();
    return;
  }

  const decoded = incomingLayer.decode ? incomingLayer.decode() : Promise.resolve();
  Promise.resolve(decoded)
    .catch(() => {})
    .then(() => requestAnimationFrame(reveal));
}

function animateDialogMeta() {
  [dialogCaption, dialogCount].forEach((element) => {
    if (!element || element.hidden || typeof element.animate !== "function") return;
    element.animate(
      [
        { opacity: 0, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 280, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" }
    );
  });
}

function renderDialogGallery({ immediate = false } = {}) {
  const item = dialogGallery[dialogGalleryIndex];
  if (!item || !dialogImage) return;

  showDialogImage(item, { immediate });

  if (dialogCount) {
    dialogCount.textContent = `${formatCount(dialogGalleryIndex + 1)} / ${formatCount(dialogGallery.length)}`;
  }

  if (dialogTitle && item.title) {
    dialogTitle.textContent = item.title;
  }

  if (dialogCaption) {
    dialogCaption.textContent = item.caption || "";
    dialogCaption.hidden = !item.caption;
  }

  dialogThumbs?.querySelectorAll("[data-gallery-index]").forEach((thumb, index) => {
    const active = index === dialogGalleryIndex;
    thumb.classList.toggle("is-active", active);
    thumb.setAttribute("aria-current", active ? "true" : "false");
  });

  animateDialogMeta();

  [1, -1].forEach((offset) => {
    const nextItem =
      dialogGallery[(dialogGalleryIndex + offset + dialogGallery.length) % dialogGallery.length];
    if (nextItem?.image && nextItem.image !== item.image) preloadGalleryItem(nextItem);
  });
}

function setDialogGalleryIndex(index, options = {}) {
  if (!dialogGallery.length) return;
  dialogGalleryIndex = (index + dialogGallery.length) % dialogGallery.length;
  renderDialogGallery(options);
}

function buildDialogGallery(story, startIndex = 0) {
  dialogGallery = getStoryGallery(story);
  dialogGalleryIndex = Math.min(Math.max(Number(startIndex) || 0, 0), dialogGallery.length - 1);
  const hasMultiple = dialogGallery.length > 1;

  if (dialogPrev) dialogPrev.hidden = !hasMultiple;
  if (dialogNext) dialogNext.hidden = !hasMultiple;
  if (dialogCount) dialogCount.hidden = !hasMultiple;
  if (dialogCaption) dialogCaption.hidden = true;

  if (dialogThumbs) {
    dialogThumbs.hidden = !hasMultiple;
    dialogThumbs.innerHTML = hasMultiple
      ? dialogGallery
          .map(
            (item, index) => `
              <button
                class="story-dialog__thumb${index === 0 ? " is-active" : ""}"
                type="button"
                data-gallery-index="${index}"
                aria-label="查看第 ${index + 1} 张：${escapeHtml(item.caption || item.alt || "")}"
                aria-current="${index === 0 ? "true" : "false"}"
              >
                <img
                  src="${escapeHtml(item.thumb || item.image)}"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span>${formatCount(index + 1)}</span>
              </button>
            `
          )
          .join("")
      : "";
  }

  resetDialogImages();
  preloadGalleryItem(dialogGallery[dialogGalleryIndex]);
  renderDialogGallery({ immediate: true });
}

function openStory(storyId, startIndex = 0) {
  const story = storyLookup[storyId];
  if (!story || !dialog) return;

  dialogTitle.textContent = story.title;
  dialogMeta.textContent = `${story.location} / ${story.date}`;
  dialogCoords.textContent = story.coords || "";
  if (dialogKicker) {
    dialogKicker.textContent =
      story.kind === "food"
        ? "TASTE NOTE"
        : story.kind === "photo"
          ? "PHOTO WORK"
          : "SCENERY NOTE";
  }
  dialog.classList.toggle("is-photo", story.kind === "photo");
  dialogText.innerHTML = (story.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("");
  buildDialogGallery(story, startIndex);
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeStory() {
  if (!dialog?.open) return;
  dialog.close();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-story]");
  if (button) {
    event.stopPropagation();
    const card = button.closest("[data-story-id]");
    if (card) openStory(card.dataset.storyId, Number(card.dataset.storyStart || 0));
    return;
  }

  const card = event.target.closest("[data-story-id]");
  if (!card || track?.dataset.suppressClick === "true") return;
  openStory(card.dataset.storyId, Number(card.dataset.storyStart || 0));
});

document.addEventListener("keydown", (event) => {
  if (dialog?.open && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    if (dialogGallery.length < 2) return;
    event.preventDefault();
    setDialogGalleryIndex(dialogGalleryIndex + (event.key === "ArrowRight" ? 1 : -1));
    return;
  }

  const card = event.target.closest("[data-story-id]");
  if (!card || event.target !== card) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  openStory(card.dataset.storyId, Number(card.dataset.storyStart || 0));
});

dialogClose?.addEventListener("click", closeStory);
dialogPrev?.addEventListener("click", () => setDialogGalleryIndex(dialogGalleryIndex - 1));
dialogNext?.addEventListener("click", () => setDialogGalleryIndex(dialogGalleryIndex + 1));

dialogThumbs?.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-gallery-index]");
  if (!thumb) return;
  setDialogGalleryIndex(Number(thumb.dataset.galleryIndex));
});

["pointerover", "focusin"].forEach((eventName) => {
  dialogThumbs?.addEventListener(eventName, (event) => {
    const thumb = event.target.closest("[data-gallery-index]");
    if (!thumb) return;
    preloadGalleryItem(dialogGallery[Number(thumb.dataset.galleryIndex)]);
  });
});

dialogStage?.addEventListener("pointerdown", (event) => {
  if (dialogGallery.length < 2 || event.target.closest("button")) return;
  galleryPointerStart = { x: event.clientX, y: event.clientY };
});

dialogStage?.addEventListener("pointerup", (event) => {
  if (!galleryPointerStart) return;
  const deltaX = event.clientX - galleryPointerStart.x;
  const deltaY = event.clientY - galleryPointerStart.y;
  galleryPointerStart = null;

  if (Math.abs(deltaX) < 46 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
  setDialogGalleryIndex(dialogGalleryIndex + (deltaX < 0 ? 1 : -1));
});

dialogStage?.addEventListener("pointercancel", () => {
  galleryPointerStart = null;
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) closeStory();
});

dialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  dialogGallery = [];
  dialogGalleryIndex = 0;
});

updateScroll();
