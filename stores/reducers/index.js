import { combineReducers } from "redux";

import PlayerCardReducer from "./PlayerCardReducer";
import ServerCardReducer from "./ServerCardReducer";
import ResultGameReducer from "./ResultGameReducer";

export default combineReducers({
  PlayerCardReducer,
  ServerCardReducer,
  ResultGameReducer
});
