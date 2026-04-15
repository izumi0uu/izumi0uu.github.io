import { Languages } from "lucide-react";

import { Button } from "@/components/react/radix-ui/Button";

interface I18nToggleButtonProps {
  className?: string;
  href: string;
  targetLocale: string;
  targetLabel: string;
  preferredLocaleStorageKey: string;
  noticeStorageKey: string;
  buttonTitle: string;
  missingTranslation: boolean;
  missingTranslationTitle: string;
  missingTranslationDescription: string;
}

const I18nToggleButton = ({
  className,
  href,
  targetLocale,
  targetLabel,
  preferredLocaleStorageKey,
  noticeStorageKey,
  buttonTitle,
  missingTranslation,
  missingTranslationTitle,
  missingTranslationDescription,
}: I18nToggleButtonProps) => {
  const handleLocaleSwitch = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(preferredLocaleStorageKey, targetLocale);
    } catch (error) {
      console.warn("Unable to persist preferred locale:", error);
    }

    if (missingTranslation) {
      try {
        sessionStorage.setItem(
          noticeStorageKey,
          JSON.stringify({
            title: missingTranslationTitle,
            description: missingTranslationDescription,
          })
        );
      } catch (error) {
        console.warn("Unable to queue locale switch notice:", error);
      }
    }

    window.location.assign(href);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLocaleSwitch}
      className={className}
      title={buttonTitle}
      aria-label={buttonTitle}
    >
      <Languages />
    </Button>
  );
};

export { I18nToggleButton };
