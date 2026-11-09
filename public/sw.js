// Bumping the version drops everything the browser has kept.
const VERSION = "v1";
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const MAX_ASSETS = 200;

const isImmutable = (url) => url.pathname.startsWith("/_next/static/");
const isAsset = (url) =>
  isImmutable(url) || url.pathname === "/_next/image" || /\.(png|webp|svg|jpe?g|ico)$/.test(url.pathname);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => ![SHELL_CACHE, ASSET_CACHE].includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function trim(cache) {
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - MAX_ASSETS)).map((key) => cache.delete(key)));
}

// Hashed files never change, so a saved copy is final. Anything else is served and refreshed behind the scenes.
async function fromCache(event, request, immutable) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached && immutable) return cached;

  const update = fetch(request).then(async (response) => {
    if (response.ok) {
      await cache.put(request, response.clone());
      await trim(cache);
    }
    return response;
  });
  if (!cached) return update;
  event.waitUntil(update.catch(() => {}));
  return cached;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  // Pages are never saved: one URL serves both languages, so a saved copy could answer in the wrong one.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }
  if (isAsset(url)) event.respondWith(fromCache(event, request, isImmutable(url)));
});
