// Guarda la página para que abra rápido y sin señal. Los datos vienen de
// Supabase y nunca pasan por este caché; los PDF tampoco.
const VERSION = "finanzas-v2";
const SHELL = ["./", "manifest.webmanifest", "config.js", "icons/icon-192.png", "icons/icon-512.png"];
const CDN = ["https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "https://fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // La página y la configuración: primero la versión nueva; sin señal, la guardada.
  if (req.mode === "navigate" || (url.origin === location.origin && url.pathname.endsWith("config.js"))) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req.mode === "navigate" ? "./" : req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req.mode === "navigate" ? "./" : req))
    );
    return;
  }

  // Librerías, fuentes e íconos: lo guardado, y se actualiza por detrás.
  if (url.origin === location.origin || CDN.includes(url.origin)) {
    e.respondWith(
      caches.open(VERSION).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req)
          .then((res) => {
            if (res.ok || res.type === "opaque") c.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || net;
      })
    );
  }
});
