import React, { useMemo } from "react";
import footerImage from "@/assets/images/footer-default.png";

import { Link } from "@/components/react/ui/Link";
import { Logo } from "@/components/react/ui/Logo";

import { cn } from "@/utils/ui/styles";
import * as m from "@/paraglide/messages";
import { Github, Linkedin, Mail, Globe, FileText, User, Briefcase, Rss } from "lucide-react";

import { CONFIG_CLIENT } from "@/config/client";
import { ROUTES } from "@/constants/routes";

const { SITE_URL, AUTHOR_LINKEDIN, AUTHOR_GITHUB, AUTHOR_EMAIL, REPO_URL, AUTHOR_NAME } =
  CONFIG_CLIENT;

// 使用React.memo包装组件以减少重渲染
export const Footer = React.memo(() => {
  const domain = SITE_URL.replace(/^https?:\/\//, "");

  const localizedTexts = useMemo(() => {
    return {
      backToTop: m["components.footer.back_to_top"](),
      brandDescription: m["components.footer.brand_description"](),
      latestCommit: m["components.footer.latest_commit"](),
      resources: m["components.footer.sections.resources"](),
      quickInfo: m["components.footer.sections.quick_info"](),
      social: m["components.footer.sections.social"](),
      copyright: m["components.footer.copyright_text"]({
        year: new Date().getFullYear().toString(),
        author: AUTHOR_NAME,
      }),
      domainLabel: m["components.footer.meta.domain_label"](),
      builtWith: m["components.footer.meta.built_with"](),
    };
  }, []);

  // 在客户端动态获取git信息 - 这需要从props传入或使用其他方式
  const commitInfo = {
    time: new Date().toISOString(),
    fullHash: "latest",
    message: "Latest commit",
  };

  const commitUrl = `${REPO_URL}/commit/${commitInfo.fullHash}`;
  const shortDateStr = new Date(commitInfo.time).toLocaleDateString();
  const trimmedMessage = commitInfo.message.substring(0, 15);

  const footerNavigation = useMemo(
    () => ({
      resources: [
        { name: m["components.footer.links.blog"](), href: ROUTES.BLOG, icon: FileText },
        {
          name: m["components.footer.links.projects"](),
          href: ROUTES.PROJECTS,
          icon: Briefcase,
        },
        { name: m["components.footer.links.about"](), href: ROUTES.ABOUT, icon: User },
      ],
      quickInfo: [
        { name: m["components.footer.links.contact"](), href: ROUTES.CONTACT, icon: Mail },
        { name: m["components.footer.links.rss_feed"](), href: ROUTES.API.FEED_RSS, icon: Rss },
        { name: m["components.footer.links.sitemap"](), href: "/sitemap.xml", icon: Globe },
      ],
      social: [
        { name: m["components.footer.links.github"](), href: AUTHOR_GITHUB, icon: Github },
        {
          name: m["components.footer.links.linkedin"](),
          href: AUTHOR_LINKEDIN,
          icon: Linkedin,
        },
        { name: m["components.footer.links.email"](), href: AUTHOR_EMAIL, icon: Mail },
      ],
    }),
    []
  );

  return (
    <footer
      className={cn("border-t border-outline bg-surface-container", "mt-auto px-4 py-12")}
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Brand Section */}
          <section className="md:col-span-5 lg:col-span-4" aria-labelledby="brand-heading">
            <div className="space-y-4">
              {/* Brand Logo and Name */}
              <Link
                href="/"
                variant="heading"
                className={cn("inline-flex items-center gap-3")}
                aria-label={localizedTexts.backToTop}
              >
                <Logo />
                <span className="text-xl font-bold tracking-tight">{AUTHOR_NAME}</span>
              </Link>

              {/* Brand Description */}
              <p className={cn("max-w-md leading-relaxed text-content", "text-sm")}>
                {localizedTexts.brandDescription}
              </p>

              {/* Latest Commit Info */}
              <div className="flex items-center gap-2 text-xs text-content">
                <Github className="h-4 w-4" />
                <span className="font-medium">{localizedTexts.latestCommit}:</span>
                <Link
                  href={commitUrl}
                  external={true}
                  variant="outline"
                  className="px-1"
                  title={`${shortDateStr} - ${commitInfo.message}`}
                >
                  {trimmedMessage}
                </Link>
              </div>
            </div>
          </section>

          {/* Navigation Section */}
          <nav className="md:col-span-7 lg:col-span-8" aria-label="footer-navigation">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {/* Resources Links */}
              <section aria-labelledby="resources-heading">
                <h3
                  id="resources-heading"
                  className={cn("mb-4 font-semibold text-content", "text-sm")}
                >
                  {localizedTexts.resources}
                </h3>
                <ul className="space-y-3" role="list">
                  {footerNavigation.resources.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={item.href}>
                        <Link href={item.href} variant="underline">
                          <IconComponent className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Quick Info Links */}
              <section aria-labelledby="info-heading">
                <h3 id="info-heading" className={cn("mb-4 font-semibold text-content", "text-sm")}>
                  {localizedTexts.quickInfo}
                </h3>
                <ul className="space-y-3" role="list">
                  {footerNavigation.quickInfo.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={item.href}>
                        <Link href={item.href} variant="underline">
                          <IconComponent className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Social Links */}
              <section aria-labelledby="social-heading">
                <h3
                  id="social-heading"
                  className={cn("mb-4 font-semibold text-content", "text-sm")}
                >
                  {localizedTexts.social}
                </h3>
                <ul className="flex flex-wrap gap-3 lg:flex-col lg:gap-0 lg:space-y-3" role="list">
                  {footerNavigation.social.map((item) => {
                    const IconComponent = item.icon;
                    const followText = m["components.footer.meta.follow_on"]({
                      platform: item.name,
                    });
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          external={true}
                          variant="underline"
                          aria-label={followText}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Footer Image */}
              <section
                aria-labelledby="footer-image"
                className="flex items-start justify-center lg:justify-start"
              >
                <img src={footerImage.src} alt="Footer Image" className="h-16 w-16 object-cover" />
              </section>
            </div>
          </nav>
        </div>

        {/* Copyright Section - 移除多余的ref */}
        <section
          className={cn(
            "mt-12 border-t border-outline-variant pt-8",
            "flex flex-col items-center justify-between gap-4 md:flex-row"
          )}
          aria-label="copyright"
        >
          <p className={cn("text-xs text-content lg:text-sm", "text-center md:text-left")}>
            {localizedTexts.copyright}
          </p>

          {/* Additional Meta Info */}
          <div className={cn("text-xs text-content", "flex items-center gap-4")}>
            <span>
              {localizedTexts.domainLabel}: {domain}
            </span>
            <span>•</span>
            <span>{localizedTexts.builtWith}</span>
          </div>
        </section>
      </div>
    </footer>
  );
});

// 添加组件显示名称
Footer.displayName = "Footer";
