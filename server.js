const express = require("express");
const next = require("next");
const server = express();
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//require
require("dotenv").config();
require("./models/UserModel");
require("./models/ScoreModel");

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@ds135335.mlab.com:35335/db_blackjack`
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
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
