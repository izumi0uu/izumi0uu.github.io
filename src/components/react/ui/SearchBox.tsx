"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { Book, FileText, Folder, Search } from "lucide-react";
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

type SearchSectionIcon = "blog" | "project" | "page";

interface SearchOption {
  value: string;
  label: string;
  href: string;
  detail?: string;
  keywords?: readonly string[];
}

interface SearchSection {
  heading: string;
  icon: SearchSectionIcon;
  items: readonly SearchOption[];
}

interface SearchBoxProps {
  placeholder: string;
  tipsPlaceholder: string;
  noResults: string;
  sections: readonly SearchSection[];
}

const iconMap = {
  blog: Book,
  project: Folder,
  page: FileText,
} satisfies Record<SearchSectionIcon, ComponentType<{ className?: string }>>;

const SearchBox = ({ placeholder, tipsPlaceholder, noResults, sections }: SearchBoxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const allOptions = sections.flatMap((section) => section.items);

  const handleSelect = (item: SearchOption) => {
    setValue(item.value);
    setOpen(false);

    if (typeof window !== "undefined" && window.location.pathname !== item.href) {
      window.location.assign(item.href);
    }
  };

  const getSelectedLabel = () => allOptions.find((option) => option.value === value)?.label;

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
          {value ? getSelectedLabel() : placeholder}

          <div className="ml-2 transition-transform duration-200 ease-in-out group-hover:scale-125">
            <Search className="h-4 w-4 shrink-0 opacity-100" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] border-0 p-0 shadow-none">
        <Command>
          <CommandInput placeholder={tipsPlaceholder} />
          <CommandList>
            <CommandEmpty>{noResults}</CommandEmpty>
            {sections.map((section, index) => {
              const Icon = iconMap[section.icon];

              return (
                <div key={section.heading}>
                  {index > 0 && <CommandSeparator />}
                  <CommandGroup heading={section.heading}>
                    {section.items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        keywords={item.keywords ? [...item.keywords] : undefined}
                        onSelect={() => handleSelect(item)}
                      >
                        <Icon className="mr-2 size-4" />
                        <div className="flex min-w-0 flex-col">
                          <span>{item.label}</span>
                          {item.detail && (
                            <span className="text-xs text-on-surface-variant/80">{item.detail}</span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { SearchBox };
export type { SearchBoxProps, SearchSection, SearchOption, SearchSectionIcon };
