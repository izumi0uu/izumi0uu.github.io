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

  }, []);

  const handleThemeChange = (themePrefix: string) => {

  };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="brutal"><Palette /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        checked={showStatusBar}
        onCheckedChange={setShowStatusBar}
      >
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
        disabled
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showPanel}
        onCheckedChange={setShowPanel}
      >
        Panel
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
  );
};

export { ThemePopoverList };
