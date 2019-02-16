import { actionTypes } from "../type";

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.RESULT_GAME:
      return { ...action.payload };
    default:
      return state;
  }
}
