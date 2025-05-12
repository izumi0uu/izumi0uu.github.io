import { NODE_ENV as NODE_ENV_STRING, PREVIEW_MODE } from "astro:env/server";

import { configServerSchema } from "@/schemas/config";
import { CONFIG_CLIENT } from "@/config/client";
import { validateData } from "@/utils/data/validation";

import type { ConfigServerType } from "@/types/config";

// 类型转换 (Type Casting)
// 从 `astro:env/server` 导入的 `NODE_ENV_STRING` 类型可能比较通用 (string)，
// 这里将其显式转换为我们在 `ConfigServerType` 中定义的更具体的类型 ('development' | 'production' | 'test')。
// 这有助于 TypeScript 进行更精确的类型检查。
const NODE_ENV = NODE_ENV_STRING as ConfigServerType["NODE_ENV"];

//对于静态站点生成 (SSG)，所有环境变量仅在构建时使用。
const configServerData: ConfigServerType = { NODE_ENV, PREVIEW_MODE };

export const CONFIG_SERVER = validateData(configServerData, configServerSchema);

/**
 * @constant MERGED_CONFIG
 * @description 合并了服务端 (`CONFIG_SERVER`) 和客户端 (`CONFIG_CLIENT`) 的配置对象。
 * 提供一个统一的访问点来获取所有经过校验的配置信息。
 * 注意：这样做是为了方便，但在实际使用中仍需注意区分哪些配置只应在服务端访问。
 */
export const MERGED_CONFIG = { ...CONFIG_SERVER, ...CONFIG_CLIENT };
