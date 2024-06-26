import { LOGIN, LOGOUT, SAVE_ACTIVE_WIDGETS, SAVE_LAYOUT, ActionTypes } from "../actions";

export interface User {
  id: number;
  name: string;
  email: string;
  profile_img: string;
  role: string;
  widgets_layout: string;
  active_widgets: Array<number>;
}

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

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
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            widgets_layout: action.payload,
          },
        };
      }
      return state;
    case SAVE_ACTIVE_WIDGETS:
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            active_widgets: action.payload,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default userReducer;
