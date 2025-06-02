import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/react/radix-ui/Button";
import { THEME_CONFIG } from "@/constants/theme";
import { toggleModeInSameTheme } from "@/utils/ui/theme";
import { cn } from "@/utils/ui/styles";

import type { ChangeThemeCustomEvent } from "@/types/constants";

const { CHANGE_EVENT } = THEME_CONFIG;

interface ModeToggleButtonProps {
  className?: string;
}

const ModeToggleButton: React.FC<ModeToggleButtonProps> = ({ className }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkCurrentMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkCurrentMode();

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
      aria-checked={isDark}
      aria-label={"mode-toggle-button"}
      onClick={handleToggle}
      className={cn("group", className)}
    >
      <div className="transition-transform duration-200 ease-in-out group-hover:scale-125">
        {isDark ? (
          <Sun className="h-4 w-4 shrink-0 opacity-100" />
        ) : (
          <Moon className="h-4 w-4 shrink-0 opacity-100" />
        )}
      </div>
    </Button>
  );
};

export { ModeToggleButton };
