const cors = require('cors');
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // allows us to take in JSON in post body
app.use(cors()); // allows localhost to communicate with server

// GET handler: two imputs, request object and response object (what's coming in / what's going out)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// POST handler
app.post("/event/create", (req, res) => {
    console.log(req.body)

    // TODO: DB git

    res.send({})
});

// "main" method, launches the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})