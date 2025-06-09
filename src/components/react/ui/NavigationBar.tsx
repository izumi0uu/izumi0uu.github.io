"use client";

import { useState, useMemo, useCallback } from "react";
import React from "react";

import { Link } from "@/components/react/ui/Link";
import { Logo } from "@/components/react/ui/Logo";
import { SearchBox } from "@/components/react/ui/SearchBox";
import { MobileNavIcon, MobileNavigationBar } from "@/components/react/ui/MoblieNavigationBar";
import { ModeToggleButton } from "@/components/react/ui/ModeToggleButton";
import { ThemePopoverList } from "@/components/react/ui/ThemePopoverList";
import { I18nToggleButton } from "@/components/react/ui/I18nToggleButton";

import { CONFIG_CLIENT } from "@/config/client";
import { ROUTES } from "@/constants/routes";
import * as m from "@/paraglide/messages";
import { getPathWithLocale } from "@/utils/routing/paths";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const localizedTexts = useMemo(() => {
    return {
      blog: m["components.navigation_menu.blog_link"](),
      explore: m["components.navigation_menu.explore_link"](),
      projects: m["components.navigation_menu.projects_link"](),
      experience: m["components.navigation_menu.experience_link"](),
      links: m["components.navigation_menu.links_link"](),
    };
  }, []);

  const renderNavLink = useCallback((route: string, text: string, keyName: string) => {
    return (
      <Link
        href={getPathWithLocale(route)}
        key={`nav-link-${keyName}`}
        variant="brutal"
        className="h-10 px-4 py-2"
      >
        {text}
      </Link>
    );
  }, []);

  return (
    <div className="container flex h-14 max-w-screen-2xl items-center px-8">
      <div className="flex gap-6 md:gap-10">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="hidden text-2xl font-black tracking-tighter text-content uppercase sm:inline-block">
            {CONFIG_CLIENT.AUTHOR_NAME}
          </span>
        </div>
        <nav className="hidden gap-4 lg:flex">
          {renderNavLink(ROUTES.BLOG, localizedTexts.blog, "blog")}
          {renderNavLink(ROUTES.EXPLORE, localizedTexts.explore, "explore")}
          {renderNavLink(ROUTES.PROJECTS, localizedTexts.projects, "projects")}
          {renderNavLink(ROUTES.EXPERIENCE, localizedTexts.experience, "experience")}
          {renderNavLink(ROUTES.LINKS, localizedTexts.links, "links")}
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-between md:justify-end">
        <SearchBox />
        <ModeToggleButton />
        <ThemePopoverList />
        <I18nToggleButton className="mt-1 ml-2" />
        <MobileNavigationBar position="top">
          <MobileNavIcon isActive={isMenuOpen} onClick={toggleMenu} />
        </MobileNavigationBar>
      </div>
    </div>
  );
};

export { NavigationBar };
