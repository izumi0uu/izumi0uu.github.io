"use client";

import React, { useState } from "react";
import { Book, Folder, Briefcase, User, Home as HomeIcon } from "lucide-react";

import { Link } from "@/components/react/ui/Link";
import { Logo } from "@/components/react/ui/Logo";
import { SearchBox } from "@/components/react/ui/SearchBox";
import {
  MobileNavIcon,
  MobileNavMenu,
  MobileNavMenuItem,
} from "@/components/react/ui/MobileNavigationBar";
import { ModeToggleButton } from "@/components/react/ui/ModeToggleButton";
import { ThemePopoverList } from "@/components/react/ui/ThemePopoverList";
import { I18nToggleButton } from "@/components/react/ui/I18nToggleButton";

import type { LocaleSwitchTarget } from "@/types/common";

type NavigationKey = "home" | "blog" | "project" | "experience" | "about";

interface NavigationLinkItem {
  key: Exclude<NavigationKey, "home">;
  href: string;
  text: string;
}

interface LocaleSwitchProps extends LocaleSwitchTarget {
  targetLabel: string;
  preferredLocaleStorageKey: string;
  noticeStorageKey: string;
  buttonTitle: string;
  missingTranslationTitle: string;
  missingTranslationDescription: string;
}

interface NavigationBarProps {
  authorName: string;
  homeHref: string;
  homeLabel: string;
  navLinks: NavigationLinkItem[];
  themeLabel: string;
  languageLabel: string;
  localeSwitch?: LocaleSwitchProps;
}

const iconMap: Record<NavigationKey, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  blog: Book,
  project: Folder,
  experience: Briefcase,
  about: User,
};

const NavigationBar = React.memo(
  ({
    authorName,
    homeHref,
    homeLabel,
    navLinks,
    themeLabel,
    languageLabel,
    localeSwitch,
  }: NavigationBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const desktopNavLinks = navLinks.map(({ href, text, key }) => (
      <Link
        href={href}
        key={`nav-link-${key}`}
        variant="brutal"
        className="h-10 px-4 py-2"
      >
        {text}
      </Link>
    ));

    const mobileNavLinks = [
      { key: "home" as const, href: homeHref, text: homeLabel },
      ...navLinks,
    ].map(({ href, text, key }) => {
      const Icon = iconMap[key];

      return (
        <MobileNavMenuItem key={`mobile-nav-${key}`} href={href}>
          <Icon className="h-4 w-4" />
          {text}
        </MobileNavMenuItem>
      );
    });

    return (
      <>
        {/* desktop navigation bar */}
        <div className="flex h-14 w-full items-center px-8">
          <div className="flex gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Logo href={homeHref} />
                <span className="hidden text-2xl font-black tracking-tighter text-content uppercase sm:inline-block">
                  {authorName}
                </span>
              </div>
            </div>
            <nav className="hidden gap-4 lg:flex">{desktopNavLinks}</nav>
          </div>
          <div className="flex flex-1 items-center justify-end">
            {/* desktop function area */}
            <div className="hidden items-center gap-4 md:flex">
              <SearchBox />
              <div className="flex items-center gap-2">
                <ModeToggleButton />
                <ThemePopoverList />
                {localeSwitch && <I18nToggleButton className="mt-1 ml-2" {...localeSwitch} />}
              </div>
            </div>

            {/* mobile hamburger menu button */}
            <div className="block md:hidden">
              <MobileNavIcon
                isActive={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        {/* mobile navigation menu */}
        <MobileNavMenu isOpen={isMenuOpen}>
          {/* mobile search box */}
          <div className="border-b border-outline/10 px-4 py-4">
            <SearchBox />
          </div>

          {/* navigation links */}
          <div className="space-y-1 py-2">{mobileNavLinks}</div>

          {/* mobile function button area */}
          <div className="border-t border-outline/10 px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium tracking-wide text-on-surface-variant uppercase">
                  {themeLabel}
                </span>
                <div className="flex items-center gap-2">
                  <ModeToggleButton />
                  <ThemePopoverList />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium tracking-wide text-on-surface-variant uppercase">
                  {languageLabel}
                </span>
                {localeSwitch && <I18nToggleButton {...localeSwitch} />}
              </div>
            </div>
          </div>
        </MobileNavMenu>
      </>
    );
  }
);

NavigationBar.displayName = "NavigationBar";

export { NavigationBar };
