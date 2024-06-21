import { LOGIN, LOGOUT, SAVE_ACTIVE_WIDGETS, SAVE_LAYOUT } from "../actions";
import { WidgetsState } from "./WidgetsReducer";

export interface State {
  user: UserState;
  widgets: WidgetsState;
}

// Define the shape of the user object
export interface User {
  id: number;
  name: string;
  email: string;
  profile_img: string;
  role: string;
  widgets_layout: Layout; // Assicurarsi che widgets_layout sia una stringa, se è JSON serializzato
  active_widgets: Array<number>;
}

export interface WidgetsLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static: boolean;
}

// Define the shape of the state
export interface UserState {
  user: User | null;
}

// Define the initial state
const initialState: UserState = {
  user: null,
};

// Define the action types
interface LoginAction {
  type: typeof LOGIN;
  payload: User;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface Layout {
  breakpoint: string;
  layout: Array<T>;
}
interface T {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static: boolean;
}

interface SaveLayoutAction {
  type: typeof SAVE_LAYOUT;
  payload: Layout; // Assicurarsi che il tipo sia corretto
}
interface SaveActiveWidgets {
  type: typeof SAVE_ACTIVE_WIDGETS;
  payload: Array<number>; // Assicurarsi che il tipo sia corretto
}

type ActionTypes = LoginAction | LogoutAction | SaveLayoutAction | SaveActiveWidgets;

// Main reducer function
const userReducer = (state = initialState, action: ActionTypes): UserState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    case SAVE_LAYOUT:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              widgets_layout: action.payload,
            }
          : null,
      };
    case SAVE_ACTIVE_WIDGETS:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              active_widgets: action.payload,
            }
          : null,
      };

    default:
      return state;
  }
};

export default userReducer;
