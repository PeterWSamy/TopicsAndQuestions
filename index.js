const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const questionsRoutes = require("./routes/routes.js")

const initConnection = require("./helpers/config.js")
initConnection()

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json())
app.use("", questionsRoutes)

app.get('/', (req, res) => { res.json({ message: 'app listening' }) })

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${port}`);
});