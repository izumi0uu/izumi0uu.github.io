import { remark } from "remark";
import unifiedPrettier from "unified-prettier";

export default unifiedPrettier = (tree) => {
  return remark().use(unifiedPrettier).processSync(tree);
};
