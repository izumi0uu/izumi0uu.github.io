"use client";

import { useState, useMemo, useCallback } from "react";
import React from "react";

import { Link } from "@/components/react/ui/Link";
import { Logo } from "@/components/react/ui/Logo";
import { SearchBox } from "@/components/react/ui/SearchBox";
import { MobileNavIcon, MobileNavigationBar } from "@/components/react/ui/MobileNavigationBar";
import { ModeToggleButton } from "@/components/react/ui/ModeToggleButton";
import { ThemePopoverList } from "@/components/react/ui/ThemePopoverList";
import { I18nToggleButton } from "@/components/react/ui/I18nToggleButton";

import { CONFIG_CLIENT } from "@/config/client";
import { ROUTES } from "@/constants/routes";
import * as m from "@/paraglide/messages";
import { getPathWithLocale } from "@/utils/routing/paths";

// 使用React.memo来避免不必要的渲染
// 修复GitHub Pages构建问题
const NavigationBar = React.memo(() => {
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

  // 预先创建导航链接列表以避免重复渲染
  const navLinks = useMemo(() => {
    const links = [
      { route: ROUTES.BLOG, text: localizedTexts.blog, key: "blog" },
      { route: ROUTES.EXPLORE, text: localizedTexts.explore, key: "explore" },
      { route: ROUTES.PROJECTS, text: localizedTexts.projects, key: "projects" },
      { route: ROUTES.EXPERIENCE, text: localizedTexts.experience, key: "experience" },
      { route: ROUTES.LINKS, text: localizedTexts.links, key: "links" },
    ];

    return links.map(({ route, text, key }) => (
      <Link
        href={getPathWithLocale(route)}
        key={`nav-link-${key}`}
        variant="brutal"
        className="h-10 px-4 py-2"
      >
        {text}
      </Link>
    ));
  }, [localizedTexts]);

  return (
    <div className="container flex h-14 max-w-screen-2xl items-center px-8">
      <div className="flex gap-6 md:gap-10">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="hidden text-2xl font-black tracking-tighter text-content uppercase sm:inline-block">
            {CONFIG_CLIENT.AUTHOR_NAME}
          </span>
        </div>
        <nav className="hidden gap-4 lg:flex">{navLinks}</nav>
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
});

NavigationBar.displayName = "NavigationBar";

export { NavigationBar };
