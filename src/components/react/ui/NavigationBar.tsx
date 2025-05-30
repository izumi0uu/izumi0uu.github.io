"use client"

import { Button } from "@/components/react/radix-ui/Button"
import { SearchBox } from "@/components/react/ui/SearchBox"

import { CONFIG_CLIENT } from "@/config/client"
import { ROUTES } from "@/constants/routes"
import * as m from "@/paraglide/messages"

import { cn } from "@/utils/ui/styles"
import { Link } from "@radix-ui/react-navigation-menu"

const NavigationBar = () => {
  return (
    <div className="container flex h-14 max-w-screen-2xl items-center px-8">
      <div className="flex gap-6 md:gap-10">
        <a className="hidden items-center justify-center space-x-2 lg:flex" href="/">
          <Button variant="brutal-normal" className="text-2xl">
            {CONFIG_CLIENT.AUTHOR_NAME.charAt(1).toUpperCase()}
          </Button>
          <span className="text-content hidden text-2xl font-black tracking-tighter uppercase sm:inline-block">
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
      </div>
    </div>
  )
}

export { NavigationBar }
