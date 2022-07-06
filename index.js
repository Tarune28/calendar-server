////////////////////// IMPORTS
const cors = require('cors');
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // allows us to take in JSON in post body
app.use(cors()); // allows localhost to communicate with server

const db = require("./db.js")

////////////////////// ENDPOINTS

// GET handler: two imputs, request object and response object (what's coming in / what's going out)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// POST handler
app.post("/event/create", (req, res) => {
  console.log(req.body)

  db.insertDocument(req.body).then((_id) => {
    res.send({
      ok: true,
      _id: _id
    });

  });
});

app.post("/event/update", (req, res) => {
  console.log(req.body)

  db.updateDocument(req.body).then(() => {
    res.send({
      ok: true
    });

  });
});

app.post("/event/delete", (req, res) => {
  console.log(req.body)
  db.deleteDocument(req.body._id).then(() => {
    res.send({
      ok: true
    });
  });
});

app.get("/event/savedEvents", (req, res) => {
    db.getAllDocuments().then((ans) => {
    res.send({
      ok: true,
      arr: ans
    });
  });
});

// db.inventory.deleteOne( { status: "D" } )

// TODO: READ from DB

// "main" method, launches the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})