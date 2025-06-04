"use client";

import { useState } from "react";

import { Button } from "@/components/react/radix-ui/Button";
import { SearchBox } from "@/components/react/ui/SearchBox";
import { MobileNavIcon, MobileNavigationBar } from "@/components/react/ui/MoblieNavigationBar";
import { ModeToggleButton } from "@/components/react/ui/ModeToggleButton";
import { ThemePopoverList } from "@/components/react/ui/ThemePopoverList";
import { I18nToggleButton } from "@/components/react/ui/I18nToggleButton";

import logo from "/public/images/favicons/favicon-96x96.png";

import { CONFIG_CLIENT } from "@/config/client";
import { ROUTES } from "@/constants/routes";
import * as m from "@/paraglide/messages";
import { cn } from "@/utils/ui/styles";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container flex h-14 max-w-screen-2xl items-center px-8">
      <div className="flex gap-6 md:gap-10">
        <a className="hidden items-center justify-center space-x-2 lg:flex" href="/">
          <Button variant="brutal-normal" className="p-2">
            <img
              src={logo.src}
              alt="logo"
              width={24}
              height={24}
              loading="eager"
              decoding="async"
              className="h-8 w-8"
              fetchPriority="high"
              style={{ aspectRatio: "1/1" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </Button>
          <span className="hidden text-2xl font-black tracking-tighter text-content uppercase sm:inline-block">
            {CONFIG_CLIENT.AUTHOR_NAME}
          </span>
        </a>
        <nav className="hidden gap-4 lg:flex">
          <Button variant="brutal">{m["components.navigation_menu.blog_link"]()}</Button>
          <Button variant="brutal">{m["components.navigation_menu.projects_link"]()}</Button>
          <Button variant="brutal">{m["components.navigation_menu.experience_link"]()}</Button>
          <Button variant="brutal">{m["components.navigation_menu.links_link"]()}</Button>
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
