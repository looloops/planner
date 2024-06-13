// import Schedule from "../../components/widgets/Schedule";
import { GeneralSettings } from "../../typescript/interfaces";

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

interface BooksAction {
  type: typeof BOOKS_DETAILS;
  payload: GeneralSettings;
}

interface GoalsAction {
  type: typeof GOALS_DETAILS;
  payload: GeneralSettings;
}

interface HabitsAction {
  type: typeof HABITS_DETAILS;
  payload: GeneralSettings;
}

interface JournalAction {
  type: typeof JOURNAL_DETAILS;
  payload: GeneralSettings;
}

interface MediaAction {
  type: typeof MEDIA_DETAILS;
  payload: GeneralSettings;
}

interface MenuAction {
  type: typeof MENU_DETAILS;
  payload: GeneralSettings;
}
interface MoodsAction {
  type: typeof MOODS_DETAILS;
  payload: GeneralSettings;
}
interface RecipesAction {
  type: typeof RECIPES_DETAILS;
  payload: GeneralSettings;
}
interface ScheduleAction {
  type: typeof SCHEDULE_DETAILS;
  payload: GeneralSettings;
}

interface ThemeAction {
  type: typeof THEME_DETAILS;
  payload: GeneralSettings;
}
interface ToDosAction {
  type: typeof TODOS_DETAILS;
  payload: GeneralSettings;
}
interface WishlistAction {
  type: typeof WISHLIST_DETAILS;
  payload: GeneralSettings;
}
type ActionTypes =
  | BooksAction
  | GoalsAction
  | HabitsAction
  | JournalAction
  | MediaAction
  | MenuAction
  | MoodsAction
  | RecipesAction
  | ScheduleAction
  | ThemeAction
  | ToDosAction
  | WishlistAction;

// Stato iniziale

export interface WidgetState {
  schedule: Partial<GeneralSettings>[];
  goals: Partial<GeneralSettings>[];
  media: Partial<GeneralSettings>[];
  recipes: Partial<GeneralSettings>[];
  todos: Partial<GeneralSettings>[];
  books: Partial<GeneralSettings>[];
  menu: Partial<GeneralSettings>[];
  wishlist: Partial<GeneralSettings>[];
  moods: Partial<GeneralSettings>[];
  habits: Partial<GeneralSettings>[];
  theme: Partial<GeneralSettings>[];
  journal: Partial<GeneralSettings>[];
}

const initialState: WidgetState = {
  schedule: [],
  goals: [],
  media: [],
  recipes: [],
  todos: [],
  books: [],
  menu: [],
  wishlist: [],
  moods: [],
  habits: [],
  theme: [],
  journal: [],
};

const widgetsReducer = (state = initialState, action: ActionTypes): WidgetState => {
  switch (action.type) {
    case SCHEDULE_DETAILS:
      return {
        ...state,
        schedule: state.schedule.concat(action.payload as Partial<GeneralSettings>),
      };

    case GOALS_DETAILS:
      return {
        ...state,
        goals: state.goals.concat(action.payload as Partial<GeneralSettings>),
      };

    case MEDIA_DETAILS:
      return {
        ...state,
        media: state.media.concat(action.payload as Partial<GeneralSettings>),
      };

    case RECIPES_DETAILS:
      return {
        ...state,
        recipes: state.recipes.concat(action.payload as Partial<GeneralSettings>),
      };

    case TODOS_DETAILS:
      return {
        ...state,
        todos: state.todos.concat(action.payload as Partial<GeneralSettings>),
      };

    case BOOKS_DETAILS:
      return {
        ...state,
        books: state.books.concat(action.payload as Partial<GeneralSettings>),
      };

    case MENU_DETAILS:
      return {
        ...state,
        menu: state.menu.concat(action.payload as Partial<GeneralSettings>),
      };

    case WISHLIST_DETAILS:
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload as Partial<GeneralSettings>),
      };

    case MOODS_DETAILS:
      return {
        ...state,
        moods: state.moods.concat(action.payload as Partial<GeneralSettings>),
      };

    case HABITS_DETAILS:
      return {
        ...state,
        habits: state.habits.concat(action.payload as Partial<GeneralSettings>),
      };

    case THEME_DETAILS:
      return {
        ...state,
        theme: state.theme.concat(action.payload as Partial<GeneralSettings>),
      };

    case JOURNAL_DETAILS:
      return {
        ...state,
        journal: state.journal.concat(action.payload as Partial<GeneralSettings>),
      };

    default:
      return state;
  }
};

export default widgetsReducer;
