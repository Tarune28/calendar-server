////////////////////// IMPORTS
const cors = require('cors');
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // allows us to take in JSON in post body
app.use(cors()); // allows localhost to communicate with server

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://admin:admin@calendarapp.0jaxe.mongodb.net/CalendarApp?retryWrites=true&w=majority";
const client = new MongoClient(uri);

////////////////////// ENDPOINTS

// GET handler: two imputs, request object and response object (what's coming in / what's going out)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// POST handler
app.post("/event/create", (req, res) => {
  console.log(req.body)

  insertDocument(req.body).then(() => {
    res.send({
      ok: true
    });
  });
});

////////////////////// DATABASE STUFF
async function insertDocument(doc) {
  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");

    console.log("Inserting doc into database: " + JSON.stringify(doc));
    const result = await eventsCollection.insertOne(doc);

    if (!result.acknowledged) {
      throw "Document could not be inserted!";
    }

    console.log("Inserted!");
  } finally {
    await client.close();
  }
}

// TODO: READ from DB

// "main" method, launches the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})