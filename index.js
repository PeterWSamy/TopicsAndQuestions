const express = require("express")
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const questionsRoutes = require("./routes/topics.routes.js")

const initConnection = require("./config.js")
initConnection()

app.use(`${process.env.URI_PREFIX}/topics`,questionsRoutes)

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${port}`);
});