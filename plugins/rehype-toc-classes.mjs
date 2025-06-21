/**
 * @file rehype-toc-classes.mjs
 * @description 为 remark-toc 生成的目录添加 CSS 类
 */

import { visit } from "unist-util-visit";

export default function rehypeTocClasses(options = {}) {
  const {
    containerClass = "toc-container",
    listClass = "toc-list",
    itemClass = "toc-item",
    linkClass = "toc-link",
    nestedListClass = "toc-nested-list",
  } = options;

  return function transformer(tree) {
    let tocProcessed = false;

    visit(tree, (node, index, parent) => {
      // 查找 TOC 标题
      if (node.type === "element" && node.tagName === "h2" && isTocHeading(node)) {
        // 找到下一个兄弟节点（应该是 ul）
        const nextNode = parent?.children[index + 1];
        if (nextNode?.type === "element" && nextNode.tagName === "ul") {
          // 为整个 TOC 容器添加类
          nextNode.properties = nextNode.properties || {};
          nextNode.properties.className = [
            ...(nextNode.properties.className || []),
            containerClass,
            listClass,
          ];

          // 递归处理所有列表项
          processTocList(nextNode, 0);
          tocProcessed = true;
        }
      }
    });

    return tree;
  };

  // 检查是否是 TOC 标题
  function isTocHeading(node) {
    const text = getTextContent(node).toLowerCase();
    return text === "toc" || text === "table of contents" || text === "contents" || text === "目录";
  }

  // 获取节点的文本内容
  function getTextContent(node) {
    if (node.type === "text") return node.value;
    if (node.children) {
      return node.children.map((child) => getTextContent(child)).join("");
    }
    return "";
  }

  // 递归处理 TOC 列表
  function processTocList(listNode, depth) {
    if (listNode.type !== "element" || listNode.tagName !== "ul") return;

    // 为嵌套列表添加特殊类
    if (depth > 0) {
      listNode.properties = listNode.properties || {};
      listNode.properties.className = [
        ...(listNode.properties.className || []),
        nestedListClass,
        `${nestedListClass}-${depth}`,
      ];
    }

    // 处理每个列表项
    visit(listNode, "element", (node) => {
      if (node.tagName === "li") {
        // 为列表项添加类
        node.properties = node.properties || {};
        node.properties.className = [
          ...(node.properties.className || []),
          itemClass,
          `${itemClass}-${depth}`,
        ];

        // 为列表项中的链接添加类
        visit(node, "element", (child) => {
          if (child.tagName === "a") {
            child.properties = child.properties || {};
            child.properties.className = [
              ...(child.properties.className || []),
              linkClass,
              `${linkClass}-${depth}`,
            ];
          }

          // 递归处理嵌套列表
          if (child.tagName === "ul") {
            processTocList(child, depth + 1);
          }
        });
      }
    });
  }
}
