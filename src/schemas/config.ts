import { z } from "zod";

const nodeEnvValues = ["development", "production", "test"] as const;

const booleanValues = ["true", "false", ""] as const;

const modeValues = ["light", "dark"] as const;

const localeValues = ["en", "zh"] as const;

const themeValues = ["default-light", "default-dark", "wine-light", "wine-dark"] as const;

const domainSubdomainRegex =
  /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;

/** @description runs after astro:env check in astro.config.ts */
const processEnvSchema = z.object({
  NODE_ENV: z.enum(nodeEnvValues),
  PREVIEW_MODE: z
    .enum(booleanValues)
    .transform((val) => val === "true")
    .default("false"),
  // ensure no trailing slash
  SITE_URL: z.string().url().regex(/[^/]$/, "SITE_URL should not end with a slash '/'"),
  PLAUSIBLE_SCRIPT_URL: z.string().url().or(z.literal("")).optional(),
  PLAUSIBLE_DOMAIN: z
    .string()
    .or(z.enum(["", "localhost"]))
    .optional()
    .refine(
      // check regex this way
      (value) =>
        value === undefined ||
        value === "" ||
        value === "localhost" || // astro:env default
        domainSubdomainRegex.test(value),
      (value) => ({
        message: `Invalid hostname for PLAUSIBLE_DOMAIN 1: ${value}`,
      })
    ),
});

const configServerSchema = processEnvSchema
  .omit({
    SITE_URL: true,
    PREVIEW_MODE: true,
    PLAUSIBLE_SCRIPT_URL: true,
    PLAUSIBLE_DOMAIN: true,
  })
  .extend({ PREVIEW_MODE: z.boolean() }); // here its boolean, not 'true' | 'false'

const configClientSchema = processEnvSchema
  .pick({ SITE_URL: true, PLAUSIBLE_SCRIPT_URL: true, PLAUSIBLE_DOMAIN: true })
  .merge(
    z.object({
      SITE_URL_CANONICAL: z.string().min(1),
      SITE_TITLE: z.string().min(1),
      SITE_DESCRIPTION: z.string().min(1),
      PAGE_SIZE_POST_CARD: z.number(),
      PAGE_SIZE_POST_CARD_SMALL: z.number(),
      PAGE_SIZE_PROJECT_CARD: z.number(),
      MORE_POSTS_COUNT: z.number(),
      DEFAULT_MODE: z.enum(modeValues),
      DEFAULT_THEME: z.enum(themeValues),
      AUTHOR_NAME: z.string().min(1),
      AUTHOR_EMAIL: z.string().email(),
      AUTHOR_AVATAR: z.string().url(),
      AUTHOR_DESCRIPTION: z.string().min(1),
      AUTHOR_GITHUB: z.string().url(),
      AUTHOR_TWITTER: z.string().url(),
      AUTHOR_LINKEDIN: z.string().url(),
      AUTHOR_FACEBOOK: z.string().url(),
      AUTHOR_INSTAGRAM: z.string().url(),
      AUTHOR_YOUTUBE: z.string().url(),
      AUTHOR_BILIBILI: z.string().url(),
      REPO_URL: z.string().url(),
    })
  );

const i18nSchema = z.object({
  DEFAULT_LOCALE: z.enum(localeValues),
  SUPPORTED_LOCALES: z.array(z.enum(localeValues)),
  LOCALE_LABELS: z.record(z.enum(localeValues), z.string()),
});

export {
  nodeEnvValues,
  booleanValues,
  modeValues,
  localeValues,
  themeValues,
  processEnvSchema,
  configServerSchema,
  configClientSchema,
  i18nSchema,
};
