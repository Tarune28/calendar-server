const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://admin:admin@calendarapp.0jaxe.mongodb.net/CalendarApp?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var ObjectId = require('mongodb').ObjectId;

/**
 * Inserts a calendar event document into MongoDB 
 * @param {JSONObject} doc 
 * @returns ID of the inserted document, type ObjectID
 */
exports.insertDocument = async function insertDocument(doc) {
    let result;
  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");

    result = await eventsCollection.insertOne(doc);

    if (!result.acknowledged) {
      throw "Document could not be inserted!";
    }

  
  } finally {
    await client.close();

    return result.insertedId;
  }
}

/**
 * Deletes the document with the given _id
 * @param {ObjectId} _id 
 */
exports.deleteDocument = async function deleteDocument(_id) {
  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");
    // ObjectID not defined
    const result = await eventsCollection.deleteOne( { "_id": ObjectId(_id) } );
    // db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );

    if (!result.acknowledged) {
      throw "Document could not be deleted!";
    }

  } finally {
    await client.close();
  }
}

exports.getDocument = async function getDocument(_id) {
    let result;
  
  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");
    // ObjectID not defined
    result = await eventsCollection.findOne( { "_id": ObjectId(_id) } );
    // db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );

    if (!result.acknowledged) {
      throw "Document could not be found!";
    }

  } finally {
    await client.close();

  }
}

exports.getAllDocuments = async function getAllDocuments() {

  //MongoRuntimeError: Connection pool closed
  let results;


  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");
    await eventsCollection.find({}).toArray().then((ans) => {
      results = ans
    });

  } finally {
    await client.close();
    return results;   
  }

}