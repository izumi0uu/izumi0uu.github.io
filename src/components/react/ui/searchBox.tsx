"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"

import { cn } from "@/utils/ui/styles"
import { Button } from "@/components/react/radix-ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/react/radix-ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/react/radix-ui/Popover"

import * as m from "@/paraglide/messages"

// 简化的技术选项列表
const techOptions = [
  { value: "nextjs", label: m["components.search_box.tech_options.nextjs"] },
  { value: "react", label: m["components.search_box.tech_options.react"] },
  { value: "astro", label: m["components.search_box.tech_options.astro"] },
  { value: "web3", label: m["components.search_box.tech_options.web3"] },
  { value: "typescript", label: m["components.search_box.tech_options.typescript"] },
  { value: "javascript", label: m["components.search_box.tech_options.javascript"] },
]

const SearchBox = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="brutal"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? techOptions.find((tech) => tech.value === value)?.label()
            : m["components.search_box.placeholder"]()}

          <Search className="ml-2 h-4 w-4 shrink-0 opacity-100 transition-transform duration-200 ease-in-out hover:scale-125" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] border-0 p-0 shadow-none">
        <Command>
          <CommandInput placeholder={m["components.search_box.placeholder"]()} />
          <CommandEmpty>{m["components.search_box.no_results"]()}</CommandEmpty>
          <CommandGroup>
            {techOptions.map((tech) => (
              <CommandItem
                key={tech.value}
                value={tech.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn("mr-2 size-4", value === tech.value ? "opacity-100" : "opacity-0")}
                />
                {tech.label()}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { SearchBox }
