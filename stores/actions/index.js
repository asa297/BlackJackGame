import { actionTypes } from "../type";

export const FetchExample = () => async dispatch => {
  dispatch({ type: actionTypes.ACTION_TYPE, payload: null });
};
