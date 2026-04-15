import { validateData } from "../utils/data/validation";
import { i18nSchema } from "../schemas/config";
import type { LocaleValues } from "../types/config";

const i18nData = {
  SUPPORTED_LOCALES: ["en", "zh"] as LocaleValues[],
  DEFAULT_LOCALE: "en" as LocaleValues,
  LOCALE_LABELS: {
    en: "English",
    zh: "中文",
  } as const,
  LOCAL_STORAGE_KEY: "user-preferred-lang",
  LOCALE_NOTICE_STORAGE_KEY: "locale-switch-notice",
  PREFIX_DEFAULT_LOCALE: true,
};

export const I18N_CONFIG = validateData(i18nData, i18nSchema);
export const {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCAL_STORAGE_KEY,
  LOCALE_NOTICE_STORAGE_KEY,
  PREFIX_DEFAULT_LOCALE,
} = I18N_CONFIG;
