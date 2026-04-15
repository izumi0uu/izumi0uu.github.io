import { defineMiddleware } from "astro:middleware";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/config/i18n";
import {
  overwriteServerAsyncLocalStorage,
  serverAsyncLocalStorage,
  type ParaglideAsyncLocalStorage,
} from "./paraglide/runtime.js";

type LocaleStore = {
  locale: string;
  origin: string;
  messageCalls: Set<string>;
};

type LocaleAsyncStorage = {
  getStore(): LocaleStore | undefined;
  run<T>(store: LocaleStore, callback: () => T | Promise<T>): T | Promise<T>;
};

const getLocaleFromUrl = (requestUrl: string): string => {
  const { pathname } = new URL(requestUrl);
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (
    firstSegment &&
    SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number])
  ) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
};

const createFallbackAsyncStorage = (): LocaleAsyncStorage => {
  let currentStore: LocaleStore | undefined;

  return {
    getStore() {
      return currentStore;
    },
    async run<T>(store: LocaleStore, callback: () => T | Promise<T>) {
      currentStore = store;
      try {
        return await callback();
      } finally {
        currentStore = undefined;
      }
    },
  };
};

const ensureLocaleStorage = async (): Promise<LocaleAsyncStorage> => {
  if (serverAsyncLocalStorage) {
    return serverAsyncLocalStorage as LocaleAsyncStorage;
  }

  try {
    const { AsyncLocalStorage } = await import("node:async_hooks");
    const storage = new AsyncLocalStorage<LocaleStore>() as unknown as LocaleAsyncStorage;
    overwriteServerAsyncLocalStorage(storage as unknown as ParaglideAsyncLocalStorage);
    return storage;
  } catch {
    const storage = createFallbackAsyncStorage();
    overwriteServerAsyncLocalStorage(storage as unknown as ParaglideAsyncLocalStorage);
    return storage;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  const storage = await ensureLocaleStorage();
  const locale = getLocaleFromUrl(context.request.url);
  const origin = new URL(context.request.url).origin;

  return storage.run({ locale, origin, messageCalls: new Set() }, () => next());
});
