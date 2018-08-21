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

workboxSW.precache([])

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
  