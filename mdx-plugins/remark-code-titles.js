// Original codes are from "https://github.com/timlrx/pliny/
import { visit } from 'unist-util-visit';

// src/mdx-plugins/remark-code-title.ts
function remarkCodeTitles() {
  return (tree) => visit(tree, "code", (node, index, parent) => {
    const nodeLang = node.lang || "";
    let language = "";
    let title = "";
    if (nodeLang.includes(":")) {
      language = nodeLang.slice(0, nodeLang.search(":"));
      title = nodeLang.slice(nodeLang.search(":") + 1, nodeLang.length);
    }
    if (!title) {
      return;
    }
    const className = "remark-code-title";
    const titleNode = {
      type: "mdxJsxFlowElement",
      name: "div",
      attributes: [{ type: "mdxJsxAttribute", name: "className", value: className }],
      children: [{ type: "text", value: title }],
      data: { _xdmExplicitJsx: true }
    };
    parent.children.splice(index, 0, titleNode);
    node.lang = language;
  });
}

export default remarkCodeTitles;
