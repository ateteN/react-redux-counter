import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { createLogger } from "redux-logger";

const logger = createLogger();

const PERSIST_KEY = "reduxState";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(PERSIST_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state: unknown) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(PERSIST_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(logger)
);

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;