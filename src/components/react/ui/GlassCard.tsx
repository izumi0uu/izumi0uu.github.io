// component.tsx
import * as React from "react";
import { Instagram, Twitter, Github, ChevronDown } from "lucide-react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  content?: string;
  icon?: string;
  children?: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      title = "Monochrome",
      content = "Create, share, and use beautiful custom elements made with CSS.",
      icon = "astro",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`group h-[300px] w-[290px] [perspective:1000px] ${className}`}
        {...props}
      >
        <div
          className="relative h-full rounded-[50px] shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotate3d(1,1,0,30deg)] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px]"
          style={{
            background: "var(--color-glass-card-background)",
          }}
        >
          <div
            className="absolute inset-2 [transform:translate3d(0,0,25px)] rounded-[55px] border-b border-l backdrop-blur-sm [transform-style:preserve-3d]"
            style={{
              borderColor: "var(--color-glass-card-border)",
              background: "var(--color-glass-card-overlay)",
            }}
          ></div>
          <div className="absolute [transform:translate3d(0,0,26px)]">
            <div className="px-7 pt-[100px] pb-0">
              <span
                className="block text-xl font-black"
                style={{ color: "var(--color-glass-card-title)" }}
              >
                {title}
              </span>
              <span
                className="mt-5 block text-[15px]"
                style={{ color: "var(--color-glass-card-content)" }}
              >
                {content}
              </span>
            </div>
          </div>
          <div className="absolute right-5 bottom-5 left-5 flex [transform:translate3d(0,0,26px)] items-center justify-between [transform-style:preserve-3d]">
            <div className="flex gap-2.5 [transform-style:preserve-3d]">
              {[
                { icon: Instagram, delay: "400ms" },
                { icon: Twitter, delay: "600ms" },
                { icon: Github, delay: "800ms" },
              ].map(({ icon: Icon, delay }, index) => (
                <button
                  key={index}
                  className="group/social grid h-[30px] w-[30px] place-content-center rounded-full border-none shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out group-hover:[transform:translate3d(0,0,50px)] group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px] hover:bg-black active:bg-yellow-400"
                  style={{
                    backgroundColor: "var(--color-glass-card-icon-bg)",
                    transitionDelay: delay,
                  }}
                >
                  <Icon
                    className="h-4 w-4 transition-colors"
                    style={{ color: "var(--color-glass-card-icon-color)" }}
                  />
                </button>
              ))}
            </div>
            <div className="flex w-2/5 cursor-pointer items-center justify-end transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]">
              <button
                className="border-none bg-none text-xs font-bold"
                style={{ color: "var(--color-glass-card-title)" }}
              >
                View more
              </button>
              <ChevronDown
                className="h-4 w-4"
                strokeWidth={3}
                style={{ color: "var(--color-glass-card-title)" }}
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            {[
              { size: "170px", pos: "8px", z: "20px", delay: "0s" },
              { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
              { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
              { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              ></div>
            ))}
            <div
              className="absolute grid aspect-square w-[50px] [transform:translate3d(0,0,100px)] place-content-center rounded-full shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all [transition-delay:1.6s] duration-500 ease-in-out group-hover:[transform:translate3d(0,0,120px)]"
              style={{
                top: "30px",
                right: "30px",
                backgroundColor: "var(--color-glass-card-accent)",
                color: "var(--color-glass-card-accent-text)",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
