import {MongoClient} from 'mongodb'

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://Pointers619:Pointers619@cluster0.hfhtu.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  await db.collection('newsletter').insertOne(document);
}
export async function getAllDocuments(client, collection, sort) {
   const db = client.db();
   const documents = db
     .collection(collection)
     .find()
     .sort(sort)
     .toArray();
     return documents
}
