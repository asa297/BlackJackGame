import { actionTypes } from "../type";
import axios from "axios";

export const PlayGame = usenname => async dispatch => {
  const { data } = await axios.get(`/api/game/${usenname}`);
  dispatch({ type: actionTypes.FETCH_CARDS, payload: data.player_cards });
};
