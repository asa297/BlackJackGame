import { actionTypes } from "../type";

const initState = null;

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.RESULT_GAME:
      return { ...action.payload };
    case actionTypes.RESET_RESULT_GAME:
      return initState;
    default:
      return state;
  }
}
