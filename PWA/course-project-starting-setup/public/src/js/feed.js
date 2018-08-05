var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
  "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector('#shared-moments');
var form = document.querySelector('form');
var titleInput = document.querySelector('#title');
var locationInput = document.querySelector('#location')

function openCreatePostModal() {
  createPostArea.style.display = "block";
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);
      if (choiceResult === "dismissed") {
        console.log("User cancelled installation");
      } else {
        console.log("User added to home screen");
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
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

//Currently not in use, allows to save assets in cache on demand otherwise
function onSaveButtonClicked(event) {
  console.log("clicked");
  if ("caches" in window) {
    caches.open("user-requested").then(function(cache) {
      cache.add("https://httpbin.org/get");
      cache.add("/src/images/sf-boat.jpg");
    });
  }
}

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-cared mdl-shadow--2dp";
  var cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = "url(" + data.image + ")";
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  var cardTtileTextElement = document.createElement("h2");
  cardTtileTextElement.style.color = "white";
  cardTtileTextElement.className = "mdl-card__title-text";
  cardTtileTextElement.textContent = data.title;
  cardTitle.appendChild(cardTtileTextElement);
  var cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = "center";
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = ('Save');
  // cardSaveButton.addEventListener('click', onSaveButtonClicked);
  //cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}
function updateUI(data) {
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}
//cache than network
//change url to a firebase url with a preset data
var url = "https://httpbin.org/get";
var networkDataRecieved = false;

fetch(url)
  .then(res => {
    return res.json();
  })
  .then(data => {
    networkDataRecieved = true;
    console.log("From web", data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  });

if ("indexedDB" in window) {
  readAllData('posts')
    .then(function(data){
      if(!networkDataRecieved){
        console.log('From cache', data);
        updateUI(data);
      }
    });
}
function sendData (){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify({
      id: new Date().toISOString(),
          title: titleInput.value,
          location: titleInput.value,
          image:'image'
    })
  }).then(function(res){
    console.log('Sent Data',res);
    updateUI();
  })
}

form.addEventListener('submit', function(event){
  event.preventDefault();
  if(titleInput.value.trim() === '' || locationInput.value.trim() === '' ){
    alert('Please enter valid data');
    return;
  }
  closeCreatePostModal();

  if('serviceWorker' in navigator && 'SyncManager' in window){
    navigator.serviceWorker.ready()
      .then(function(sw){
        var post = {
          id: new Date().toISOString(),
          title: titleInput.value,
          location: titleInput.value
        };
        writeData('sync-posts', post)
          .then(function(){
             return sw.sync.register('sync-new-post');
          }).then(function(){
            var snackbarContainer = document.querySelector('#confirmation-toast');
            var data = {message: 'Your post was saved for syncing!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
          }).catch(function(err){
            console.log(err);
          })
      });
  } else {
    sendData();
  }
})