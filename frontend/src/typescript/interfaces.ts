// INTERFACES FOR RAW DATA (for defining API response)

// 1 - API RESPONSE STRUCTURE
export interface ApiResponse {
  success: boolean;
  data: WidgetDetailsRaw[]; // data from "widget_details" table and "widgets" table
}

// 2 - STRUCTURE OF RAW FETCHED DATA FROM API
export interface WidgetDetailsRaw {
  id: number;
  status: boolean;
  settings: string; // JSON string that needs parsing
  positionX: number;
  positionY: number;
  user_id: number;
  widget_id: number;
  widget: ObjectWidgetTableDataRaw; // "widgets" table structure
}

// 3 - STRUCTURE OF RAW DATA SPECIFIC TO "widgets" TABLE
export interface ObjectWidgetTableDataRaw {
  name: string;
  description: string;
  field_list: string; // JSON string that needs parsing
}

// INTERFACES FOR PARSED DATA

// 1 - STRUCTURE OF PARSED DATA FROM "widget_details" TABLE
export interface WidgetDetails {
  id: number;
  status: boolean;
  settings: GeneralSettings;
  // | SettingsSchedule
  // | SettingsGoals
  // | SettingsMedia
  // | SettingsRecipes
  // | SettingsJournal
  // | SettingsToDo
  // | SettingsBooks
  // | SettingsMenu
  // | SettingsWishlist
  // | SettingsMood
  // | SettingsHabits
  // | SettingsTheme;
  positionX: number;
  positionY: number;
  user_id: number;
  widget_id: number;
  widget: ObjectWidgetTableData;
}

// 2 - STRUCTURE OF PARSED DATA SPECIFIC TO "widgets" TABLE
export interface ObjectWidgetTableData {
  name: string;
  description: string;
  field_list: Array<string>;
}

// STRUCTURE FOR PARSED FIELD LIST !!! Maybe unnecessary
/* export interface FieldListParsed {
  title: string;
  description: string;
  start: Date;
  finish: Date;
  deadline: Date;
  priority: string;
} */

// 3 - STRUCTURE OF "settings" FIELD OF "widget_details" TABLE

export interface GeneralSettings {
  id: number;
  title: string;
  description: string;
  start: Date;
  finish: Date;
  deadline: Date;
  priority: string;
  type: string;
  img: string;
  status: string;
  content: string;
  genre: string;
  day: string; // as in day of the week
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  category: string;
  price: string | null;
  feeling: string;
  amount: number;
}
export interface SettingsSchedule {
  id: number;
  // 3a) STRUCTURE FOR "settings" CONCERNING THE "Schedule" WIDGET
  title: string;
  description: string;
  start: Date;
  finish: Date;
  deadline: Date;
  priority: string;
}

// 3b) STRUCTURE FOR "settings" CONCERNING THE "Goals" WIDGET
export interface SettingsGoals {
  id: number;
  title: string;
  description: string;
  priority: string;
}

// 3c) STRUCTURE FOR "settings" CONCERNING THE "Media" WIDGET
export interface SettingsMedia {
  id: number;
  type: string;
  title: string;
  description: string;
  img: string;
  status: string;
}

// 3d) STRUCTURE FOR "settings" CONCERNING THE "Recipes" WIDGET
export interface SettingsRecipes {
  id: number;
  img: string;
  type: string;
  title: string;
  description: string;
}

// 3e) STRUCTURE FOR "settings" CONCERNING THE "Journal" WIDGET
export interface SettingsJournal {
  id: number;
  date: Date;
  title: string;
  content: string;
}

// 3f) STRUCTURE FOR "settings" CONCERNING THE "To-do" WIDGET
export interface SettingsToDo {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

// 3g) STRUCTURE FOR "settings" CONCERNING THE "Books" WIDGET
export interface SettingsBooks {
  id: number;
  title: string;
  description: string;
  genre: string;
  img: string;
  status: string;
}

// 3h) STRUCTURE FOR "settings" CONCERNING THE "Weekly Menu" WIDGET
export interface SettingsMenu {
  id: number;
  day: string; // as in day of the week
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

// 3i) STRUCTURE FOR "settings" CONCERNING THE "Wishlist" WIDGET
export interface SettingsWishlist {
  id: number;
  category: string;
  name: string;
  price: string | null; // DA DECIDERE IN FRONTEND
}

// 3l) STRUCTURE FOR "settings" CONCERNING THE "Mood" WIDGET
export interface SettingsMood {
  id: number;
  date: Date;
  feeling: string;
}

// 3m) STRUCTURE FOR "settings" CONCERNING THE "Habits" WIDGET
export interface SettingsHabits {
  id: number;
  name: string;
  description: string;
  status: string; //as in to lose or to build a habit
}

// 3n) STRUCTURE FOR "settings" CONCERNING THE "Finances" WIDGET
export interface SettingsFinances {
  id: number;
  date: Date;
  name: string;
  type: string; //as in income or outcome
  amount: number;
}

// 3o) STRUCTURE FOR "settings" CONCERNING THE "theme" - DA DECIDERE
export interface SettingsTheme {
  type: string;
}
