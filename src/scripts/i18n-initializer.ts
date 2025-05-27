/**
 * deprecated: because of the inline approach, we can't import ParaglideJS runtime functions.
 * This script is a ES module, so that we can import ParaglideJS runtime functions.
 * Mark the redirect as attempted (markRedirectAsAttemptedThisSession): set a sessionStorage item to indicate that the redirect has been attempted.
 * Infer user's preferred language (inferredLang): based on browser language settings and predefined rules.
 * Get the canonical path (canonicalPath): remove language prefix from current URL path.
 * Generate the localized path (localizedPath): use localizeHref(canonicalPath, { locale: inferredLang }) to generate.
 * Build the new URL (newUrl): combine origin, localizedPath, currentSearch and currentHash.
 * Double check: ensure newLocalizedPath is different from currentPathname before redirect.
 */

import {
  // supported locales
  locales as supportedParaglideLocales,
  // default locale
  baseLocale as paraglideBaseLocale,
  // check if a locale is supported by ParaglideJS
  isLocale as paraglideIsLocale,
  // localize a href
  localizeHref,
  // de-localize a href
  deLocalizeHref,
  extractLocaleFromUrl,
} from "../paraglide/runtime";

/**
 * get the app-specific i18n config from the DOM.
 * @returns {Object} the app-specific i18n config.
 */
const getAppSpecificI18nConfig = () => {
  const configElement = document.getElementById("app-i18n-config-data");
  if (!configElement) {
    console.warn("i18nScript: App-specific i18n config data not found in DOM.");
    return {
      localStorageKey: "user-preferred-lang",
      sessionStorageKey: "browser-lang-redirect-done",
    };
  }
  try {
    return JSON.parse(configElement.textContent || "{}");
  } catch (e) {
    console.error("i18nScript: Failed to parse App-specific i18n config data:", e);
    return {};
  }
};

const appSpecificI18nConfig = getAppSpecificI18nConfig();
const I18N_LOCAL_STORAGE_KEY = appSpecificI18nConfig.localStorageKey;
const BROWSER_LANG_REDIRECT_DONE_KEY = appSpecificI18nConfig.sessionStorageKey;

/**
 * from localStorage get user's stored language preference.
 * @returns {string | null} the stored language code, or null if not found or inaccessible.
 */
const getStoredUserPreferredLang = (): string | null => {
  try {
    return localStorage.getItem(I18N_LOCAL_STORAGE_KEY);
  } catch (e) {
    console.warn("i18nScript: Could not access localStorage:", e);
    return null;
  }
};

/**
 * check if the current session has attempted a browser language redirect.
 * @returns {boolean} true if attempted, false otherwise.
 */
const hasRedirectBeenAttemptedThisSession = (): boolean => {
  try {
    return !!sessionStorage.getItem(BROWSER_LANG_REDIRECT_DONE_KEY);
  } catch (e) {
    console.warn("i18nScript: Could not access sessionStorage:", e);
    return false;
  }
};

/**
 * set the "redirect attempted" mark to sessionStorage.
 */
const markRedirectAsAttemptedThisSession = (): void => {
  try {
    sessionStorage.setItem(BROWSER_LANG_REDIRECT_DONE_KEY, "true");
  } catch (e) {
    console.warn("i18nScript: Could not set sessionStorage item:", e);
  }
};

/**
 * infer the user's likely preferred language based on browser language settings and predefined rules.
 * rules: chinese regions (cn, hk, mo, tw) -> 'zh'; others -> 'en'.
 * @returns {import('@/paraglide/runtime').Locale} the inferred language code
 */
const inferLangFromBrowserSettings = (): import("@/paraglide/runtime").Locale => {
  const browserRaw = navigator.language || (navigator as any).userLanguage || paraglideBaseLocale;
  const browserLangCode = browserRaw.toLowerCase().split("-")[0];
  const browserRegionCode = browserRaw.toLowerCase().split("-")[1] || "";

  // use ParaglideJS's baseLocale as default inference
  let inferred: string = paraglideBaseLocale;

  if (browserLangCode === "zh") {
    if (["cn", "hk", "mo", "tw", ""].includes(browserRegionCode)) {
      inferred = "zh";
    } else {
      inferred = "en";
    }
  } else {
    inferred = "en";
  }

  // double check
  if (paraglideIsLocale(inferred)) return inferred as import("@/paraglide/runtime").Locale;

  return paraglideBaseLocale;
};

/**
 * the main initialization and redirect logic
 */
const initializeRedirect = (): void => {
  const currentPathname = window.location.pathname;
  const currentSearch = window.location.search;
  const currentHash = window.location.hash;
  const origin = window.location.origin;

  const storedUserLang = getStoredUserPreferredLang();
  if (storedUserLang) {
    markRedirectAsAttemptedThisSession();
    return;
  }

  if (hasRedirectBeenAttemptedThisSession()) return;

  const inferredLang = inferLangFromBrowserSettings();

  // use ParaglideJS's extractLocaleFromUrl to get the language from the current full URL
  // note: extractLocaleFromUrl expects a full URL or URL object
  const currentLangOnPage = extractLocaleFromUrl(window.location.href);

  if (currentLangOnPage !== inferredLang) {
    // canonicalPath should be a non-localized path, e.g. /about, /blog/my-post
    const canonicalPath = deLocalizeHref(currentPathname);

    // build the new URL path part
    // e.g. /about -> /zh/about
    // ParaglideJS's localizeHref function expects a canonical path
    const newLocalizedPath = localizeHref(canonicalPath, { locale: inferredLang });

    const newUrl = `${origin}${newLocalizedPath}${currentSearch}${currentHash}`;

    // double check
    if (currentPathname !== newLocalizedPath) {
      markRedirectAsAttemptedThisSession();
      window.location.replace(newUrl);
      return;
    }
  }
  markRedirectAsAttemptedThisSession();
};

// // ensure to run after DOMContentLoaded
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", initializeRedirect);
// } else {
//   initializeRedirect();
// }

export { initializeRedirect };
