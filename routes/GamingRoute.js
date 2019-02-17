let cards = [];
let server_cards = [];
let player_cards = [];
const requireUserName = require("../middlewares/requireUserName");
const mongoose = require("mongoose");
const _ = require("lodash");
const ScoreModel = mongoose.model("Scores");
// const SERVER_PLAYER = "SERVER_PLAYER";
// const PLAYER = "PLAYER";

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

const ServerDecision = cards => {
  //This Function direct to this server decides to hit card for server cards
  const server_point = CaludatePoint(cards);
  return server_point < 17;
};

const RecordMatchScore = (resultGame, username) => {
  return new Promise((resolve, reject) => {
    ScoreModel({
      user: username,
      statusName: DefineMatchStatus(resultGame.who),
      recordDate: new Date()
    })
      .save()
      .then((score, err) => {
        if (err) {
          reject("Error");
        }
        if (score) {
          resolve("Success");
        }
      });
  });
};

const DefineMatchStatus = player => {
  let result;
  switch (player) {
    case "SERVER":
      return "LOSE";
    case "PLAYER":
      return "WIN";
    case undefined:
      return "DRAW";
  }
  return result;
};

module.exports = app => {
  app.get("/api/game/:username", requireUserName, async (req, res) => {
    const { username } = req.params;
    ResetCards();
    // player_cards = RandomCard();
    // server_cards = RandomCard();

    player_cards = [
      { key: 1, name: "Ace", code: "A", value: 11 },
      { key: 2, name: "Jack", code: "J", value: 10 }
    ];

    server_cards = [
      { key: 6, name: "2", code: "9", value: 9 },
      { key: 7, name: "3", code: "8", value: 8 }
    ];

    // const resultGame = ResultGame({ player_cards, server_cards });

    // if (resultGame.status === "BLACK_JACK") {
    //   await RecordMatchScore(resultGame, username);
    //   res.send({ player_cards, server_cards, foundWinner: true, resultGame });
    // } else {
    res.send({ player_cards });
    // }
  });

  app.get("/api/hit/:username", requireUserName, async (req, res) => {
    const { username } = req.params;

    const playerNewCard = GetCards();
    player_cards.push(playerNewCard);
    const player_point = CaludatePoint(player_cards);
    if (player_point > 21) {
      const resultGame = ResultGame({ player_cards, server_cards }, "PLAYER");
      await RecordMatchScore(resultGame, username);
      res.send({ player_cards, server_cards, foundWinner: true, resultGame });
    } else {
      const server_decide = ServerDecision(server_cards);
      if (server_decide) {
        const serverNewCard = GetCards();
        server_cards.push(serverNewCard);
        const server_point = CaludatePoint(server_cards);
        if (server_point > 21) {
          const resultGame = ResultGame(
            { player_cards, server_cards },
            "SERVER"
          );
          await RecordMatchScore(resultGame, username);
          res.send({
            player_cards,
            server_cards,
            foundWinner: true,
            resultGame
          });
        }
      }
    }

    res.send({ player_cards });
  });

  app.get(
    "/api/stand/:username/:player_lose",
    requireUserName,
    async (req, res) => {
      let resultGame;

      const { player_lose, username } = req.params;

      if (player_lose === "true") {
        resultGame = ResultGame({ player_cards, server_cards }, "PLAYER");
      } else {
        resultGame = ResultGame({ player_cards, server_cards });
      }

      await RecordMatchScore(resultGame, username);

      res.send({ player_cards, server_cards, foundWinner: true, resultGame });
    }
  );

  app.get("/api/board", async (req, res) => {
    const results = await ScoreModel.aggregate([
      {
        $group: { _id: "$user", score: { $push: "$$ROOT" }, count: { $sum: 1 } }
      }
    ]);

    const result_score = results.map(scores => {
      const { score, _id: user } = scores;
      const win = _.sumBy(score, score => {
        return score.statusName === "WIN";
      });
      const lose = _.sumBy(score, score => {
        return score.statusName === "LOSE";
      });
      const draw = _.sumBy(score, score => {
        return score.statusName === "DRAW";
      });

      return { user, win, lose, draw };
    });

    // console.log(scores);
    res.send(result_score);
  });
};
