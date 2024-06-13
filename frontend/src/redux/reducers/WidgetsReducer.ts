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
import { WidgetDetails } from "../../typescript/interfaces";

interface BooksAction {
  type: typeof BOOKS_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface GoalsAction {
  type: typeof GOALS_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface HabitsAction {
  type: typeof HABITS_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface JournalAction {
  type: typeof JOURNAL_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface MediaAction {
  type: typeof MEDIA_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface MenuAction {
  type: typeof MENU_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface MoodsAction {
  type: typeof MOODS_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface RecipesAction {
  type: typeof RECIPES_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface ScheduleAction {
  type: typeof SCHEDULE_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface ThemeAction {
  type: typeof THEME_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface ToDosAction {
  type: typeof TODOS_DETAILS;
  payload: Partial<WidgetDetails>[];
}

interface WishlistAction {
  type: typeof WISHLIST_DETAILS;
  payload: Partial<WidgetDetails>[];
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

export interface WidgetsState {
  schedule: Partial<WidgetDetails>[];
  goals: Partial<WidgetDetails>[];
  media: Partial<WidgetDetails>[];
  recipes: Partial<WidgetDetails>[];
  todos: Partial<WidgetDetails>[];
  books: Partial<WidgetDetails>[];
  menu: Partial<WidgetDetails>[];
  wishlist: Partial<WidgetDetails>[];
  moods: Partial<WidgetDetails>[];
  habits: Partial<WidgetDetails>[];
  theme: Partial<WidgetDetails>[];
  journal: Partial<WidgetDetails>[];
}

const initialState: WidgetsState = {
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

const widgetsReducer = (state = initialState, action: ActionTypes): WidgetsState => {
  switch (action.type) {
    case SCHEDULE_DETAILS:
      return {
        ...state,
        schedule: state.schedule.concat(action.payload),
      };

    case GOALS_DETAILS:
      return {
        ...state,
        goals: state.goals.concat(action.payload),
      };

    case MEDIA_DETAILS:
      return {
        ...state,
        media: state.media.concat(action.payload),
      };

    case RECIPES_DETAILS:
      return {
        ...state,
        recipes: state.recipes.concat(action.payload),
      };

    case TODOS_DETAILS:
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      };

    case BOOKS_DETAILS:
      return {
        ...state,
        books: state.books.concat(action.payload),
      };

    case MENU_DETAILS:
      return {
        ...state,
        menu: state.menu.concat(action.payload),
      };

    case WISHLIST_DETAILS:
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload),
      };

    case MOODS_DETAILS:
      return {
        ...state,
        moods: state.moods.concat(action.payload),
      };

    case HABITS_DETAILS:
      return {
        ...state,
        habits: state.habits.concat(action.payload),
      };

    case THEME_DETAILS:
      return {
        ...state,
        theme: state.theme.concat(action.payload),
      };

    case JOURNAL_DETAILS:
      return {
        ...state,
        journal: state.journal.concat(action.payload),
      };

    default:
      return state;
  }
};

export default widgetsReducer;
