import { actionTypes } from "../type";

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_SERVER_CARDS:
      return action.payload;
    default:
      return state;
  }
}
