---
title: "插件功能测试"
description: "测试各种 Markdown 和 Rehype 插件是否正常工作"
publishDate: 2024-01-01
draft: false
---

# 插件功能测试

## 目录测试 (remark-toc)

<!-- toc -->

## GitHub 风格 Markdown 测试 (remark-gfm)

### 表格

| 功能   | 状态     | 插件       |
| ------ | -------- | ---------- |
| 表格   | ✅       | remark-gfm |
| 删除线 | ~~测试~~ | remark-gfm |

### 任务列表

- [x] 完成的任务
- [ ] 未完成的任务

## 智能标点测试 (remark-smartypants)

"智能引号" 和 '单引号'
省略号... 应该变成 …
破折号 -- 应该变成 —

## 外部链接测试 (rehype-external-links)

[外部链接](https://example.com) 应该有 target="\_blank"

## 标题锚点测试 (rehype-autolink-headings)

### 这个标题应该有锚点链接

## 提示框测试 (remark-callout)

> [!NOTE]  
> 这是一个提示框

> [!WARNING]  
> 这是一个警告框

## 嵌入内容测试 (remark-embedder)

https://www.youtube.com/watch?v=dQw4w9WgXcQ

## 代码高亮测试 (expressive-code)

```javascript
// 这段代码应该有语法高亮
function test() {
  console.log("Hello World!");
}
```

## 首字下沉测试 (remark-dropcap)

这是一个段落，第一个字符应该有首字下沉效果。

## 图片处理测试 (remark-images)

![测试图片](./test-image.jpg)
