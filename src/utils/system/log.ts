import treeify from "object-treeify";

const prettyPrintObject = (
  object: Record<string, unknown>,
  prefix = ""
): void => {
  const stringData = treeify(object);
  console.log(`${prefix}:\n\n${stringData}`);
};

export { prettyPrintObject };
