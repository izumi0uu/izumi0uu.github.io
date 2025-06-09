"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/react/radix-ui/Button";
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
import { cn } from "@/utils/ui/styles";
import { getPathWithLocale } from "@/utils/routing/paths";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const localizedTexts = useMemo(() => {
    return {
      blog: m["components.navigation_menu.blog_link"](),
      explore: m["components.navigation_menu.explore_link"](),
      projects: m["components.navigation_menu.projects_link"](),
      experience: m["components.navigation_menu.experience_link"](),
      links: m["components.navigation_menu.links_link"](),
    };
  }, []);

  return (
    <div className="container flex h-14 max-w-screen-2xl items-center px-8">
      <div className="flex gap-6 md:gap-10">
        <a
          className="hidden items-center justify-center space-x-2 lg:flex"
          href={getPathWithLocale(ROUTES.HOME)}
        >
          {/* <Logo /> */}
          <span className="hidden text-2xl font-black tracking-tighter text-content uppercase sm:inline-block">
            {CONFIG_CLIENT.AUTHOR_NAME}
          </span>
        </a>
        <nav className="hidden gap-4 lg:flex">
          <Link href={getPathWithLocale(ROUTES.BLOG)}>
            <Button variant="brutal" key="nav-blog-button">
              {localizedTexts.blog}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.EXPLORE)}>
            <Button variant="brutal" key="nav-explore-button">
              {localizedTexts.explore}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.PROJECTS)}>
            <Button variant="brutal" key="nav-projects-button">
              {localizedTexts.projects}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.EXPERIENCE)}>
            <Button variant="brutal" key="nav-experience-button">
              {localizedTexts.experience}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.LINKS)}>
            <Button variant="brutal" key="nav-links-button">
              {localizedTexts.links}
            </Button>
          </Link>
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
