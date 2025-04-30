import { remark } from "remark";
import unifiedPrettier from "unified-prettier";

export const unifiedPrettier = (tree) => {
  return remark().use(unifiedPrettier).processSync(tree);
};
