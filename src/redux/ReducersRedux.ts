import { combineReducers } from "redux";
import { reducerFetchusers } from "./UserReducer";
import { reducerAuthenticate } from "./UserReducer";

const reducers = combineReducers({
  user: reducerFetchusers,
  authenticate: reducerAuthenticate,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
