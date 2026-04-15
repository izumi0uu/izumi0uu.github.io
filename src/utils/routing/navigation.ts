import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/config/i18n";
import { getPathWithLocale } from "@/utils/routing/paths";

import type { LocaleAlternate, LocaleSwitchTarget } from "@/types/common";
import type { LocaleValues } from "@/types/config";

const getSupportedAlternates = (
  pathFactory: (locale: LocaleValues) => string
): LocaleAlternate[] => SUPPORTED_LOCALES.map((locale) => ({ locale, href: pathFactory(locale) }));

const getLocaleSwitchTarget = ({
  currentLocale,
  alternates,
  fallbackFactory,
}: {
  currentLocale: LocaleValues;
  alternates: LocaleAlternate[];
  fallbackFactory?: (locale: LocaleValues) => string;
}): LocaleSwitchTarget => {
  const targetLocale =
    SUPPORTED_LOCALES.find((locale) => locale !== currentLocale) ?? DEFAULT_LOCALE;
  const matchingAlternate = alternates.find((alternate) => alternate.locale === targetLocale);

  return {
    currentLocale,
    targetLocale,
    href: matchingAlternate?.href ?? fallbackFactory?.(targetLocale) ?? getPathWithLocale(targetLocale),
    missingTranslation: !matchingAlternate,
  };
};

export { getSupportedAlternates, getLocaleSwitchTarget };
