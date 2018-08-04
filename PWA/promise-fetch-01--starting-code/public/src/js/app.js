
var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    }).catch( err => {
      console.log(err);
    })
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

var promise = new Promise((resolve,reject) =>{
  setTimeout(function() {
    //resolve('This is executed once the timer is done!');
    reject({code:500, message: 'An error occured'});
    //console.log('This is executed once the timer is done!');
  }, 3000);
});

fetch('https://httpbin.org/ip').then(response =>{
  console.log(response);
  return response.json();
}).then(data => {
  console.log(data);
}).catch(err =>{
  console.log(err);
})

// promise.then((text)=>{
//   return (text);
// }, function(err){
//   console.log(err.code, err.message);
// }).then(newText => {
//   console.log(newText);
// })

promise.then(text => {
  return (text);
}).then( newText => {
  console.log(newText);
}).catch(err => {
  console.log(err.code, err.message);
})



console.log('This is executed right after setTimeout()');
