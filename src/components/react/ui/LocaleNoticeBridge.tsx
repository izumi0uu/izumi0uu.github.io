"use client";

import { useEffect } from "react";

import { toast } from "@/components/react/hooks/useToast";

import type { LocaleValues } from "@/types/config";

interface LocaleNoticeBridgeProps {
  currentLocale: LocaleValues;
  storageKey: string;
}

const LocaleNoticeBridge = ({ currentLocale, storageKey }: LocaleNoticeBridgeProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawNotice = sessionStorage.getItem(storageKey);

      if (!rawNotice) return;

      sessionStorage.removeItem(storageKey);

      const notice = JSON.parse(rawNotice) as {
        title?: string;
        description?: string;
      };

      if (!notice.title && !notice.description) return;

      toast({
        title: notice.title,
        description: notice.description,
      });
    } catch (error) {
      console.warn(`Unable to show locale notice for ${currentLocale}:`, error);
    }
  }, [currentLocale, storageKey]);

  return null;
};

export { LocaleNoticeBridge };
