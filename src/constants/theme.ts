/**
 * @description
 */

const MODES = {
  light: "light",
  dark: "dark",
} as const;

const THEMES = [
  // {
  //   mode: MODES.light,
  //   name: "default-light",
  // },
  // {
  //   mode: MODES.dark,
  //   name: "default-dark",
  // },
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

// for debugging
const DEFAULT_THEMES = {
  light: THEMES[0],
  dark: THEMES[1],
} as const;

export { MODES, THEMES, THEME_CONFIG, DEFAULT_THEMES };
