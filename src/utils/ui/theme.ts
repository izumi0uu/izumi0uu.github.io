import { CONFIG_CLIENT } from "@/config/client";
import { MODES, THEME_CONFIG, THEMES } from "@/constants/theme";
import type { Mode, Theme } from "@/types/constants";

const { DEFAULT_MODE, DEFAULT_THEME } = CONFIG_CLIENT;
const { MODE_CLASS, DATA_ATTRIBUTE } = THEME_CONFIG;

/**
 * @description 获取当前模式
 * @returns {Mode} e.g. light or dark
 */
const getCurrentMode = () =>
  document.documentElement.classList.contains(MODE_CLASS) ? MODES.dark : MODES.light;

/**
 * @description 获取当前主题
 * @returns {Theme | null} e.g. { mode: 'light', name: 'default-light' }
 */
const getCurrentTheme = () => {
  const themeName = document.documentElement.getAttribute(DATA_ATTRIBUTE);
  const isValidThemeName =
    Boolean(themeName) && THEMES.map((theme) => theme.name).includes(themeName as Theme["name"]);

  if (!isValidThemeName) return null;

  const currentTheme = THEMES.find((theme) => theme.name === themeName) as Theme;
  return currentTheme;
};

/**
 * @description 获取当前主题的前缀
 * @returns {string} 当前主题前缀，如果没有当前主题返回空字符串
 */
const getCurrentThemePrefix = (): string => {
  const currentTheme = getCurrentTheme();
  if (!currentTheme) return "";
  return getThemeNamePrefix(currentTheme.name) || "";
};

/**
 * @description notes: 会遍历 THEMES 数组
 * @returns {Theme} 下一个主题
 */
const getNextTheme = () => {
  const currentTheme = getCurrentTheme();

  const currentIndex = THEMES.findIndex(
    (theme) => currentTheme && currentTheme.name === theme.name
  );

  if (currentIndex === -1) {
    const currentMode = getCurrentMode();
    const defaultThemes = getDefaultThemes();

    return defaultThemes[currentMode];
  }

  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex];
};

const validateMode = (mode: Mode): void => {
  if (![MODES.light, MODES.dark].includes(mode)) throw new Error(`Invalid mode: ${mode}`);
};

const validateTheme = (theme: Theme["name"]): void => {
  if (!THEMES.map((theme) => theme.name).includes(theme))
    throw new Error(`Invalid theme: ${theme}`);
};

/**
 * @description 根据在客户端配置中设置的单一默认主题（一个模式及其对应的主题名称）， e.g. DEFAULT_MODE: "light", DEFAULT_THEME: "wine-light",
 */
const getDefaultThemes = () => {
  validateMode(DEFAULT_MODE);
  validateTheme(DEFAULT_THEME);

  const isDarkMode = DEFAULT_MODE === MODES.dark;

  const otherMode = isDarkMode ? MODES.light : MODES.dark;
  // infer the other theme name from the default theme name using replace
  const otherTheme = DEFAULT_THEME.replace(DEFAULT_MODE, otherMode) as Theme["name"];

  validateMode(otherMode);
  validateTheme(otherTheme);

  const lightTheme = THEMES.find(
    (t) => t.mode === MODES.light && t.name === (isDarkMode ? otherTheme : DEFAULT_THEME)
  )!;
  const darkTheme = THEMES.find(
    (t) => t.mode === MODES.dark && t.name === (isDarkMode ? DEFAULT_THEME : otherTheme)
  )!;

  return {
    light: lightTheme,
    dark: darkTheme,
  };
};

/**
 * @description 获取主题名称的前缀（去掉模式后缀）
 * @example 'default-light' -> 'default'
 * @param {string} themeName - 完整的主题名称
 * @returns {string | undefined} 主题名称前缀，如果未找到返回 undefined
 */
const getThemeNamePrefix = (themeName: Theme["name"]) => themeName.split("-")?.[0];

