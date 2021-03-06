import { actionTypes } from "../type";

const initState = [];

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SCORE_BOARD:
      return [...action.payload];
    default:
      return state;
  }
}
