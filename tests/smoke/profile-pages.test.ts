import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("profile pages contract", () => {
  it("renders localized about content instead of a title-only placeholder", () => {
    const aboutEn = readRepoFile("dist/en/about/index.html");
    const aboutZh = readRepoFile("dist/zh/about/index.html");

    expect(aboutEn).toContain("Developer profile, working style, and what this site is for.");
    expect(aboutEn).toContain("What I spend time on");
    expect(aboutZh).toContain("开发者画像、工作方式，以及这个站点为什么存在。");
    expect(aboutZh).toContain("我主要把时间花在这些方向");
  });

  it("renders the experience timeline from real published artifacts", () => {
    const experienceEn = readRepoFile("dist/en/experience/index.html");
    const experienceZh = readRepoFile("dist/zh/experience/index.html");

    expect(experienceEn).toContain(
      "A project-based timeline of public work, writing, and technical focus."
    );
    expect(experienceEn).toContain("Decode");
    expect(experienceEn).toContain("Tank Fight Game");
    expect(experienceZh).toContain("项目、文章与技术重心组成的公开时间线。");
    expect(experienceZh).toContain("这是一份基于真实公开产物整理的经历页");
  });
});
