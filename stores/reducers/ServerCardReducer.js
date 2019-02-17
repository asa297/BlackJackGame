import { actionTypes } from "../type";

const initState = [];

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SERVER_CARDS:
      return action.payload;
    case actionTypes.RESET_SERVER_CARDS:
      return initState;
    default:
      return state;
  }
}
