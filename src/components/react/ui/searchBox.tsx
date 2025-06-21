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

// 简化的静态选项，暂时不使用 Paraglide 消息
const techOptions = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "astro", label: "Astro" },
  { value: "web3", label: "Web3" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
];

const experienceOptions = [
  { value: "hackathon", label: "Hackathon" },
  { value: "open_source", label: "Open Source" },
  { value: "telegram_bot", label: "Telegram Bot" },
];

const projectOptions = [{ value: "decode", label: "Decode" }];

const allOptions = [...techOptions, ...experienceOptions, ...projectOptions];

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  // 确保只在客户端渲染
  if (typeof window === "undefined") {
    return null;
  }

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  const getSelectedLabel = () => {
    return allOptions.find((option) => option.value === value)?.label;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="brutal-normal"
          role="combobox"
          aria-expanded={open}
          className="group w-[200px] justify-between"
        >
          {value ? getSelectedLabel() : "Search..."}

          <div className="ml-2 transition-transform duration-200 ease-in-out group-hover:scale-125">
            <Search className="h-4 w-4 shrink-0 opacity-100" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] border-0 p-0 shadow-none">
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Technologies">
              {techOptions.map((tech) => (
                <CommandItem key={tech.value} value={tech.value} onSelect={handleSelect}>
                  <Swords className="mr-2 size-4" />
                  <span>{tech.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Experience">
              {experienceOptions.map((experience) => (
                <CommandItem
                  key={experience.value}
                  value={experience.value}
                  onSelect={handleSelect}
                >
                  <Sword className="mr-2 size-4" />
                  <span>{experience.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projectOptions.map((project) => (
                <CommandItem key={project.value} value={project.value} onSelect={handleSelect}>
                  <ShieldHalf className="mr-2 size-4" />
                  <span>{project.label}</span>
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
