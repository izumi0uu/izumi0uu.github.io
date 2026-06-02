import { CONFIG_CLIENT } from "@/config/client";
import { SUPPORTED_LOCALES } from "@/config/i18n";
import { getAllPostsWithReadingTime } from "@/modules/post/common";
import { getAllProjects } from "@/modules/project/common";

import type { LocaleValues } from "@/types/config";
import type { Post } from "@/types/post";
import type { Project } from "@/types/project";

interface ProfileMetrics {
  projectCount: number;
  postCount: number;
  archiveYears: number;
  localeCount: number;
}

interface AboutSection {
  title: string;
  description: string;
  chips: string[];
}

interface AboutLinkLabels {
  blog: string;
  projects: string;
  experience: string;
  github: string;
  linkedin: string;
  email: string;
}

interface AboutPageContent {
  eyebrow: string;
  intro: string[];
  metricLabels: {
    projectCount: string;
    postCount: string;
    archiveYears: string;
    localeCount: string;
  };
  metricDescriptions: {
    projectCount: string;
    postCount: string;
    archiveYears: string;
    localeCount: string;
  };
  focusTitle: string;
  focusAreas: AboutSection[];
  principlesTitle: string;
  principles: string[];
  linksTitle: string;
  linkLabels: AboutLinkLabels;
}

interface ExperiencePageContent {
  eyebrow: string;
  intro: string;
  summary: string;
  sourceNote: string;
  summaryLabels: {
    projectCount: string;
    postCount: string;
    archiveYears: string;
  };
  quickLinksTitle: string;
  quickLinks: {
    github: string;
    repo: string;
    contact: string;
  };
  timelineTitle: string;
  timelineDescription: string;
  yearProjectCountLabel: string;
  stackLabel: string;
  writingTitle: string;
  writingDescription: string;
}

interface ExperienceYearGroup {
  year: string;
  projects: Project[];
  tags: string[];
}

