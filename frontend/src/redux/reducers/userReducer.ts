import { LOGIN, LOGOUT } from "../actions";

// Define the shape of the state
export interface State {
  user: User | null;
}

// Define the shape of the user object
export interface User {
  id: number;
  name: string;
  email: string;
  imageURL: string;
  role: string;
  // Add other user properties if needed
}

// Define the initial state
const initialState: State = {
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
const userReducer = (state = initialState, action: ActionTypes): State => {
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