/**
 * @description 在同一主题族内切换模式（light ↔ dark）
 * eg: wine-light ↔ wine-dark, default-light ↔ default-dark
 * @returns {Theme} 同一主题族内相对模式的主题对象
 */
const toggleModeInSameTheme = (): Theme => {
  const currentTheme = getCurrentTheme();
  if (!currentTheme) {
    const defaultThemes = getDefaultThemes();
    const currentMode = getCurrentMode();

    return defaultThemes[currentMode];
  }

  const currentThemePrefix = getThemeNamePrefix(currentTheme.name);
  const currentMode = currentTheme.mode;

  const targetMode = currentMode === MODES.light ? MODES.dark : MODES.light;

  const targetTheme = THEMES.find((theme) => {
    const themePrefix = getThemeNamePrefix(theme.name);
    const isModeMatch = theme.mode === targetMode;
    const isThemeNameMatch =
      themePrefix && currentThemePrefix && themePrefix === currentThemePrefix;

    return isModeMatch && isThemeNameMatch;
  });

  if (targetTheme) return targetTheme;

  const defaultThemes = getDefaultThemes();
  return defaultThemes[currentMode];
};

/**
 * @description 在同一模式下切换主题
 * @param {string} [targetThemePrefix] - 目标主题前缀（可选），如 'wine', 'default'
 * @returns {Theme} 同一模式下的目标主题对象
 */
const toggleThemeInSameMode = (targetThemePrefix?: string): Theme => {
  const currentTheme = getCurrentTheme();
  if (!currentTheme) {
    const defaultThemes = getDefaultThemes();
    const currentMode = getCurrentMode();
    return currentMode === MODES.light ? defaultThemes.light : defaultThemes.dark;
  }

  const currentThemePrefix = getThemeNamePrefix(currentTheme.name);
  const currentMode = currentTheme.mode;

  // 获取当前模式下的所有主题
  const sameModelThemes = THEMES.filter((theme) => theme.mode === currentMode);

  if (targetThemePrefix) {
    // 如果指定了目标主题前缀，直接查找该主题
    const targetTheme = sameModelThemes.find(
      (theme) => getThemeNamePrefix(theme.name) === targetThemePrefix
    );

    if (targetTheme) {
      return targetTheme;
    }

    // 如果找不到指定的主题，返回当前主题
    console.warn(`Theme with prefix "${targetThemePrefix}" not found in ${currentMode} mode`);
    return currentTheme;
  } else {
    // 如果没有指定目标主题，循环切换到下一个主题
    const currentIndex = sameModelThemes.findIndex((theme) => theme.name === currentTheme.name);

    if (currentIndex === -1) {
      // 如果当前主题不在列表中，返回第一个主题
      return sameModelThemes[0] || currentTheme;
    }

    // 循环到下一个主题
    const nextIndex = (currentIndex + 1) % sameModelThemes.length;
    return sameModelThemes[nextIndex];
  }
};

/**
 * @description 获取当前模式下所有可用的主题前缀
 * @returns {string[]} 主题前缀数组
 */
const getAvailableThemePrefixes = (): string[] => {
  const currentMode = getCurrentMode();
  const sameModelThemes = THEMES.filter((theme) => theme.mode === currentMode);

  return [...new Set(sameModelThemes.map((theme) => getThemeNamePrefix(theme.name)))].filter(
    Boolean
  ) as string[];
};

/**
 * @description 切换到指定主题（保持当前模式）
 * @param {string} themePrefix - 主题前缀，如 'wine', 'default'
 * @returns {Theme} 指定主题的当前模式版本
 */
const switchToTheme = (themePrefix: string): Theme => {
  return toggleThemeInSameMode(themePrefix);
};

export {
  getCurrentMode,
  getCurrentTheme,
  getNextTheme,
  validateMode,
  validateTheme,
  getDefaultThemes,
  toggleModeInSameTheme,
  toggleThemeInSameMode,
  getAvailableThemePrefixes,
  getThemeNamePrefix,
  switchToTheme,
};
