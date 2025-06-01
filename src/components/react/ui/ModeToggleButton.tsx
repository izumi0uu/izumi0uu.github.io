import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/react/radix-ui/Button";
import { clsx } from "clsx";
import { THEME_CONFIG } from "@/constants/theme";
import { getNextTheme } from "@/utils/ui/theme";

import type { ChangeThemeCustomEvent } from "@/types/constants";

const { CHANGE_EVENT } = THEME_CONFIG;

interface ModeToggleButtonProps {
  className?: string;
}

export const ModeToggleButton: React.FC<ModeToggleButtonProps> = ({ className }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    const handleThemeChange = (event: Event) => {
      const customEvent = event as ChangeThemeCustomEvent;
      const newTheme = customEvent.detail.theme;
      setIsDark(newTheme.mode === "dark");
    };

    document.addEventListener(CHANGE_EVENT, handleThemeChange);

    return () => {
      document.removeEventListener(CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const handleToggle = () => {
    try {
      const nextTheme = getNextTheme();
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
      aria-checked={isDark}
      aria-label={isDark ? "切换到亮色主题" : "切换到暗色主题"}
      onClick={handleToggle}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ModeToggleButton;
