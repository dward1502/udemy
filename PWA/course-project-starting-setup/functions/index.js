const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin:true});
const webpush = require('web-push');
const formidable = require('formidable');
const fs = require('fs');
const UUID = require('uuid-v4');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const serviceAccount = require('./pwagram-fb-key.json');

const gcconfig = {
    projectId:'pwagram-',
    keyFilename: 'pwagram-fb-key.json'
}

const gcs = require('@google-cloud/storage')(config);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'url for firebase account'
});

exports.storePostData = functions.https.onRequest((request, response) => {
 cors(request,response, function() {
     var uuid = UUID();
     var formData = new formidable.IncomingForm();
     formData.parse(request, function (err, fields) {
        fs.rename(files.file.path, '/tmp/' + files.file.name);
        var bucket = gcs.bucket('pwagram-99adf.appspot.com')
        bucket.upload('/tmp/' + files.file.name, {
            uploadType:'media',
            metadata: {
                metadata: {
                    contentType: files.file.type,
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }), function(err, file) {
            if(!err) {
                admin.database().ref('posts').push({
                    id: fields.id,
                    title: fields.id,
                    location: fields.location,
                    rawLocation: {
                        lat: fields.rawLocationLat,
                        lng: fields.rawLocationLng
                    },
                    image:'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/' + encodeURIComponent(file.name) +'?alt=media&token=' + uuid
                }).then(function(){
                    webpush.setVapidDetails();
                    return admin.database().ref('subscriptions').once('value');
                }).then(function(subscriptions){
                    subscriptions.forEach(function(sub){
                        var pushConfig = {
                            endpoint: sub.val().endpoint,
                            keys: {
                                auth: sub.val().keys.auth,
                                p256dh:sub.val().leys.p256dh
                            }
                        }
                        webpush.sendNotifications(pushConfig, JSON.stringify({title: 'New Post', content: 'New Post added!',openUrl:'/help'}))
                           .catch(function(err){
                               console.log(err);
                           });
                    });
                    response.status(201).json({message: 'Data Stored', id: request.body.id})
                })
                .catch(function(err){
                    response.status(500).json({
                        error:err
                    });
                });
            } else {
                console.log(err);
            }
        }
     })
 });
});
