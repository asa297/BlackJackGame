const express = require("express");
const app = express();
const server = require("http").createServer(app);

const next = require("next");

const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");

//require
require("dotenv").config();
require("./models/UserModel");
require("./models/ScoreModel");

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@ds135335.mlab.com:35335/db_blackjack`
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nextApp
  .prepare()
  .then(() => {
    require("./routes/GamingRoute")(app);

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
