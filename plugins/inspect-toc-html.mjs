/**
 * @file inspect-toc-html.mjs
 * @description 检查 remark-toc 生成的 HTML 结构
 */

import { visit } from "unist-util-visit";

export default function inspectTocHtml() {
  return function transformer(tree, file) {
    // 只在特定文件中运行，避免过多输出
    if (!file.path?.includes("toc-test-verification")) return;

    console.log("\n🔍 === 检查 TOC HTML 结构 ===");

    let tocFound = false;

    // 查找 TOC 的 HTML 结构
    visit(tree, (node, index, parent) => {
      // 查找 h2 标签内容为 "Table of Contents" 的节点
      if (
        node.type === "element" &&
        node.tagName === "h2" &&
        node.children?.[0]?.value?.toLowerCase().includes("table of contents")
      ) {
        // 检查下一个兄弟节点
        const nextNode = parent?.children[index + 1];
        if (nextNode?.type === "element" && nextNode.tagName === "ul") {
          tocFound = true;
          console.log("\n✅ 找到 TOC 结构:");
          console.log("HTML 标签:", nextNode.tagName);
          console.log("属性:", nextNode.properties || "无");
          console.log("子元素数量:", nextNode.children?.length || 0);

          // 显示第一个列表项的结构
          const firstItem = nextNode.children?.[0];
          if (firstItem) {
            console.log("\n第一个列表项结构:");
            console.log(JSON.stringify(firstItem, null, 2));
          }
        }
      }
    });

    if (!tocFound) {
      console.log("❌ 未找到 TOC 的 HTML 结构");
    }

    console.log("\n=== 检查结束 ===\n");
  };
}
