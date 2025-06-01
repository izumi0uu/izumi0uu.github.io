"use client";

import { useState } from "react";
import { Search, Sword, Swords, ShieldHalf } from "lucide-react";
import { Button } from "@/components/react/radix-ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/react/radix-ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/react/radix-ui/Popover";

import * as m from "@/paraglide/messages";

const techOptions = [
  { value: "nextjs", label: m["components.search_box.tech_options.nextjs"] },
  { value: "react", label: m["components.search_box.tech_options.react"] },
  { value: "astro", label: m["components.search_box.tech_options.astro"] },
  { value: "web3", label: m["components.search_box.tech_options.web3"] },
  { value: "typescript", label: m["components.search_box.tech_options.typescript"] },
  { value: "javascript", label: m["components.search_box.tech_options.javascript"] },
];

const experienceOptions = [
  { value: "hackathon", label: m["components.search_box.experience_options.hackathon"] },
  { value: "open_source", label: m["components.search_box.experience_options.open_source"] },
  { value: "telegram_bot", label: m["components.search_box.experience_options.telegram_bot"] },
];

const projectOptions = [
  { value: "decode", label: m["components.search_box.project_options.Decode"] },
];

const allOptions = [...techOptions, ...experienceOptions, ...projectOptions];

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  const getSelectedLabel = () => {
    return allOptions.find((option) => option.value === value)?.label();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* group允许子元素响应父元素的 hover 状态 */}
        <Button
          variant="brutal-normal"
          role="combobox"
          aria-expanded={open}
          className="group w-[200px] justify-between"
        >
          {value ? getSelectedLabel() : m["components.search_box.placeholder"]()}

          <div className="ml-2 transition-transform duration-200 ease-in-out group-hover:scale-125">
            <Search className="h-4 w-4 shrink-0 opacity-100" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] border-0 p-0 shadow-none">
        <Command>
          <CommandInput placeholder={m["components.search_box.tips_placeholder"]()} />
          <CommandList>
            <CommandEmpty>{m["components.search_box.no_results"]()}</CommandEmpty>
            <CommandGroup heading={m["components.search_box.tech_options.title"]()}>
              {techOptions.map((tech) => (
                <CommandItem key={tech.value} value={tech.value} onSelect={handleSelect}>
                  <Swords className="mr-2 size-4" />
                  <span>{tech.label()}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={m["components.search_box.experience_options.title"]()}>
              {experienceOptions.map((experience) => (
                <CommandItem
                  key={experience.value}
                  value={experience.value}
                  onSelect={handleSelect}
                >
                  <Sword className="mr-2 size-4" />
                  <span>{experience.label()}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={m["components.search_box.project_options.title"]()}>
              {projectOptions.map((project) => (
                <CommandItem key={project.value} value={project.value} onSelect={handleSelect}>
                  <ShieldHalf className="mr-2 size-4" />
                  <span>{project.label()}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { SearchBox };
