import React from "react";
import { Link } from "@/components/react/ui/Link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

interface HeroLinksProps {
  blogPath: string;
  socialLinks: {
    email: string;
    github: string;
    twitter: string;
    linkedin: string;
  };
}

/**
 * HeroLinks组件 - 封装首页中的主要按钮和社交媒体链接
 * 将多个链接组合为一个组件，减少hydration数量
 */
const HeroLinks = React.memo(({ blogPath, socialLinks }: HeroLinksProps) => {
  return (
    <>
      {/* Main action button */}
      <Link href={blogPath} variant="brutal" size="lg" className="justify-center">
        To See My Blogs
      </Link>

      {/* Social media links */}
      <div className="flex flex-wrap gap-2">
        <Link href={`mailto:${socialLinks.email}`} variant="outline" size="sm">
          <Mail className="h-4 w-4" />
        </Link>
        <Link href={socialLinks.github} variant="outline" size="sm" external>
          <Github className="h-4 w-4" />
        </Link>
        <Link href={socialLinks.twitter} variant="outline" size="sm" external>
          <Twitter className="h-4 w-4" />
        </Link>
        <Link href={socialLinks.linkedin} variant="outline" size="sm" external>
          <Linkedin className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
});

HeroLinks.displayName = "HeroLinks";

export { HeroLinks };
