import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Languages } from "lucide-react";
import { Button } from "@/components/react/radix-ui/Button";

import { setLocale, getLocale, locales } from "@/paraglide/runtime";

import type { LocaleValues } from "@/types/config";

interface I18nToggleButtonProps {
  className?: string;
}

/**
 * @description 国际化语言切换按钮组件
 * localeChange 事件是由 paraglide 派发和命名的
 */
const I18nToggleButton: React.FC<I18nToggleButtonProps> = ({ className }) => {
  const [currentLocale, setCurrentLocale] = useState<LocaleValues>(
    () => getLocale() as LocaleValues
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 监听语言变化
  useEffect(() => {
    const handleLocaleChange = () => {
      setCurrentLocale(getLocale() as LocaleValues);
    };

    document.addEventListener("localeChange", handleLocaleChange);

    return () => {
      document.removeEventListener("localeChange", handleLocaleChange);
    };
  }, []);

  /**
   * @description 切换语言
   * @param {LocaleValues} newLocale - 新的语言标识
   */
  const handleLocaleChange = async (newLocale: LocaleValues) => {
    if (newLocale === currentLocale) return;

    try {
      // ParaglideJS 2.0 的 setLocale 默认会重新加载页面
      setLocale(newLocale);

      // dispatch event
      const event = new CustomEvent("localeChange", {
        detail: { locale: newLocale, previousLocale: currentLocale },
      });
      document.dispatchEvent(event);
    } catch (error) {
      console.error("Failed to change locale:", error);
    }

    setIsDropdownOpen(false);
  };

  /**
   * @description 获取下一个语言（循环切换）
   */
  const getNextLocale = (): LocaleValues => {
    const currentIndex = locales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % locales.length;
    return locales[nextIndex] as LocaleValues;
  };

  /**
   * @description 单击切换语言（仅在两种语言时）
   */
  const handleSingleToggle = () => {
    if (locales.length === 2) {
      handleLocaleChange(getNextLocale());
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleSingleToggle} className={className}>
      <Languages />
    </Button>
  );
};

export { I18nToggleButton };
