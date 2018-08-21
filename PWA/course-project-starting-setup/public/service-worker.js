importScripts('workbox-sw.prod.v2.1.3.js');

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(/.*(?:googleapis|gstatic)\.com.w$/, workboxSW.strategies
    .staleWhileRevalidate({
        cacheName: 'google-fonts',
        cacheExpiration: {
            maxEntries: 3,
            maxAgeSeconds: 60 * 60 * 24 * 30
        }
    }));

workboxSW.router.registerRoute('https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'material-css'
    }));
workboxSW.router.registerRoute(/.*(?:firebasestorage\.googleapis)\.com.w$/, workboxSW.strategies
    .staleWhileRevalidate({
        cacheName: 'post-images'
    }));

workboxSW.router.registerRoute('https://pwagram-99adf.firebaseio.com/posts.json', function(args) {
    return fetch(args.event.request)
        .then(function(res){
            var clonedRes = res.clone();
            clearAllData('posts').then(function(){
                return clonedRes.json();
            }).then(function(data){
                for(var key in data) {
                    writeData('posts', data[key])
                }
            });
            return res;
        });
});

workboxSW.router.registerRoute(function(routeData){
    return (routeData.event.request.headers.get('accept').includes('text/html'));
}, function(args) {
    return  caches.match(args.event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(args.event.request)
            .then(res => {
              return caches.open('dynamic').then(cache => {
                //           trimCache(CACHE_DYNAMIC_NAME,3);
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(err => {
              return caches.match('/offline.html').then(function(cache) {
               return res;
              });
            });
        }
      })
});

workboxSW.precache([
  {
    "url": "favicon.ico",
    "revision": "2cab47d9e04d664d93c8d91aec59e812"
  },
  {
    "url": "index.html",
    "revision": "863be43be233612b9fb65df8bba8241e"
  },
  {
    "url": "manifest.json",
    "revision": "f1bcde76553addcacde6d11e73dac902"
  },
  {
    "url": "manifestInfo.json",
    "revision": "89899ba2a4904a07723e65e74ae126f8"
  },
  {
    "url": "service-worker.js",
    "revision": "2cb524dca756f5776c99d5d2f9bb4246"
  },
  {
    "url": "serviceWorker.js",
    "revision": "4b0647b6467eccaacda3c850e5ee2cec"
  },
  {
    "url": "src/css/app.css",
    "revision": "6d09f74487baae2843eb6b8983064f6f"
  },
  {
    "url": "src/css/feed.css",
    "revision": "f958929b556f513253e8eeb2a4b2b932"
  },
  {
    "url": "src/css/help.css",
    "revision": "1c6d81b27c9d423bece9869b07a7bd73"
  },
  {
    "url": "src/js/app.js",
    "revision": "2ac608cd6bc5abc3de423d11c4e26248"
  },
  {
    "url": "src/js/feed.js",
    "revision": "3c87daf09447dce6eec7bae407f85e20"
  },
  {
    "url": "src/js/idb.js",
    "revision": "017ced36d82bea1e08b08393361e354d"
  },
  {
    "url": "src/js/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "src/js/utility.js",
    "revision": "57f06205f2ab8b37b5d89a2ae3f2583c"
  },
  {
    "url": "src/offline.html",
    "revision": "81104db128204d8f33f24872aceb09b4"
  },
  {
    "url": "sw-base.js",
    "revision": "0116ca59564cb9a73c61d916eacac6c3"
  },
  {
    "url": "workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  },
  {
    "url": "src/images/main-image-lg.jpg",
    "revision": "31b19bffae4ea13ca0f2178ddb639403"
  },
  {
    "url": "src/images/main-image-sm.jpg",
    "revision": "c6bb733c2f39c60e3c139f814d2d14bb"
  },
  {
    "url": "src/images/main-image.jpg",
    "revision": "5c66d091b0dc200e8e89e56c589821fb"
  }
])

self.addEventListener("sync", function(event) {
    console.log("[Service worker] Background Syncing", event);
    //different events use a switch statement (notices event tag than executes a code)
    if (event.tag === "sync-new-posts") {
      console.log('[Service WOrker] Syncing new Posts');
      event.waitUntil(
        readAllData("sync-posts").then(function(data) {
          for (var dt of data) {
            var postData = new FormData();
            postData.append('id');
            postData.append('title', dt.title);
            postData.append('location',dt.location);
            postData.append('rawLocationLat',dt.rawLocation.lat);
            postData.append('rawLocationLng',dt.rawLocation.lng);
            postData.append('file', dt.picturem, dt.id + '.png')
            fetch(url, {
              method: "POST",
              body: postData
            }).then(function(res) {
              console.log("Sent Data", res);
              if(res.ok){
                res.json().then(function(resData){
                  deleteItemFromData('sync-posts', resData.id);
                })
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
  