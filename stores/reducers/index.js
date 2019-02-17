import { combineReducers } from "redux";

import PlayerCardReducer from "./PlayerCardReducer";
import ServerCardReducer from "./ServerCardReducer";
import ResultGameReducer from "./ResultGameReducer";
import ScoreBoardReducer from "./ScoreBoardReducer";

export default combineReducers({
  PlayerCardReducer,
  ServerCardReducer,
  ResultGameReducer,
  ScoreBoardReducer
});
