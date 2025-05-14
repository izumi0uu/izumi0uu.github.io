/**
 * @description
 */

export const MODE = {
  light: "light",
  dark: "dark",
} as const;

export const THEMES = [
  {
    mode: MODE.light,
    name: "default-light",
  },
  {
    mode: MODE.dark,
    name: "default-dark",
  },
  {
    mode: MODE.light,
    name: "wine-light",
  },
  {
    mode: MODE.dark,
    name: "wine-dark",
  },
] as const;

// for debugging
export const DEFAULT_THEMES = {
  light: THEMES[0],
  dark: THEMES[1],
} as const;

export const THEME_CONFIG = {
  MODE_CLASS: "dark",
  DATA_ATTRIBUTE: "data-theme",
  CHANGE_EVENT: "theme-change",
  LOCAL_STORAGE_KEY: "theme",
} as const;

export type Mode = (typeof MODE)[keyof typeof MODE];

export type Theme = (typeof THEMES)[number];

export type ThemeConfig = typeof THEME_CONFIG;
