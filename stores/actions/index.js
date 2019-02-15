import { actionTypes } from "../type";
import axios from "axios";

export const PlayGame = () => async dispatch => {
  const { data } = await axios.get("/api/game");
  dispatch({ type: actionTypes.FETCH_CARDS, payload: data.player_cards });
};
