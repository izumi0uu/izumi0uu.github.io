import { Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { Checkboxes } from "@/components/react/radix-ui/CheckedBoxes";
import { Button } from "@/components/react/radix-ui/Button";

import type { ChangeThemeCustomEvent } from "@/types/constants";
import { THEME_CONFIG } from "@/constants/theme";
import { toggleModeInSameTheme } from "@/utils/ui/theme";

const { CHANGE_EVENT } = THEME_CONFIG;

interface ThemePopoverListProps {
  className?: string;
}

const ThemePopoverList: React.FC<ThemePopoverListProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsOpen(isDarkMode);
    };

    checkTheme();

    const handleThemeChange = (event: Event) => {
      const customEvent = event as ChangeThemeCustomEvent;
      const newTheme = customEvent.detail.theme;
      setIsOpen(newTheme.mode === "dark");
    };

    document.addEventListener(CHANGE_EVENT, handleThemeChange);

    return () => {
      document.removeEventListener(CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const handleToggle = () => {
    try {
      const nextTheme = toggleModeInSameTheme();
      const payload = { detail: { theme: nextTheme } } as ChangeThemeCustomEvent;
      const themeChangeEvent = new CustomEvent(CHANGE_EVENT, payload);

      // dispatch event
      document.dispatchEvent(themeChangeEvent);
    } catch (error) {
      console.error("Failed to toggle theme:", error);
    }
  };

  return (
    <Button
      type="button"
      role="switch"
      variant="brutal"
      aria-checked={isOpen}
      aria-label={"theme-popover-list"}
      onClick={handleToggle}
      className={className}
    >
      {isOpen ? <Palette /> : <Palette />}
    </Button>
  );
};

export { ThemePopoverList };
