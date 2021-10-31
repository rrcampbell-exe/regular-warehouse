const APP_PREFIX = 'RegularWarehouse-'; 
const VERSION = 'version_01';  
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    '/index.html',
    '/minimal.css',
    '/assets/creeping-cat.png',
    '/assets/pexels-pixabay-221047.jpg'
]

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  })

  // Respond with cached resource
  self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {
        // `keyList` contains all cache names under your username.github.io
        // filter out ones that has this app prefix to create white list
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX);
        })
        // add current cache name to white list
        cacheKeeplist.push(CACHE_NAME);
  
        return Promise.all(keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i] );
            return caches.delete(keyList[i]);
          }
        }));
      })
    );
  });
  
// self.addEventListener('fetch', (e) => {
//     // console.log('Req', e.request);

//     e.respondWith(getCache(e.request));

// })
// Respond with cached resources
self.addEventListener("fetch", function(event) {
    // cache all get requests to /api routes
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(event.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(event.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else if (event.request.headers.get("accept").includes("text/html")) {
            // return the cached home page for all requests for html pages
            return caches.match("/");
          }
        });
      })
    );
  });


// async function getCache(req)
// {
//     const cache = await caches.match(req);

//     return cache || await fetch(req);
// }