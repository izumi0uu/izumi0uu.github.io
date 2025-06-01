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
import { toggleModeInSameTheme } from "@/utils/ui/theme";

const { CHANGE_EVENT } = THEME_CONFIG;

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Checkboxes: React.FC = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="brutal-normal">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
