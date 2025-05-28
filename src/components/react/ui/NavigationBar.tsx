"use client"

import * as React from "react"
import { Button } from "@/components/react/radix-ui/Button"

import { ROUTES } from "@/constants/routes"
import * as m from "@/paraglide/messages"

import { cn } from "@/utils/ui/styles"
import { Link } from "@radix-ui/react-navigation-menu"
// import { Icons } from "@/components/icons"

const NavigationBar = () => {
  return (
    <div className="container flex h-14 max-w-screen-2xl items-center">
      <Button variant="brutal">Home</Button>
    </div>
  )
}

export { NavigationBar }
