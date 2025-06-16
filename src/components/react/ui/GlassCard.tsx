// component.tsx
import * as React from "react";
import AstroIcon from "@/assets/icons/astro.svg";
import ReactIcon from "@/assets/icons/react.svg";
import { Instagram, Twitter, Github, ChevronDown } from "lucide-react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  content?: string;
  icon?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      title = "Monochrome",
      content = "Create, share, and use beautiful custom elements made with CSS.",
      icon = "astro",
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
        <div className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotate3d(1,1,0,30deg)] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px]">
          <div className="absolute inset-2 [transform:translate3d(0,0,25px)] rounded-[55px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d]"></div>
          <div className="absolute [transform:translate3d(0,0,26px)]">
            <div className="px-7 pt-[100px] pb-0">
              <span className="block text-xl font-black text-white">{title}</span>
              <span className="mt-5 block text-[15px] text-zinc-300">{content}</span>
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
                  className="group/social grid h-[30px] w-[30px] place-content-center rounded-full border-none bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out group-hover:[transform:translate3d(0,0,50px)] group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px] hover:bg-black active:bg-yellow-400"
                  style={{ transitionDelay: delay }}
                >
                  <Icon className="h-4 w-4 stroke-black transition-colors" />
                </button>
              ))}
            </div>
            <div className="flex w-2/5 cursor-pointer items-center justify-end transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]">
              <button className="border-none bg-none text-xs font-bold text-white">
                View more
              </button>
              <ChevronDown className="h-4 w-4 stroke-white" strokeWidth={3} />
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
                className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              ></div>
            ))}
            <div
              className="absolute grid aspect-square w-[50px] [transform:translate3d(0,0,100px)] place-content-center rounded-full bg-white shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all [transition-delay:1.6s] duration-500 ease-in-out group-hover:[transform:translate3d(0,0,120px)]"
              style={{ top: "30px", right: "30px" }}
            >
              <AstroIcon className="w-5 fill-black" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
