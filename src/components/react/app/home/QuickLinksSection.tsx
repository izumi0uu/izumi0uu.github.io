import React from "react";
import { Link } from "@/components/react/ui/Link";
import { Separator } from "@/components/react/radix-ui/Separator";

interface QuickLink {
  name: string;
  href: string;
  icon: string;
}

interface QuickLinksSectionProps {
  links: QuickLink[];
}

/**
 * QuickLinksSection组件 - 封装首页中的快速链接部分
 * 将所有链接一次性水合，避免多次水合导致的内存泄漏
 */
export const QuickLinksSection = React.memo(({ links }: QuickLinksSectionProps) => {
  return (
    <section
      id="quick-links"
      aria-label="quick-links"
      className="flex-col-layout mode-theme-switch"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Title */}
        <h2 className="mb-8 text-2xl font-bold text-headings md:text-3xl">Quick links</h2>

        {/* Links Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((link, index) => (
            <Link
              key={`quick-link-${index}`}
              href={link.href}
              variant="outline"
              size="sm"
              className="flex w-full items-center justify-between"
            >
              <span className="text-lg font-medium">{link.name}</span>
              <span className="text-xl transition-transform group-hover:translate-x-1">
                {link.icon}
              </span>
            </Link>
          ))}
        </div>

        {/* Optional Separator */}
        <div className="mx-auto">
          <Separator className="bg-outline" />
        </div>
      </div>
    </section>
  );
});

QuickLinksSection.displayName = "QuickLinksSection";
