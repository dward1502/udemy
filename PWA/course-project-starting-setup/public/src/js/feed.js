var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if(deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then( function (choiceResult) {
      console.log(choiceResult.outcome);
      if(choiceResult === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
  //unregister service worker
  // if('serviceWorker' in navigator) {
  //   navigator.serviceWorker.getRegistrations().then(function(registrations){
  //     for(var i = 0; i<registrations.length; i++){
  //       registrations[i].unregister();
  //     }
  //   })
  // }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

//Currently not in use, allows to save assets in cache on demand otherwise
function onSaveButtonClicked(event){
  console.log('clicked');
  if('caches' in window) {
    caches.open('user-requested').then( function(cache) {
      cache.add('https://httpbin.org/get');
      cache.add('/src/images/sf-boat.jpg');

    });
  }  
}

function clearCards(){
  while(sharedMomentsArea.hasChildNodes()){
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard () {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-cared mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTtileTextElement = document.createElement('h2');
  cardTtileTextElement.style.color = 'white';
  cardTtileTextElement.className = 'mdl-card__title-text';
  cardTtileTextElement.textContent = 'San Francisco Trip';
  cardTitle.appendChild(cardTtileTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className ='mdl-card__supporting-text';
  cardSupportingText.textContent = 'In San Fransisco';
  cardSupportingText.style.textAlign = 'center';
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = ('Save');
  // cardSaveButton.addEventListener('click', onSaveButtonClicked);
  //cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

//cache than network
var url = 'https://httpbin.org/get'
var networkDataRecieved = false;

fetch(url)
.then( res => {
  return res.json();
}).then(data => {
  networkDataRecieved = true;
  console.log('From web', data);
  clearCards();
  createCard();
})

if('caches' in window) {
  caches.match(url)
    .then(function(response) {
      if(response){
        return response.json();
      }
    }).then(function(data){
     if(!networkDataRecieved){
      console.log('From cache',data);
      clearCards();
      createCard();
     }
    })
}


