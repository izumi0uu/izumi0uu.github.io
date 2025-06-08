"use client";

import { useState } from "react";

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
          <Link href={getPathWithLocale(ROUTES.BLOG)} reload={true}>
            <Button variant="brutal" key="nav-blog-button" client:visible>
              {m["components.navigation_menu.blog_link"]()}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.EXPLORE)} reload={true}>
            <Button variant="brutal" key="nav-explore-button" client:visible>
              {m["components.navigation_menu.explore_link"]()}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.PROJECTS)} reload={true}>
            <Button variant="brutal" key="nav-projects-button" client:visible>
              {m["components.navigation_menu.projects_link"]()}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.EXPERIENCE)} reload={true}>
            <Button variant="brutal" key="nav-experience-button" client:visible>
              {m["components.navigation_menu.experience_link"]()}
            </Button>
          </Link>
          <Link href={getPathWithLocale(ROUTES.LINKS)}>
            <Button variant="brutal" key="nav-links-button" client:visible>
              {m["components.navigation_menu.links_link"]()}
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
