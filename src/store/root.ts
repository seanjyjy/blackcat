import { applyMiddleware, createStore, Store, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import postsReducer from "./posts/reducer";

const RootReducer = combineReducers({ postsReducer });

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof RootReducer>;

export default Store;