const ABOUT_PAGE_CONTENT: Record<LocaleValues, AboutPageContent> = {
  en: {
    eyebrow: "Profile",
    intro: [
      `I'm ${CONFIG_CLIENT.AUTHOR_NAME}, a developer focused on frontend engineering, product feel, and teachable Web3 workflows.`,
      "This site is the public notebook where experiments become articles, reusable project pages, and better DX decisions.",
      "Most of the work here starts from a concrete build problem: a routing edge case, a UI interaction that should feel calmer, or a blockchain concept that needs a cleaner explanation.",
    ],
    metricLabels: {
      projectCount: "Public projects",
      postCount: "Published posts",
      archiveYears: "Archive span",
      localeCount: "Site languages",
    },
    metricDescriptions: {
      projectCount: "Project write-ups and demos already shipped on the site.",
      postCount: "Technical notes that turn debugging and learning into public references.",
      archiveYears: "Years covered by the first and latest published artifact in this repo.",
      localeCount: "Interface locales supported by the site today.",
    },
    focusTitle: "What I spend time on",
    focusAreas: [
      {
        title: "Frontend systems",
        description:
          "Astro, React, TypeScript, Tailwind, and the small interaction details that make a static site feel composed instead of brittle.",
        chips: ["Astro", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Web3 learning products",
        description:
          "Prototyping explainable flows around Solidity and Solana, from ERC20 demos to course-like learning experiences such as Decode.",
        chips: ["Web3", "Solidity", "Solana", "Education UX"],
      },
      {
        title: "Writing as engineering",
        description:
          "Turning implementation notes into searchable references so the next build starts with a clearer model and fewer hidden edges.",
        chips: ["MDX", "Documentation", "Content systems", "Knowledge capture"],
      },
    ],
    principlesTitle: "How I like to work",
    principles: [
      "Ship one vertical slice before polishing the whole system.",
      "Prefer strong defaults and small abstractions over sprawling layers.",
      "Keep lint, smoke, and browser checks close to user-visible changes.",
      "Use design and motion to reduce friction, not to decorate noise.",
    ],
    linksTitle: "Good starting points",
    linkLabels: {
      blog: "Read the blog",
      projects: "Browse projects",
      experience: "Browse experience",
      github: "Open GitHub",
      linkedin: "See LinkedIn",
      email: "Send email",
    },
  },
  zh: {
    eyebrow: "开发者画像",
    intro: [
      `我是 ${CONFIG_CLIENT.AUTHOR_NAME}，主要关注前端工程、产品体验，以及更容易被理解的 Web3 学习流程。`,
      "这个站点是我的公开工作笔记本，用来把实验、文章、项目整理成能复用的知识资产。",
      "这里的大多数内容都来自一个具体问题：某个路由边界、某个交互细节，或者某个区块链概念是否能被解释得更清楚。",
    ],
    metricLabels: {
      projectCount: "公开项目",
      postCount: "已发布文章",
      archiveYears: "公开时间跨度",
      localeCount: "站点语言",
    },
    metricDescriptions: {
      projectCount: "已经在站点里整理成案例的项目与 demo。",
      postCount: "把调试、学习和实现过程沉淀成公开笔记的文章数量。",
      archiveYears: "从仓库里第一份到最新一份公开产物覆盖的年份跨度。",
      localeCount: "当前站点界面支持的语言数量。",
    },
    focusTitle: "我主要把时间花在这些方向",
    focusAreas: [
      {
        title: "前端系统建设",
        description:
          "围绕 Astro、React、TypeScript、Tailwind 搭建稳定的内容站与交互层，把细小体验打磨到位。",
        chips: ["Astro", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Web3 学习型产品",
        description:
          "把 Solidity 和 Solana 相关知识做成更好理解的学习路径，从 ERC20 demo 到像 Decode 这样的课程型体验。",
        chips: ["Web3", "Solidity", "Solana", "教育体验"],
      },
      {
        title: "把写作当成工程",
        description:
          "把实现笔记整理成能搜索、能回看、能复用的资料，让下一次开发从更清晰的模型开始。",
        chips: ["MDX", "技术文档", "内容系统", "知识沉淀"],
      },
    ],
    principlesTitle: "我偏好的工作方式",
    principles: [
      "先把一个纵向闭环做通，再去打磨整套系统。",
      "比起堆叠很多抽象层，我更偏好少而强的默认约束。",
      "用户可见改动要尽量同步有 lint、smoke、浏览器验证。",
      "设计和动效应该用来减少阻力，而不是制造噪音。",
    ],
    linksTitle: "推荐的入口",
    linkLabels: {
      blog: "去看博客",
      projects: "浏览项目",
      experience: "浏览经历",
      github: "打开 GitHub",
      linkedin: "查看 LinkedIn",
      email: "发送邮件",
    },
  },
};

const EXPERIENCE_PAGE_CONTENT: Record<LocaleValues, ExperiencePageContent> = {
  en: {
    eyebrow: "Experience",
    intro:
      "A project-based timeline of public work, writing, and technical focus already published in this repo.",
    summary:
      "Instead of placeholder resume bullets, this page stays grounded in visible artifacts: project case studies, technical articles, and the systems that connect them.",
    sourceNote:
      "Detailed project pages are currently published in English. This page keeps the summary localized while linking back to the original work.",
    summaryLabels: {
      projectCount: "Public projects",
      postCount: "Published posts",
      archiveYears: "Years tracked",
    },
    quickLinksTitle: "Follow the work",
    quickLinks: {
      github: "GitHub profile",
      repo: "Site repository",
      contact: "Email contact",
    },
    timelineTitle: "Project timeline",
    timelineDescription:
      "Each year groups the public projects already shipped on the site, so this page can stay honest and update itself as the portfolio grows.",
    yearProjectCountLabel: "projects",
    stackLabel: "Common stack",
    writingTitle: "Recent writing threads",
    writingDescription:
      "The newest posts show where the current curiosity is moving: debugging notes, Solana mental models, and framework internals.",
  },
  zh: {
    eyebrow: "经历",
    intro: "项目、文章与技术重心组成的公开时间线。",
    summary:
      "这是一份基于真实公开产物整理的经历页，不再放空白简历条目，而是直接指向已经写出来、做出来、发布出来的东西。",
    sourceNote: "详细项目页目前主要以英文发布；当前页面保留中文摘要，并回链到对应的原始项目内容。",
    summaryLabels: {
      projectCount: "公开项目",
      postCount: "已发布文章",
      archiveYears: "记录年限",
    },
    quickLinksTitle: "继续追踪这些工作",
    quickLinks: {
      github: "GitHub 主页",
      repo: "站点仓库",
      contact: "邮件联系",
    },
    timelineTitle: "项目时间线",
    timelineDescription:
      "按年份归档这个站点里已经公开发布的项目，让经历页随着作品集增长而自然更新。",
    yearProjectCountLabel: "个项目",
    stackLabel: "常见技术栈",
    writingTitle: "最近的写作线索",
    writingDescription: "最新文章能看出当前的关注点：调试笔记、Solana 心智模型，以及框架内部机制。",
  },
};

const getProfileMetrics = async (): Promise<ProfileMetrics> => {
  const [posts, projects] = await Promise.all([getAllPostsWithReadingTime(), getAllProjects()]);
  const years = [...posts, ...projects]
    .map((entry) => entry.data.updatedDate ?? entry.data.publishDate)
    .map((date) => date.getFullYear())
    .sort((a, b) => a - b);

  const firstYear = years[0];
  const lastYear = years[years.length - 1];

  return {
    projectCount: projects.length,
    postCount: posts.length,
    archiveYears: years.length > 0 ? lastYear - firstYear + 1 : 0,
    localeCount: SUPPORTED_LOCALES.length,
  };
};

const getExperienceProjectGroups = async (): Promise<ExperienceYearGroup[]> => {
  const projects = await getAllProjects();
  const groups = projects.reduce<Record<string, Project[]>>((accumulator, project) => {
    const year = String(project.data.publishDate.getFullYear());

    if (!accumulator[year]) {
      accumulator[year] = [];
    }

    accumulator[year].push(project);
    return accumulator;
  }, {});

  return Object.entries(groups)
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, groupedProjects]) => ({
      year,
      projects: groupedProjects,
      tags: getTopTags(groupedProjects).slice(0, 6),
    }));
};

const getRecentWritingHighlights = async (limit: number = 3): Promise<Post[]> => {
  const posts = await getAllPostsWithReadingTime();
  return posts.slice(0, limit);
};

const getTopTags = (items: Array<{ data: { tags?: string[] } }>): string[] => {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    item.data.tags?.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) return right[1] - left[1];
      return left[0].localeCompare(right[0]);
    })
    .map(([tag]) => tag);
};

const getAboutPageContent = (locale: LocaleValues): AboutPageContent =>
  ABOUT_PAGE_CONTENT[locale] ?? ABOUT_PAGE_CONTENT.en;

const getExperiencePageContent = (locale: LocaleValues): ExperiencePageContent =>
  EXPERIENCE_PAGE_CONTENT[locale] ?? EXPERIENCE_PAGE_CONTENT.en;

export type { AboutPageContent, ExperiencePageContent, ExperienceYearGroup, ProfileMetrics };

export {
  getAboutPageContent,
  getExperiencePageContent,
  getExperienceProjectGroups,
  getProfileMetrics,
  getRecentWritingHighlights,
};
