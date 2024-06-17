import { LOGIN, LOGOUT } from "../actions";
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
  // Add other user properties if needed
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

type ActionTypes = LoginAction | LogoutAction;

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

    default:
      return state;
  }
};

export default userReducer;
