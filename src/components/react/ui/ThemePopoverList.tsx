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
  label: string;
  cancelLabel: string;
  themeLabels: Record<string, string>;
}

/**
 * @description 主题前缀到 i18n 翻译的映射函数
 * @param themePrefix - 主题前缀（如 "default", "wine"）
 * @returns 翻译后的主题显示名称
 */
const getThemeDisplayName = (themePrefix: string, themeLabels: Record<string, string>): string =>
  themeLabels[themePrefix] ?? themePrefix.charAt(0).toUpperCase() + themePrefix.slice(1);

const ThemePopoverList: React.FC<ThemePopoverListProps> = ({
  className,
  label,
  cancelLabel,
  themeLabels,
}) => {
  const [currentThemePrefix, setCurrentThemePrefix] = useState<string>("");
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);

  const updateThemeState = () => {
    // 安全地处理主题状态，避免 SSR 问题
    if (typeof window === "undefined") return;

    try {
      const currentTheme = getCurrentTheme();
      if (currentTheme) {
        const prefix = getThemeNamePrefix(currentTheme.name);
        setCurrentThemePrefix(prefix);
      }

      const themes = getAvailableThemePrefixes();
      setAvailableThemes(themes);
    } catch (error) {
      console.warn("Failed to update theme state:", error);
    }
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
        <Button variant="brutal" className="group">
          <div className="transition-transform duration-200 ease-in-out group-hover:scale-125">
            <Palette className="h-4 w-4 shrink-0 opacity-100" />
          </div>
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableThemes.map((themePrefix) => (
          <DropdownMenuCheckboxItem
            key={themePrefix}
            checked={currentThemePrefix === themePrefix}
            onCheckedChange={() => handleThemeChange(themePrefix)}
          >
            {getThemeDisplayName(themePrefix, themeLabels)}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem onCheckedChange={() => handleThemeChange("cancel")}>
          {cancelLabel}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemePopoverList };
export type { ThemePopoverListProps };
