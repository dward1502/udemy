var dbPromise = idb.open('posts-store', 1, function(db){
    if(!db.objectStoreNames.contains('post')){
      db.createObjectStore('posts',{keyPath: 'id'});
    }
    if(!db.objectStoreNames.contains('sync-posts')){
        db.createObjectStore('sync-posts',{keyPath: 'id'});
      }
  });

  function writeData(st, data) {
    return dbPromise
        .then(function(db){
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objecStore(st);
            store.put(data);
            return tx.complete;
    })
  }

  function readAllData(st){
      return dbPromise
        .then(function(db){
          var tx = db.transaction(st, 'readonly');
          var store = tx.objecStore(st);
          return store.getAll();
      });
  }

  function clearAllData(st){
    return dbPromise
        .then(function(db){
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objecStore(st);
            store.clear();
            return tx.complete;
        })
  }

  function deleteItemFromData(st,id){
      return dbPromise
        .then(function(db){
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objecStore(st);
            store.delete(id);
            return tx.complete;
        }).then(function(){
            console.log("Item deleted!");
        })
  }

  function urlBase64ToUintBArray(base64String){
      var padding = '='.repeat((4-base64String.length % 4) %4);
      var base64 = (base64String + padding)
        .replace(/_/g,'+')
        .replace(/_/,'/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);
      for(var i =0; i<rawData.length; i++){
          outputArray[i] = rawData.charCodeAt(i);
      }        
      return outputArray;
}