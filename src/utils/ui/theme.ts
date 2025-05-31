import { CONFIG_CLIENT } from "@/config/client"
import { MODES, THEME_CONFIG, THEMES } from "@/constants/theme"
import type { Mode, Theme } from "@/types/constants"

const { DEFAULT_MODE, DEFAULT_THEME } = CONFIG_CLIENT
const { MODE_CLASS, DATA_ATTRIBUTE } = THEME_CONFIG

const getCurrentMode = () =>
  document.documentElement.classList.contains(MODE_CLASS) ? MODES.dark : MODES.light

const getCurrentTheme = () => {
  const themeName = document.documentElement.getAttribute(DATA_ATTRIBUTE)
  const isValidThemeName =
    Boolean(themeName) && THEMES.map((theme) => theme.name).includes(themeName as Theme["name"])

  if (!isValidThemeName) return null

  const currentTheme = THEMES.find((theme) => theme.name === themeName) as Theme
  return currentTheme
}

const getNextTheme = () => {
  const currentTheme = getCurrentTheme()

  const currentIndex = THEMES.findIndex((theme) => currentTheme && currentTheme.name === theme.name)

  if (currentIndex === -1) {
    const currentMode = getCurrentMode()
    const defaultThemes = getDefaultThemes()

    return defaultThemes[currentMode]
  }

  const nextIndex = (currentIndex + 1) % THEMES.length
  return THEMES[nextIndex]
}

const validateMode = (mode: Mode): void => {
  if (![MODES.light, MODES.dark].includes(mode)) throw new Error(`Invalid mode: ${mode}`)
}

const validateTheme = (theme: Theme["name"]): void => {
  if (!THEMES.map((theme) => theme.name).includes(theme)) throw new Error(`Invalid theme: ${theme}`)
}

/**
 * @description 根据在客户端配置中设置的单一默认主题（一个模式及其对应的主题名称），
 * 推断并返回一个包含亮色和暗色两种模式下各自默认主题配置的对象。
 *
 * 工作流程：
 * 1. 验证配置的 `DEFAULT_MODE` 和 `DEFAULT_THEME` 是否有效（即存在于预定义列表中）。
 * 2. 确定与 `DEFAULT_MODE` 相对的另一种模式 (`otherMode`)。
 * 3. 尝试通过字符串替换从 `DEFAULT_THEME` 的名称中推断出 `otherMode` 下对应的主题名称 (`otherTheme`)。
 *    例如：如果默认是 "style-dark"，它会尝试找到 "style-light"。
 *    这个推断强依赖于主题命名遵循 `[风格名称]-[模式]` 的规范。
 * 4. 验证推断出的 `otherTheme` 是否也是一个有效的、已定义的主题名称。
 * 5. 返回一个结构化对象，如：
 *    {
 *      light: { mode: 'light', name: '推断或配置的亮色主题名' },
 *      dark: { mode: 'dark', name: '推断或配置的暗色主题名' }
 *    }
 * 主要目的是简化配置，开发者只需指定一个主默认主题，函数会自动推算另一个，
 * 但前提是主题命名规范要配合。
 */
const getDefaultThemes = () => {
  validateMode(DEFAULT_MODE)
  validateTheme(DEFAULT_THEME)

  const isDarkMode = DEFAULT_MODE === MODES.dark

  const otherMode = isDarkMode ? MODES.light : MODES.dark
  // infer the other theme name from the default theme name using replace
  const otherTheme = DEFAULT_THEME.replace(DEFAULT_MODE, otherMode) as Theme["name"]

  validateMode(otherMode)
  validateTheme(otherTheme)

  // normalized and structured output
  const defaultThemes = isDarkMode
    ? {
        light: {
          mode: otherMode,
          name: otherTheme,
        },
        dark: {
          mode: DEFAULT_MODE,
          name: DEFAULT_THEME,
        },
      }
    : {
        light: {
          mode: DEFAULT_MODE,
          name: DEFAULT_THEME,
        },
        dark: {
          mode: otherMode,
          name: otherTheme,
        },
      }

  return defaultThemes
}

export {
  getCurrentMode,
  getCurrentTheme,
  getNextTheme,
  validateMode,
  validateTheme,
  getDefaultThemes,
}
