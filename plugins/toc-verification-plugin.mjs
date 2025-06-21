/**
 * @file toc-verification-plugin.mjs
 * @description 验证 remark-toc 是否正确生成了目录
 */

import { visit } from "unist-util-visit";

export default function tocVerificationPlugin() {
  return function transformer(tree, file) {
    console.log("\n🔍 === TOC 验证插件 ===");
    console.log(`📄 文件: ${file.path || "unknown"}`);

    let tocFound = false;
    let headingCount = 0;
    let tocNodeInfo = null;

    // 统计标题数量
    visit(tree, "heading", (node) => {
      headingCount++;
    });

    // 查找生成的目录
    visit(tree, (node, index, parent) => {
      // remark-toc 通常会在找到匹配的标题后插入一个 list 节点
      if (
        node.type === "heading" &&
        (node.children?.[0]?.value?.toLowerCase() === "toc" ||
          node.children?.[0]?.value?.toLowerCase() === "table of contents")
      ) {
        // 检查下一个节点是否是列表（目录）
        if (parent && parent.children[index + 1]?.type === "list") {
          tocFound = true;
          tocNodeInfo = {
            headingText: node.children[0].value,
            listItems: countListItems(parent.children[index + 1]),
          };
        }
      }
    });

    console.log(`📊 文档统计:`);
    console.log(`  - 标题数量: ${headingCount}`);
    console.log(`  - 找到 TOC: ${tocFound ? "✅" : "❌"}`);

    if (tocFound && tocNodeInfo) {
      console.log(`\n✅ remark-toc 正在工作!`);
      console.log(`  - TOC 标题: "${tocNodeInfo.headingText}"`);
      console.log(`  - 目录项数: ${tocNodeInfo.listItems}`);
    } else {
      console.log(`\n❓ 未找到生成的目录`);
      console.log(`💡 可能的原因:`);
      console.log(`  1. 文档中没有 "toc" 或 "table of contents" 标题`);
      console.log(`  2. remark-toc 没有正确执行`);
      console.log(`  3. 插件执行顺序问题`);
    }

    // 调试：显示 AST 的前几个节点
    console.log(`\n🌳 AST 前 5 个节点类型:`);
    tree.children.slice(0, 5).forEach((node, i) => {
      console.log(
        `  ${i}: ${node.type}${node.type === "heading" ? ` (${getHeadingText(node)})` : ""}`
      );
    });

    console.log("\n=== TOC 验证插件结束 ===\n");

    return tree;
  };
}

// 辅助函数：计算列表项数量
function countListItems(node) {
  if (node.type !== "list") return 0;

  let count = 0;
  visit(node, "listItem", () => {
    count++;
  });

  return count;
}

// 辅助函数：获取标题文本
function getHeadingText(node) {
  if (node.type !== "heading" || !node.children) return "";

  return node.children.map((child) => child.value || "").join("");
}
