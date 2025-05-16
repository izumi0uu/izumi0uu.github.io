/**
 * @description
 */

export const MODES = {
  light: "light",
  dark: "dark",
} as const;

export const THEMES = [
  {
    mode: MODES.light,
    name: "default-light",
  },
  {
    mode: MODES.dark,
    name: "default-dark",
  },
  {
    mode: MODES.light,
    name: "wine-light",
  },
  {
    mode: MODES.dark,
    name: "wine-dark",
  },
] as const;

export const THEME_CONFIG = {
  MODE_CLASS: "dark",
  DATA_ATTRIBUTE: "data-theme",
  CHANGE_EVENT: "theme-change",
  LOCAL_STORAGE_KEY: "theme",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];

export type Theme = (typeof THEMES)[number];

export type ThemeConfig = typeof THEME_CONFIG;

// for debugging
export const DEFAULT_THEMES = {
  light: THEMES[0],
  dark: THEMES[1],
} as const;

// for debugging
export const WINE_THEMES = {
  light: THEMES[2],
  dark: THEMES[3],
} as const;
