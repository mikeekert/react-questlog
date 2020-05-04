import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics/root.epic";
import rootReducer from "./reducers/root.reducer";

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
