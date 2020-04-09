const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000
const cors = require("cors");
require('dotenv').config();


app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use(cors());

require('./server/routes')(app);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});


console.log("APP RUNNING");
module.exports = app;
