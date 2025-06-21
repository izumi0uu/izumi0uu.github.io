/**
 * @file lint-verification-plugin.mjs
 * @description 验证 remark-lint 是否产生了警告消息
 */

export default function lintVerificationPlugin() {
  return function transformer(tree, file) {
    console.log("\n🔍 === LINT 验证插件 ===");
    console.log(`📄 文件: ${file.path || "unknown"}`);

    // 检查 VFile.messages
    const messageCount = file.messages ? file.messages.length : 0;
    console.log(`📊 VFile.messages 数量: ${messageCount}`);

    if (messageCount > 0) {
      console.log("\n🚨 发现消息:");

      // 统计不同来源的消息
      const messagesBySource = {};

      file.messages.forEach((msg, index) => {
        const source = msg.source || "unknown";
        messagesBySource[source] = (messagesBySource[source] || 0) + 1;

        // 只显示前 5 条消息的详细信息
        if (index < 5) {
          console.log(`\n  消息 ${index + 1}:`);
          console.log(`    内容: ${msg.message}`);
          console.log(`    位置: ${msg.line}:${msg.column}`);
          console.log(`    来源: ${source}`);
          console.log(`    规则: ${msg.ruleId || "N/A"}`);
        }
      });

      // 如果有更多消息，显示摘要
      if (messageCount > 5) {
        console.log(`\n  ... 还有 ${messageCount - 5} 条消息`);
      }

      // 显示消息来源统计
      console.log("\n📈 消息来源统计:");
      Object.entries(messagesBySource).forEach(([source, count]) => {
        console.log(`  ${source}: ${count} 条`);
      });

      // 检查是否有 remark-lint 消息
      const lintMessageCount = messagesBySource["remark-lint"] || 0;
      if (lintMessageCount > 0) {
        console.log(`\n✅ remark-lint 正在工作! 发现 ${lintMessageCount} 条 lint 警告`);
      } else {
        console.log("\n❌ 没有发现 remark-lint 消息");
      }
    } else {
      console.log("\n❌ VFile.messages 为空");
      console.log("💡 这意味着:");
      console.log("  1. remark-lint 没有检测到问题");
      console.log("  2. 或者 remark-lint 没有正确运行");
    }

    console.log("\n=== LINT 验证插件结束 ===\n");

    return tree;
  };
}
