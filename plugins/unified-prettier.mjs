import { remark } from "remark";
import unifiedPrettierPlugin from "unified-prettier";

export default (tree) => {
  return remark().use(unifiedPrettierPlugin).processSync(tree);
};
