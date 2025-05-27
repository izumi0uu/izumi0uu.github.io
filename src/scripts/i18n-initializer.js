/**
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
} from "../paraglide/runtime"; // Path alias is still used

// Declare these variables but initialize them inside initializeRedirect
let I18N_LOCAL_STORAGE_KEY;
let BROWSER_LANG_REDIRECT_DONE_KEY;

/**
 * get the app-specific i18n config from the DOM.
 * @returns {Object} the app-specific i18n config.
 */
const getAppSpecificI18nConfig = () => {
  // This function will only be called on the client now
  const configElement = document.getElementById("app-i18n-config-data");
  if (!configElement) {
    console.warn("i18nScript: App-specific i18n config data not found in DOM.");
    return {
      localStorageKey: "user-preferred-lang", // Default
      sessionStorageKey: "browser-lang-redirect-done", // Default
    };
  }
  try {
    const parsedConfig = JSON.parse(configElement.textContent || "{}");
    return {
      localStorageKey: parsedConfig.localStorageKey || "user-preferred-lang",
      sessionStorageKey: parsedConfig.sessionStorageKey || "browser-lang-redirect-done",
    };
  } catch (e) {
    console.error("i18nScript: Failed to parse App-specific i18n config data:", e);
    return {
      // Default on error
      localStorageKey: "user-preferred-lang",
      sessionStorageKey: "browser-lang-redirect-done",
    };
  }
};

/**
 * from localStorage get user's stored language preference.
 * @returns {string | null} the stored language code, or null if not found or inaccessible.
 */
const getStoredUserPreferredLang = () => {
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
const hasRedirectBeenAttemptedThisSession = () => {
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
const markRedirectAsAttemptedThisSession = () => {
  try {
    sessionStorage.setItem(BROWSER_LANG_REDIRECT_DONE_KEY, "true");
  } catch (e) {
    console.warn("i18nScript: Could not set sessionStorage item:", e);
  }
};

/**
 * infer the user's likely preferred language based on browser language settings and predefined rules.
 * rules: chinese regions (cn, hk, mo, tw) -> 'zh'; others -> 'en'.
 * @returns {string} the inferred language code (should match Paraglide's Locale type)
 */
const inferLangFromBrowserSettings = () => {
  const browserRaw = navigator.language || navigator.userLanguage || paraglideBaseLocale;
  const browserLangCode = browserRaw.toLowerCase().split("-")[0];
  const browserRegionCode = browserRaw.toLowerCase().split("-")[1] || "";

  let inferred = paraglideBaseLocale;

  if (browserLangCode === "zh") {
    if (["cn", "hk", "mo", "tw", ""].includes(browserRegionCode)) {
      inferred = "zh";
    } else {
      inferred = "en";
    }
  } else {
    inferred = "en";
  }

  if (paraglideIsLocale(inferred)) return inferred;

  return paraglideBaseLocale;
};

/**
 * the main initialization and redirect logic
 */
export const initializeRedirect = () => {
  // Initialize config keys here, now that we are on the client
  const config = getAppSpecificI18nConfig();
  I18N_LOCAL_STORAGE_KEY = config.localStorageKey;
  BROWSER_LANG_REDIRECT_DONE_KEY = config.sessionStorageKey;

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

// Removed self-executing part
// export { initializeRedirect }; // Already exported with const
