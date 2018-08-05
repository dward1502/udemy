var deferredPrompt;
var enabledNotificationsButtons = document.querySelector('.enable-notifications');

if(!window.Promise) {
  window.Promise = Promise;
}
if('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/serviceWorker.js')
    .then(function(){
      console.log('Service worker registered');
    }).catch(err => {
      console.log(err);
    })
}

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;  
});

function displayConfirmedNotification(){
  if('serviceWorker' in navigator){
    var options = {
      body: 'You successfully subscribed to our Notification service!',
      icon: '/src/images/icons/app-icon-96x96.png',
      image: '/src/images/sf-boat.jpg',
      dir: 'ltr',
      lang: 'en-US',
      vibrate: [100,50,200],
      badge: '/src/images/icons/app-icon-96x96.png',
      tag: 'confirm-notification',
      renotify:true ,
      actions: [
        {action:'confirm',title:'Okay', icon:'/src/images/icons/app-icon-96x96.png'},
        {action:'cancel',title:'Cancel', icon:'/src/images/icons/app-icon-96x96.png'}

      ]
    }
    navigator.serviceWorker.ready
      .then(function(swreg){
        swreg.showNotification('Successfully subscribed!', options);
      });
  }
}

function configurePushSub(){
  if(!('serviceWorker' in navigator)){
    return;
  }

  navigator.serviceWorker.ready
    .then(function(swreg){
      reg = swreg;
      return swreg.pushManager.getSubscription();
    }).then(function(sub){
      if(sub === null){
        var vapidPublicKey = 'sfafsaffsafsf';
        var convertedVapidPublicKey = urlBase64ToUintBArray(vapidPublicKey);

        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey        
        });
      } else {

      }
    }).then(function(newSub){
      fetch('firebase url',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify(newSub)
      })
    }).then(function(res){
      if(res.ok){
        displayConfirmedNotification();
      }
    }).catch(function(err){
      console.log(err);
    })
}

function askforNotificationPermission(){
  Notification.requestPermission( function(result){
    console.log('User Choice', result);
    if(result !== 'granted'){
      console.log('No notification permission granted');
    }else {
      configurePushSub();
    }
  })
}

if('Notification' in window && 'serviceWorker'){
  for(var i = 0; i < enabledNotificationsButtons.length; i++){
    enabledNotificationsButtons[i].style.display = 'inline-block';
    enabledNotificationsButtons[i].addEventListener('click', askforNotificationPermission);
  }
}