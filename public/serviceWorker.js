// The version of the cache.
const VERSION = "v2";

// The name of the cache
const CACHE_NAME = `pwa-audio-recorder-{{version}}`;

// The static resources that the app needs to function.
const APP_STATIC_RESOURCES = [];

// On install, cache the static resources
// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       cache.addAll(APP_STATIC_RESOURCES);
//     })()
//   );
// });
self.addEventListener("install", event => {
  console.log("Service worker installed");
});

// delete old caches on activate
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     (async () => {
//       const names = await caches.keys();
//       await Promise.all(
//         names.map((name) => {
//           if (name !== CACHE_NAME) {
//             return caches.delete(name);
//           }
//         })
//       );
//       await clients.claim();
//     })()
//   );
// });
self.addEventListener("activate", event => {
  console.log("Service worker activated");
});

// On fetch, intercept server requests
// and respond with cached responses instead of going to network
// self.addEventListener("fetch", (event) => {
//   // As a single page app, direct app to always go to cached home page.
//   // if (event.request.mode === "navigate") {
//   //   event.respondWith(caches.match("/"));
//   //   return;
//   // }
//   // Cache http and https only, skip unsupported chrome-extension:// and file://...
//   console.log('e.request.url', event.request.url)
//   if (!(
//     event.request.url.startsWith('http:') || event.request.url.startsWith('https:')
//   )) {
//       return; 
//   }

//   // For all other requests, go to the cache first, and then the network.
//   event.respondWith(
//     (async () => {
//       const cachedResponse = await caches.match(event.request);
//       if (cachedResponse) {
//         // Return the cached response if it's available.
//         return cachedResponse;
//       }
//       // If resource isn't in the cache, return a 404.
//       // return new Response(null, { status: 404 });
//       const response = await fetch('event.request', event.request);
//       const cache = await caches.open(CACHE_NAME);
//       console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
//       cache.put(event.request, response.clone());
//       return response;
//     })()
//   );
// });
self.addEventListener("fetch", (event) => {
  // Cache http and https only, skip unsupported chrome-extension:// and file://...
  // console.log('e.request.url', event.request.url)
  // const isHttp = event.request.url.startsWith('http:') || event.request.url.startsWith('https:')
  // if (!isHttp) {
  //   return;
  // }
  // console.log('fetch', event)
})
