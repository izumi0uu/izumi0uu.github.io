"use client";

import { useState, useMemo, useCallback } from "react";
import React from "react";
import { Book, Globe, Folder, Briefcase, Link as LinkIcon, Home as HomeIcon } from "lucide-react";

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

import { CONFIG_CLIENT } from "@/config/client";
import { ROUTES } from "@/constants/routes";
import * as m from "@/paraglide/messages";
import { getPathWithLocale } from "@/utils/routing/paths";

const NavigationBar = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const localizedTexts = useMemo(() => {
    return {
      blog: m["components.navigation_menu.blog_link"](),
      explore: m["components.navigation_menu.explore_link"](),
      project: m["components.navigation_menu.project_link"](),
      experience: m["components.navigation_menu.experience_link"](),
      links: m["components.navigation_menu.links_link"](),
      home: m["components.navigation_menu.home_link"](),
    };
  }, []);

  const navLinks = useMemo(() => {
    const links = [
      { route: ROUTES.BLOG, text: localizedTexts.blog, key: "blog" },
      { route: ROUTES.EXPLORE, text: localizedTexts.explore, key: "explore" },
      { route: ROUTES.PROJECT, text: localizedTexts.project, key: "project" },
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

  const mobileNavLinks = useMemo(() => {
    const links = [
      { route: ROUTES.HOME, text: localizedTexts.home, key: "home", icon: HomeIcon },
      { route: ROUTES.BLOG, text: localizedTexts.blog, key: "blog", icon: Book },
      { route: ROUTES.EXPLORE, text: localizedTexts.explore, key: "explore", icon: Globe },
      { route: ROUTES.PROJECT, text: localizedTexts.project, key: "project", icon: Folder },
      {
        route: ROUTES.EXPERIENCE,
        text: localizedTexts.experience,
        key: "experience",
        icon: Briefcase,
      },
      { route: ROUTES.LINKS, text: localizedTexts.links, key: "links", icon: LinkIcon },
    ];

    return links.map(({ route, text, key, icon: Icon }) => (
      <MobileNavMenuItem key={`mobile-nav-${key}`} href={getPathWithLocale(route)}>
        <Icon className="h-4 w-4" />
        {text}
      </MobileNavMenuItem>
    ));
  }, [localizedTexts]);

  return (
    <>
      {/* 桌面端导航栏 */}
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
          <div className="hidden md:block">
            <SearchBox />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ModeToggleButton />
            <ThemePopoverList />
            <I18nToggleButton className="mt-1 ml-2" />
          </div>
          {/* 移动端汉堡菜单按钮 */}
          <div className="block md:hidden">
            <MobileNavIcon isActive={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      <MobileNavMenu isOpen={isMenuOpen}>
        {/* 移动端搜索框 */}
        <div className="border-b border-outline/10 px-4 pb-4">
          <SearchBox />
        </div>

        {/* 导航链接 */}
        <div className="space-y-1 py-2">{mobileNavLinks}</div>

        {/* 移动端功能按钮区域 */}
        <div className="border-t border-outline/10 px-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-on-surface-variant uppercase">
                Theme
              </span>
              <div className="flex items-center gap-2">
                <ModeToggleButton />
                <ThemePopoverList />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-on-surface-variant uppercase">
                Language
              </span>
              <I18nToggleButton />
            </div>
          </div>
        </div>
      </MobileNavMenu>
    </>
  );
});

NavigationBar.displayName = "NavigationBar";

export { NavigationBar };
