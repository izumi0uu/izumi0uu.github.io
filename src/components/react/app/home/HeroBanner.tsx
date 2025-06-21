import React from "react";
import { RotatingText } from "@/components/react/ui/RotatingText";
import { SplitText } from "@/components/react/ui/SplitText";
import { Link } from "@/components/react/ui/Link";

interface HeroBannerProps {
  blogPath: string;
}

const HeroBanner = React.memo(({ blogPath }: HeroBannerProps) => {
  return (
    <div
      id="hero-page-banner"
      aria-label="hero-page-banner"
      className="mx-auto flex max-w-2xl flex-col justify-center gap-6 lg:mx-0"
    >
      <div className="flex flex-col items-baseline">
        <SplitText
          text={"Hey. I'm Izumi0uu."}
          className="overflow-visible text-center text-4xl font-semibold text-headings md:text-5xl lg:text-6xl xl:text-7xl"
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>
      <div className="inline-flex">
        <h1 className="text-2xl leading-relaxed font-bold text-on-surface md:text-3xl lg:text-4xl lg:leading-snug">
          I'm a&nbsp;
        </h1>
        <RotatingText
          texts={["Frontend Developer!", "Web Developer!", "Web3 Enthusiast!"]}
          mainClassName="items-center justify-center overflow-hidden border-b border-outline text-2xl text-primary md:text-3xl lg:text-4xl xl:text-5xl"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
      <p className="max-w-lg leading-relaxed text-on-surface-variant md:text-lg">
        Happy to see you here! In this place, you can find some of interesting ideas and projects.
        Enjoy your time!
      </p>
      <Link href={blogPath} variant="brutal" size="lg" className="justify-center">
        To See My Blogs
      </Link>
    </div>
  );
});

export { HeroBanner };
