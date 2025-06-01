import { useState, useEffect } from "react";
import { Button } from "@/components/react/radix-ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/react/radix-ui/DropdownMenu";
import { Palette } from "lucide-react";

import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import type { ChangeThemeCustomEvent } from "@/types/constants";

import { THEME_CONFIG } from "@/constants/theme";
import {
  switchToTheme,
  getAvailableThemePrefixes,
  toggleModeInSameTheme,
  getThemeNamePrefix,
  getCurrentTheme,
} from "@/utils/ui/theme";

const { CHANGE_EVENT } = THEME_CONFIG;

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface ThemePopoverListProps {
  className?: string;
}

const ThemePopoverList: React.FC<ThemePopoverListProps> = ({ className }) => {
  const [currentThemePrefix, setCurrentThemePrefix] = useState<string>("");
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);

  const updateThemeState = () => {
    const currentTheme = getCurrentTheme();
    if (currentTheme) {
      const prefix = getThemeNamePrefix(currentTheme.name);
      setCurrentThemePrefix(prefix);
    }

    const themes = getAvailableThemePrefixes();
    setAvailableThemes(themes);
  };

  useEffect(() => {
    updateThemeState();

    const handleThemeChange = (event: Event) => {
      const customEvent = event as ChangeThemeCustomEvent;
      const newTheme = customEvent.detail.theme;
      const prefix = getThemeNamePrefix(newTheme.name);
      setCurrentThemePrefix(prefix);

      const themes = getAvailableThemePrefixes();
      setAvailableThemes(themes);
    };
    document.addEventListener(CHANGE_EVENT, handleThemeChange);

    return () => {
      document.removeEventListener(CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const handleThemeChange = (themePrefix: string) => {
    if (themePrefix === "cancel") return;

    try {
      const nextTheme = switchToTheme(themePrefix);
      const payload = { detail: { theme: nextTheme } } as ChangeThemeCustomEvent;
      const themeChangeEvent = new CustomEvent(CHANGE_EVENT, payload);

      // dispatch event
      document.dispatchEvent(themeChangeEvent);
    } catch (error) {
      console.error(`Failed to switch theme: ${themePrefix}`, error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="brutal">
          <Palette />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableThemes.map((themePrefix) => (
          <DropdownMenuCheckboxItem
            key={themePrefix}
            checked={currentThemePrefix === themePrefix}
            onCheckedChange={() => handleThemeChange(themePrefix)}
          >
            {themePrefix}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuCheckboxItem onCheckedChange={() => handleThemeChange("cancel")}>
          Cancel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemePopoverList };
