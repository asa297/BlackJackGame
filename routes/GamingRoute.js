let { cards } = require("../static/data.json");
const requireUserName = require("../middlewares/requireUserName");
let server_cards = [];
let player_cards = [];

const ResetCards = () => {
  cards = require("../static/data.json").cards;
  server_cards = [];
  player_cards = [];
};

const GetCards = () => {
  const index = Math.floor(Math.random() * cards.length);
  const card = cards[index];
  cards.splice(index, 1);
  return card;
};

const RandomCard = () => {
  let result = [];
  for (let i = 0; i < 2; i++) {
    result.push(GetCards());
  }
  return result;
};

module.exports = app => {
  app.get("/api/game/:username", requireUserName, (req, res) => {
    ResetCards();

    player_cards = RandomCard();
    server_cards = RandomCard();

    res.send({ player_cards });
  });

  app.get("/api/hit", requireUserName, (req, res) => {
    res.send();
  });

  app.get("/api/stand", requireUserName, (req, res) => {
    res.send();
  });

  app.get("/api/board", (req, res) => {
    res.send();
  });
};
