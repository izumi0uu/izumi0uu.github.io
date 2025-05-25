import type { z } from "zod";
import type {
  configClientSchema,
  configServerSchema,
  localeValues,
  processEnvSchema,
} from "@/schemas/config";

type ConfigServerSchemaType = typeof configServerSchema;
type ConfigServerType = z.infer<ConfigServerSchemaType>;

type ConfigClientSchemaType = typeof configClientSchema;
type ConfigClientType = z.infer<ConfigClientSchemaType>;

type ProcessEnvSchemaType = typeof processEnvSchema;
type ProcessEnvType = z.infer<ProcessEnvSchemaType>;

type LocaleValues = (typeof localeValues)[number];

export type {
  ConfigServerSchemaType,
  ConfigServerType,
  ConfigClientSchemaType,
  ConfigClientType,
  ProcessEnvSchemaType,
  ProcessEnvType,
  LocaleValues,
};
