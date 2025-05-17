/**
 * @description
 */

const MODES = {
  light: "light",
  dark: "dark",
} as const;

const THEMES = [
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

const THEME_CONFIG = {
  MODE_CLASS: "dark",
  DATA_ATTRIBUTE: "data-theme",
  CHANGE_EVENT: "theme-change",
  LOCAL_STORAGE_KEY: "theme",
} as const;

type Mode = (typeof MODES)[keyof typeof MODES];

type Theme = (typeof THEMES)[number];

type ThemeConfig = typeof THEME_CONFIG;

// for debugging
const DEFAULT_THEMES = {
  light: THEMES[0],
  dark: THEMES[1],
} as const;

// for debugging
const WINE_THEMES = {
  light: THEMES[2],
  dark: THEMES[3],
} as const;

export { MODES, THEMES, THEME_CONFIG, DEFAULT_THEMES, WINE_THEMES };
export type { Mode, Theme, ThemeConfig };
