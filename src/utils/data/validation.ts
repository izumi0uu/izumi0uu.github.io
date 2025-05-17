import { z } from "zod";

import type { ZodSchema } from "zod";

const zodErrorToString = (error: z.ZodError): string => {
  return error.errors
    .map((err: z.ZodIssue) => `${err.path.join(".")}: ${err.message}`)
    .join(", ");
};

const validateData = <T extends ZodSchema>(
  config: z.infer<T>,
  schema: T
): z.infer<T> => {
  const parsedConfig = schema.safeParse(config);

  if (!parsedConfig.success) {
    const zodError = zodErrorToString(parsedConfig.error);
    const errorMessage = `Zod validation error: ${zodError}`;

    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const { data: parsedConfigData } = parsedConfig;

  return parsedConfigData;
};

export { zodErrorToString, validateData };
