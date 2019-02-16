const requireUserName = require("../middlewares/requireUserName");

const GetCards = cards => {
  const index = Math.floor(Math.random() * cards.length);
  const card = cards[index];
  cards.splice(index, 1);
  return card;
};

const RandomCard = cards => {
  let result = [];
  for (let i = 0; i < 2; i++) {
    result.push(GetCards(cards));
  }
  return result;
};

const ResultGame = data => {
  const { player_cards, server_cards } = data;

  const player_point = CaludatePoint(player_cards);
  const server_point = CaludatePoint(server_cards);

  const result = ResultCards({
    player_point,
    player_cards,
    server_point,
    server_cards
  });

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
      result.status = "WIN";
      result.point = maxPoint;
    }
  }

  return result;
};

const isBlackJack = (point, cards) => {
  return point === 21 && cards.length === 2;
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
    let cards = require("../static/data.json").cards;
    const player_cards = RandomCard(cards);
    const server_cards = RandomCard(cards);

    const resultGame = ResultGame({ player_cards, server_cards });

    if (resultGame.status === "BLACK_JACK") {
      res.send({ player_cards, server_cards, foundWinner: true, resultGame });
    }
    res.send({ player_cards, foundWinner: undefined });
  });

  app.get("/api/hit/:username", requireUserName, (req, res) => {
    const newCard = GetCards();
    player_cards.push(newCard);
    res.send({ player_cards });
  });

  app.get("/api/stand", requireUserName, (req, res) => {
    res.send();
  });

  app.get("/api/board", (req, res) => {
    res.send();
  });
};
