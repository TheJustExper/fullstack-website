const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const fs = require("fs");
const routes = fs.readdirSync("./src/routes").map(f => require(`./src/routes/${f}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.map(route => app.use(`/${route.name}`, route.router));

app.listen(8080, () => console.log("Running on port 8080"));