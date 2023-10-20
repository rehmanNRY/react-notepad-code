const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000;

app.use(express.json())
app.use(cors())
// Avalible Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})