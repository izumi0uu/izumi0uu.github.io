import { envField } from "astro/config";
import dotenv from "dotenv";

import { nodeEnvValues, processEnvSchema } from "../schemas/config";
import { prettyPrintObject } from "../utils/system/log";
import { getHostnameFromUrl } from "../utils/routing/urls";
import { validateData } from "../utils/data/validation";
import type { ProcessEnvType } from "../types/config";

/*------------------ load .env file -----------------*/
// import.meta.env is not available in astro.config.mjs, only after the config is loaded.
// ! MUST use process.env for vars used in astro.config.mjs.
// https://github.com/withastro/astro/issues?q=.env+file+not+loaded

// access nodejs process.env
const NODE_ENV = process.env.NODE_ENV;

// Check if NODE_ENV is defined and is one of the allowed values
if (
  !NODE_ENV ||
  !nodeEnvValues.includes(NODE_ENV as (typeof nodeEnvValues)[number])
) {
  // eslint-disable-next-line no-console
  console.error("Invalid process.env.NODE_ENV:", NODE_ENV);
  throw new Error("Invalid process.env.NODE_ENV");
}

const envFileName = `.env.${NODE_ENV}`;
// use dotenv to load the .env file, add the variables to process.env
dotenv.config({ path: envFileName });

/*------------------ validate processEnvData -----------------*/
// from `process.env` extract the project required environment variables
// dotenv has already loaded the variables from the corresponding .env file into process.env

const processEnvData: ProcessEnvType = {
  NODE_ENV: process.env.NODE_ENV as (typeof nodeEnvValues)[number],
  // @ts-ignore
  PREVIEW_MODE: process.env.PREVIEW_MODE,
  // @ts-ignore
  SITE_URL: process.env.SITE_URL,
  PLAUSIBLE_SCRIPT_URL: process.env.PLAUSIBLE_SCRIPT_URL,
  PLAUSIBLE_DOMAIN: process.env.PLAUSIBLE_DOMAIN,
};
prettyPrintObject(processEnvData, "received PROCESS_ENV");

export const PROCESS_ENV = validateData(processEnvData, processEnvSchema);

/*------------define astro schema experimental.env.schema ------------*/
// describe the behavior of the environment variables schema, tell Astro how to handle these variables
// only be used in astro init

export const astroEnvSchema = {
  schema: {
    NODE_ENV: envField.string({
      context: "server",
      access: "public",
      default: "development",
    }),
    PREVIEW_MODE: envField.boolean({
      context: "server",
      access: "public",
      default: false,
    }),
    SITE_URL: envField.string({
      context: "client",
      access: "public",
    }),
    PLAUSIBLE_SCRIPT_URL: envField.string({
      context: "client",
      access: "public",
      optional: true,
    }),
    PLAUSIBLE_DOMAIN: envField.string({
      context: "client",
      access: "public",
      optional: true,
      default: getHostnameFromUrl(PROCESS_ENV.SITE_URL),
    }),
  },
};
