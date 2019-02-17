import { actionTypes } from "../type";
import axios from "axios";

export const PlayGame = usenname => async dispatch => {
  const { data } = await axios.get(`/api/game/${usenname}`);
  const { player_cards, server_cards, foundWinner, resultGame } = data;
  if (foundWinner) {
    dispatch({
      type: actionTypes.RESULT_GAME,
      payload: resultGame
    });
    dispatch({
      type: actionTypes.FETCH_SERVER_CARDS,
      payload: server_cards
    });
  }

  dispatch({
    type: actionTypes.FETCH_PLAYER_CARDS,
    payload: player_cards
  });
};

export const HitCard = usenname => async dispatch => {
  const { data } = await axios.get(`/api/hit/${usenname}`);
  dispatch({
    type: actionTypes.FETCH_PLAYER_CARDS,
    payload: data.player_cards
  });
};

export const StandCard = (usenname, player_lose = false) => async dispatch => {
  const { data } = await axios.get(`/api/stand/${usenname}/${player_lose}`);
  const { player_cards, server_cards, resultGame } = data;

  dispatch({
    type: actionTypes.FETCH_SERVER_CARDS,
    payload: player_cards
  });

  dispatch({
    type: actionTypes.FETCH_SERVER_CARDS,
    payload: server_cards
  });

  dispatch({
    type: actionTypes.RESULT_GAME,
    payload: resultGame
  });
};

export const RestartGame = () => dispatch => {
  dispatch({ type: actionTypes.RESET_PLAYER_CARDS });
  dispatch({ type: actionTypes.RESET_SERVER_CARDS });
  dispatch({ type: actionTypes.RESET_RESULT_GAME });
};
