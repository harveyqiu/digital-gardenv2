// Original codes are from "https://github.com/timlrx/pliny/
import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';
import fs from 'fs';

// src/mdx-plugins/remark-img-to-jsx.ts
function remarkImgToJsx() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "paragraph" && node.children.some((n) => n.type === "image"),
      (node) => {
        const imageNode = node.children.find((n) => n.type === "image");
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`);
          imageNode.type = "mdxJsxFlowElement", imageNode.name = "Image", imageNode.attributes = [
            { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
            { type: "mdxJsxAttribute", name: "src", value: imageNode.url },
            { type: "mdxJsxAttribute", name: "width", value: dimensions.width },
            { type: "mdxJsxAttribute", name: "height", value: dimensions.height }
          ];
          node.type = "div";
          node.children = [imageNode];
        }
      }
    );
  };
}

export default remarkImgToJsx;
