import {
  BOOKS_DETAILS,
  GOALS_DETAILS,
  HABITS_DETAILS,
  JOURNAL_DETAILS,
  MEDIA_DETAILS,
  MENU_DETAILS,
  MOODS_DETAILS,
  RECIPES_DETAILS,
  SCHEDULE_DETAILS,
  THEME_DETAILS,
  TODOS_DETAILS,
  WISHLIST_DETAILS,
} from "../actions";

import { GeneralSettings } from "../../typescript/interfaces";

// Definisci il tipo per lo stato
export interface WidgetState {
  schedule?: Partial<GeneralSettings>;
  goals?: Partial<GeneralSettings>;
  media?: Partial<GeneralSettings>;
  recipes?: Partial<GeneralSettings>;
  todos?: Partial<GeneralSettings>;
  books?: Partial<GeneralSettings>;
  menu?: Partial<GeneralSettings>;
  wishlist?: Partial<GeneralSettings>;
  moods?: Partial<GeneralSettings>;
  habits?: Partial<GeneralSettings>;
  theme?: Partial<GeneralSettings>;
  journal?: Partial<GeneralSettings>;
}

// Definisci il tipo per le azioni
interface Action {
  type: string;
  payload: GeneralSettings;
}

// Stato iniziale
const initialState: WidgetState = {};

// Definisci il reducer con i tipi
const widgetState = (state: WidgetState = initialState, action: Action): WidgetState => {
  switch (action.type) {
    case SCHEDULE_DETAILS: {
      return {
        ...state,
        schedule: action.payload,
      };
    }
    case GOALS_DETAILS: {
      return {
        ...state,
        goals: action.payload,
      };
    }
    case MEDIA_DETAILS: {
      return {
        ...state,
        media: action.payload,
      };
    }
    case RECIPES_DETAILS: {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case TODOS_DETAILS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case BOOKS_DETAILS: {
      return {
        ...state,
        books: action.payload,
      };
    }
    case MENU_DETAILS: {
      return {
        ...state,
        menu: action.payload,
      };
    }
    case WISHLIST_DETAILS: {
      return {
        ...state,
        wishlist: action.payload,
      };
    }
    case MOODS_DETAILS: {
      return {
        ...state,
        moods: action.payload,
      };
    }
    case HABITS_DETAILS: {
      return {
        ...state,
        habits: action.payload,
      };
    }
    case THEME_DETAILS: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case JOURNAL_DETAILS: {
      return {
        ...state,
        journal: action.payload,
      };
    }
    default:
      return state;
  }
};

export default widgetState;
