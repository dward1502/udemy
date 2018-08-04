//caches overall cache storage
//cache single storage
var CACHE_STATIC_NAME = "static-v2";
var CACHE_DYNAMIC_NAME = "dynamic-v2";
var STATIC_FILES = [
  "/",
  "/index.html",
  "/offline.html",
  "/src/js/app.js",
  "/src/js/feed.js",
  "/src/js/fetch.js",
  "/src/js/promise.js",
  "/src/js/material.min.js",
  "/src/css/app.css",
  "/src/css/feed.css",
  "/src/images/main-image.jpg",
  "https://fonts.googleapis.com/css?family=Roboto:400,700",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
];

self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  //adding cached files
  event.waitUntil(
    caches.open("static").then(cache => {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Service Worker] Activating Service Worker ...", event);
  event.waitUntil(
    cache.keys().then(function(keylist) {
      return Promise.all(
        keylist.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    console.log("matched", string);
    cachePath = string.substring(self.origin.length);
  } else {
    cachePath = string;
  }
  return array.indexOf(cachePath) > -1;
}

//cache then network with offline mode
self.addEventListener("fetch", function(event) {
  var url = "https://httpbin.org/get";
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then(function(cache) {
        return fetch(event.request).then(function(res) {
          //       trimCache(CACHE_DYNAMIC_NAME,3);
          cache.put(event.request, res.clone());
          return res;
        });
      })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(res => {
              return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                //           trimCache(CACHE_DYNAMIC_NAME,3);
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(err => {
              return caches.open(CACHE_STATIC_NAME).then(function(cache) {
                if (event.request.headers.get("accept").includes("text/html")) {
                  return cache.match("/offline.html");
                }
              });
            });
        }
      })
    );
  }
});
// function trimCache(cacheName,maxItems) {
//   caches.open(cacheName).then(function(cache){
//     return cache.keys().then(function(keys){
//     if(keys.length > maxItems) {
//       cache.delete(keys[0]).then(trimCache(cacheName,maxItems));
//     }
//   })
// }

//cache than network
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         if(response) {
//           return response
//         } else {
//           return fetch(event.request)
//             .then(res => {
//               caches.open('dynamic')
//                 .then(cache =>{
//                   cache.put(event.request.url, res.clone())
//                   return res;
//                 })
//             }).catch(err => {
//               return caches.open(CACHE_STATIC_NAME).then(function(cache){
//                 return cache.match('/offline.html');
//               });
//             })
//         }
//       })
//   );
// });

//cache only
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

//network only
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });

//network than cache
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).then(function(res){
//       return caches.open(CACHE_DYNAMIC_NAME).then(function(cache){
//         cache.put(event.request.url, res.clone());
//         return res;
//       });
//     })
//     .catch(function(err){
//       return caches.match(event.request)
//     })
//   );
// });
//cache than network from service worker
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open(CACHE_DYNAMIC_NAME).then(function(cache){
//       return fetch(event.request).then(function(res){
//         cache.put(event.request, res.clone());
//         return res;
//       });
//     })
//   );
// });
