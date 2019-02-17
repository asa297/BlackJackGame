let cards = [];
let server_cards = [];
let player_cards = [];
const requireUserName = require("../middlewares/requireUserName");

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

const ResultGame = (data, player_forced_lose) => {
  let result = {
    who: undefined,
    status: undefined,
    point: -1
  };

  const { player_cards, server_cards } = data;

  const player_point = CaludatePoint(player_cards);
  const server_point = CaludatePoint(server_cards);

  if (player_forced_lose) {
    result.who = isPlayer(player_forced_lose) ? "SERVER" : "PLAYER";
    result.status = `${
      isPlayer(player_forced_lose) ? "PLAYER" : "SERVER"
    } FORCE LOSE`;
    result.point = isPlayer(player_forced_lose) ? server_point : player_point;
  } else {
    result = ResultCards({
      player_point,
      player_cards,
      server_point,
      server_cards
    });
  }

  return result;
};

const ResultCards = data => {
  const { player_point, player_cards, server_point, server_cards } = data;

  let result = {
    who: undefined,
    status: undefined,
    point: -1
  };

  const player_isBlackJack = isBlackJack(player_point, player_cards);
  const server_isBlackJack = isBlackJack(server_point, server_cards);

  if (player_isBlackJack && server_isBlackJack) {
    result.status = "BLACK_JACK";
    result.point = 21;

    return result;
  } else if (server_isBlackJack) {
    result.who = "SERVER";
    result.status = "BLACK_JACK";
    result.point = 21;

    return result;
  } else if (player_isBlackJack) {
    result.who = "PLAYER";
    result.status = "BLACK_JACK";
    result.point = 21;

    return result;
  } else {
    if (player_point === server_point) {
      result.status = "DRAW";
      result.point = player_point;
    } else {
      const maxPoint = Math.max(player_point, server_point);
      const whoMaxPoint = Object.keys(data).find(key => data[key] === maxPoint);

      result.who = whoMaxPoint === "server_point" ? "SERVER" : "PLAYER";
      result.status = "POINT WIN";
      result.point = maxPoint;
    }
  }

  return result;
};

const isBlackJack = (point, cards) => {
  return point === 21 && cards.length === 2;
};

const isPlayer = data => {
  return data === "PLAYER";
};

const CaludatePoint = cards => {
  let point = 0;
  for (let i = 0; i < cards.length; i++) {
    const { code, value } = cards[i];
    if (code === "A" && point > 21) {
      // Case Get Ace but player point is more than 21
      point = point + 1;
    } else {
      point = point + value;
    }
  }
  return point;
};

module.exports = app => {
  app.get("/api/game/:username", requireUserName, (req, res) => {
    const { username } = req.params;
    ResetCards();
    player_cards = RandomCard();
    server_cards = RandomCard();

    // player_cards = [
    //   { key: 1, name: "Ace", code: "A", value: 11 },
    //   { key: 2, name: "Jack", code: "J", value: 10 }
    // ];

    // server_cards = [
    //   { key: 6, name: "2", code: "2", value: 2 },
    //   { key: 7, name: "3", code: "3", value: 3 }
    // ];

    const resultGame = ResultGame({ player_cards, server_cards });

    if (resultGame.status === "BLACK_JACK") {
      res.send({ player_cards, server_cards, foundWinner: true, resultGame });
    } else {
      res.send({ player_cards, foundWinner: undefined });
    }
  });

  app.get("/api/hit/:username", requireUserName, (req, res) => {
    const newCard = GetCards();
    player_cards.push(newCard);
    const player_point = CaludatePoint(player_cards);
    if (player_point > 21) {
      const resultGame = ResultGame({ player_cards, server_cards }, "PLAYER");
      res.send({ player_cards, server_cards, foundWinner: true, resultGame });
    } else {
      // ServerDecision()

      res.send({ player_cards });
    }
  });

  app.get("/api/stand/:username/:player_lose", requireUserName, (req, res) => {
    let resultGame;
    const { player_lose } = req.params;

    if (player_lose === "true") {
      resultGame = ResultGame({ player_cards, server_cards }, "PLAYER");
    } else {
      resultGame = ResultGame({ player_cards, server_cards });
    }

    res.send({ player_cards, server_cards, foundWinner: true, resultGame });
  });

  app.get("/api/board", (req, res) => {
    res.send();
  });
};
