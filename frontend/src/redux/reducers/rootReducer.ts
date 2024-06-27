import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import widgetsReducer from "./WidgetsReducer";
import { LOGOUT } from "../actions";

// Combine all the reducers
const appReducer = combineReducers({
  user: userReducer,
  widgets: widgetsReducer,
});

// Root reducer that resets the state on logout
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: { type: string }) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
