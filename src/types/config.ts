/**
 * @description This file contains the types for the config.used for initial config
 */

import type { z } from "zod";
import type {
  configClientSchema,
  configServerSchema,
  processEnvSchema,
} from "../schemas/config";

type ConfigServerSchemaType = typeof configServerSchema;
type ConfigServerType = z.infer<ConfigServerSchemaType>;

type ConfigClientSchemaType = typeof configClientSchema;
type ConfigClientType = z.infer<ConfigClientSchemaType>;

type ProcessEnvSchemaType = typeof processEnvSchema;
type ProcessEnvType = z.infer<ProcessEnvSchemaType>;

export type {
  ConfigServerSchemaType,
  ConfigServerType,
  ConfigClientSchemaType,
  ConfigClientType,
  ProcessEnvSchemaType,
  ProcessEnvType,
};
