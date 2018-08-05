//caches overall cache storage
//cache single storage
importScripts("/src/js/idb.js");
importScripts("/src/js/utility.js");
var CACHE_STATIC_NAME = "static-v2";
var CACHE_DYNAMIC_NAME = "dynamic-v2";
var STATIC_FILES = [
  "/",
  "/index.html",
  "/offline.html",
  "/src/js/app.js",
  "/src/js/feed.js",
  "/src/js/fetch.js",
  "/src/js/idb.js",
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
  //change url to a firebase url with a preset data
  var url = "https://httpbin.org/get";
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      fetch(event.request).then(function(res) {
        var cloneRes = res.clone();
        clearAllData("posts")
          .then(function() {
            return cloneRes.json();
          })
          .then(function(data) {
            for (var key in data) {
              writeData("posts", data[key]);
            }
          });
        //       trimCache(CACHE_DYNAMIC_NAME,3);
        return res;
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

self.addEventListener("sync", function(event) {
  console.log("[Service worker] Background Syncing", event);
  //different events use a switch statement (notices event tag than executes a code)
  if (event.tag === "sync-new-posts") {
    event.waitUntil(
      readAllData("sync-posts").then(function(data) {
        for (var dt of data) {
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              id: new Date().toISOString(),
              title: dt.value,
              location: dt.value,
              image: "image"
            });
          }).then(function(res) {
            console.log("Sent Data", res);
            if(res.ok){
              deleteItemFromData('sync-posts', dt.id);
            }
          }).catch(function(err){
            console.log('Error while sending data',err);
          });
        }
      })
    );
  }
});

self.addEventListener('notificationclick', function(event){
  var notification = event.notification;
  var action = event.action;

  console.log(notification);

  if(action === 'confirm') {
    console.log('COnfirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      clients.matchAll()
        .then(function(clis){
          var client = clis.find(function(c){
            return c.visibilityState === 'visible';
          });
          if( client !== undefined) {
            client.navigate('http://localhost:8080');
            client.focus();
          } else {
            clients.openWindow('http://localhost:8080');
          }
          notification.close();
        })
    );
    notification.close();
  }
});

self.addEventListener('notificationclose', function(event){
  console.log('Notification was closed', event);
})

self.addEventListener('push', function(event){
  console.log('Push Notification recieved', event);
  var data = {title: 'New!',content:'Something new happened!'};
  if(event.data){
    data = JSON.parse(event.data.text());
  }
  var options = {
    body: data.content,
    icon: '/src/images/icons/app-icon-96x96.png',
    badge: '/src/images/icons/app-icon-96x96.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title,options)
  )
});
