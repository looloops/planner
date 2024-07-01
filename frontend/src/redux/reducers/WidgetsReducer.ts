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
  DAILY_SCHEDULE_DETAILS,
  WISHLIST_DETAILS,
  SAVE_ACTIVE_DATE,
} from "../actions";
import { WidgetDetails } from "../../typescript/interfaces";

interface BooksAction {
  type: typeof BOOKS_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface GoalsAction {
  type: typeof GOALS_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface HabitsAction {
  type: typeof HABITS_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface JournalAction {
  type: typeof JOURNAL_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface MediaAction {
  type: typeof MEDIA_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface MenuAction {
  type: typeof MENU_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface MoodsAction {
  type: typeof MOODS_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface RecipesAction {
  type: typeof RECIPES_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface ScheduleAction {
  type: typeof SCHEDULE_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface ThemeAction {
  type: typeof THEME_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface ToDosAction {
  type: typeof TODOS_DETAILS;
  payload: Partial<WidgetDetails>;
}

interface WishlistAction {
  type: typeof WISHLIST_DETAILS;
  payload: Partial<WidgetDetails>;
}
interface DailyScheduleAction {
  type: typeof DAILY_SCHEDULE_DETAILS;
  payload: Partial<WidgetDetails>;
}
interface SaveActiveDateAction {
  type: typeof SAVE_ACTIVE_DATE;
  payload: Partial<WidgetDetails>;
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
  | WishlistAction
  | DailyScheduleAction
  | SaveActiveDateAction;

export interface WidgetsState {
  schedule: Partial<WidgetDetails>;
  goals: Partial<WidgetDetails>;
  media: Partial<WidgetDetails>;
  recipes: Partial<WidgetDetails>;
  todos: Partial<WidgetDetails>;
  books: Partial<WidgetDetails>;
  menu: Partial<WidgetDetails>;
  wishlist: Partial<WidgetDetails>;
  moods: Partial<WidgetDetails>;
  habits: Partial<WidgetDetails>;
  theme: Partial<WidgetDetails>;
  journal: Partial<WidgetDetails>;
  daily_schedule: Partial<WidgetDetails>;
  active_date: Partial<WidgetDetails>;
}

const initialState: WidgetsState = {
  schedule: {},
  goals: {},
  media: {},
  recipes: {},
  todos: {},
  books: {},
  menu: {},
  wishlist: {},
  moods: {},
  habits: {},
  theme: {},
  journal: {},
  daily_schedule: {},
  active_date: {},
};

const widgetsReducer = (state = initialState, action: ActionTypes): WidgetsState => {
  switch (action.type) {
    case SAVE_ACTIVE_DATE:
      return {
        ...state,
        active_date: action.payload,
      };

    case SCHEDULE_DETAILS:
      return {
        ...state,
        // schedule: state.schedule.concat(action.payload),
        schedule: action.payload,
      };

    case GOALS_DETAILS:
      return {
        ...state,
        goals: action.payload,
      };

    case MEDIA_DETAILS:
      return {
        ...state,
        media: action.payload,
      };

    case RECIPES_DETAILS:
      return {
        ...state,
        recipes: action.payload,
      };

    case TODOS_DETAILS:
      return {
        ...state,
        todos: action.payload,
      };

    case BOOKS_DETAILS:
      return {
        ...state,
        books: action.payload,
      };

    case MENU_DETAILS:
      return {
        ...state,
        menu: action.payload,
      };

    case WISHLIST_DETAILS:
      return {
        ...state,
        wishlist: action.payload,
      };

    case MOODS_DETAILS:
      return {
        ...state,
        moods: action.payload,
      };

    case HABITS_DETAILS:
      return {
        ...state,
        habits: action.payload,
      };

    case THEME_DETAILS:
      return {
        ...state,
        theme: action.payload,
      };

    case JOURNAL_DETAILS:
      return {
        ...state,
        journal: action.payload,
      };

    case DAILY_SCHEDULE_DETAILS:
      return {
        ...state,
        daily_schedule: action.payload,
      };

    default:
      return state;
  }
};

export default widgetsReducer;
